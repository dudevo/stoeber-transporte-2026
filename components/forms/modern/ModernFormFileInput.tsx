'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, FileImage } from 'lucide-react'
import styles from '../Forms.module.scss'

interface ModernFormFileInputProps {
  name: string
  multiple?: boolean
  accept?: string
  maxFiles?: number
  maxFileSize?: number // in MB
  errors?: string[]
  onValidationChange?: (fieldName: string, isValid: boolean) => void
}

export function ModernFormFileInput({
  name,
  multiple = true,
  accept = "image/*",
  maxFiles = 5,
  maxFileSize = 10, // 10MB default
  errors,
  onValidationChange,
}: ModernFormFileInputProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [localError, setLocalError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFiles = (files: File[]) => {
    let isValid = true
    let errorMessage = ''

    if (files.length > maxFiles) {
      isValid = false
      errorMessage = `Maximal ${maxFiles} Dateien erlaubt`
    } else {
      for (const file of files) {
        if (file.size > maxFileSize * 1024 * 1024) {
          isValid = false
          errorMessage = `Dateigröße darf ${maxFileSize}MB nicht überschreiten`
          break
        }
        if (!file.type.startsWith('image/')) {
          isValid = false
          errorMessage = 'Nur Bilddateien sind erlaubt'
          break
        }
      }
    }

    setLocalError(errorMessage)
    onValidationChange?.(name, isValid)
    return { isValid, errorMessage }
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    const newFiles = [...selectedFiles, ...fileArray].slice(0, maxFiles)
    
    const validation = validateFiles(newFiles)
    if (!validation.isValid) {
      return
    }

    setSelectedFiles(newFiles)

    // Create previews
    const newPreviews: string[] = []
    newFiles.forEach((file, index) => {
      if (previews[index]) {
        newPreviews.push(previews[index])
      } else {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews[index] = e.target.result as string
            setPreviews([...newPreviews])
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    
    setSelectedFiles(newFiles)
    setPreviews(newPreviews)
    validateFiles(newFiles)

    // Update the actual file input
    if (fileInputRef.current) {
      const dt = new DataTransfer()
      newFiles.forEach(file => dt.items.add(file))
      fileInputRef.current.files = dt.files
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  // Show local validation error or server error
  const displayError = localError || (errors && errors[0])
  const hasError = Boolean(displayError)

  return (
    <div className={styles.fileInputWrapper}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      {/* Drop zone */}
      <div
        className={`${styles.fileDropzone} ${dragOver ? styles.dragOver : ''} ${hasError ? styles.inputError : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileSelect}
      >
        <div className={styles.fileDropzoneContent}>
          <Upload size={24} color="#666" />
          <p>Bilder hier ablegen oder <span className={styles.fileDropzoneLink}>durchsuchen</span></p>
          <p className={styles.fileDropzoneHint}>
            Maximal {maxFiles} Dateien, je max. {maxFileSize}MB
          </p>
        </div>
      </div>

      {/* File previews */}
      {selectedFiles.length > 0 && (
        <div className={styles.filePreviewGrid}>
          {selectedFiles.map((file, index) => (
            <div key={index} className={styles.filePreviewItem}>
              <div className={styles.filePreview}>
                {previews[index] ? (
                  <Image
                    src={previews[index]}
                    alt={`Preview ${index + 1}`}
                    className={styles.filePreviewImage}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className={styles.filePreviewPlaceholder}>
                    <FileImage size={20} color="#666" />
                  </div>
                )}
                <button
                  type="button"
                  className={styles.filePreviewRemove}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={16} />
                </button>
              </div>
              <p className={styles.filePreviewName}>{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Error message */}
      {hasError && <span className={styles.errorText}>{displayError}</span>}
    </div>
  )
}
