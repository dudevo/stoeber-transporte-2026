'use client'

import { useState, useEffect } from 'react'
import styles from '../Forms.module.scss'

interface ModernFormTextareaProps {
  name: string
  placeholder?: string
  rows?: number
  errors?: string[]
  defaultValue?: string
  onValidationChange?: (fieldName: string, isValid: boolean) => void
}

export function ModernFormTextarea({
  name,
  placeholder,
  rows = 4,
  errors,
  defaultValue,
  onValidationChange,
}: ModernFormTextareaProps) {
  const [value, setValue] = useState(defaultValue || '')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    // Always report validation state - textarea is optional so always valid
    onValidationChange?.(name, true)
  }, [value, touched, name, onValidationChange, errors])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    if (!touched) setTouched(true)
  }

  const handleBlur = () => {
    if (!touched) setTouched(true)
  }

  // Clear server errors when user starts typing
  const displayError = touched ? null : (errors && errors[0])
  const hasError = Boolean(displayError)

  return (
    <div className={styles.inputWrapper}>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={hasError ? styles.inputError : ''}
      />
      {hasError && <span className={styles.errorText}>{displayError}</span>}
    </div>
  )
}
