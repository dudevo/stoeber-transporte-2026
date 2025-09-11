'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from '../Forms.module.scss'

interface SelectOption {
  value: string | number
  label: string
}

interface ModernFormSelectProps {
  name: string
  options: SelectOption[]
  errors?: string[]
  defaultValue?: string | number
  onValidationChange?: (fieldName: string, isValid: boolean) => void
  onChange?: (fieldName: string, isValid: boolean, value: string) => void
}

export function ModernFormSelect({
  name,
  options,
  errors,
  defaultValue,
  onValidationChange,
  onChange,
}: ModernFormSelectProps) {
  const [value, setValue] = useState(defaultValue?.toString() || options[0]?.value.toString() || '')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    // Always report validation state for select fields
    // Select fields with predefined options are generally valid
    const isValid = true
    onValidationChange?.(name, isValid)
    onChange?.(name, isValid, value)
  }, [value, touched, name, onValidationChange, onChange, errors])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    if (!touched) setTouched(true)
  }

  const handleBlur = () => {
    if (!touched) setTouched(true)
  }

  // Show server errors until user interacts with the field
  const displayError = touched ? null : (errors && errors[0])
  const hasError = Boolean(displayError)

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.select}>
        <select
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={hasError ? styles.inputError : ''}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} />
      </div>
      {hasError && <span className={styles.errorText}>{displayError}</span>}
    </div>
  )
}
