'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from '../Forms.module.scss'

interface ModernFormInputProps {
  name: string
  type?: 'text' | 'email' | 'tel' | 'date'
  placeholder?: string
  required?: boolean
  minLength?: number
  errors?: string[]
  min?: string
  defaultValue?: string
  onValidationChange?: (fieldName: string, isValid: boolean) => void
}

export function ModernFormInput({
  name,
  type = 'text',
  placeholder,
  required,
  minLength,
  errors,
  min,
  defaultValue,
  onValidationChange,
}: ModernFormInputProps) {
  const [localError, setLocalError] = useState<string>('')
  const [value, setValue] = useState(defaultValue || '')
  const [touched, setTouched] = useState(false)

  // Validation function - memoized to prevent infinite loops
  const validateField = useCallback((currentValue: string, shouldSetLocalError = true) => {
    let isValid = true
    let errorMessage = ''

    if (required && !currentValue.trim()) {
      isValid = false
      errorMessage = 'Dieses Feld ist erforderlich'
    } else if (minLength && currentValue.length < minLength) {
      isValid = false
      errorMessage = `Mindestens ${minLength} Zeichen erforderlich`
    } else if (type === 'email' && currentValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(currentValue)) {
        isValid = false
        errorMessage = 'Gültige E-Mail-Adresse erforderlich'
      }
    }

    if (shouldSetLocalError) {
      setLocalError(errorMessage)
    }
    onValidationChange?.(name, isValid)
    return { isValid, errorMessage }
  }, [required, minLength, type, name, onValidationChange])

  // Run validation on mount and whenever value changes
  useEffect(() => {
    // Always validate if field is required or if there are server errors
    if (required || (errors && errors.length > 0) || touched) {
      validateField(value)
    }
  }, [value, touched, required, minLength, type, name, onValidationChange, errors, validateField])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (!touched) setTouched(true)
  }

  const handleBlur = () => {
    if (!touched) setTouched(true)
  }

  // Show local validation error or server error
  // Prioritize local error only after touch; otherwise show server error (e.g., after submit)
  const displayError = (touched && localError) ? localError : (errors && errors[0])
  const hasError = Boolean(displayError)

  return (
    <div className={styles.inputWrapper}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        min={min}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={hasError ? styles.inputError : ''}
        // Add HTML validation attributes for better UX
        pattern={type === 'email' ? undefined : undefined} // Let browser handle email validation
        title={required ? 'Dieses Feld ist erforderlich' : undefined}
      />
      {hasError && <span className={styles.errorText}>{displayError}</span>}
    </div>
  )
}
