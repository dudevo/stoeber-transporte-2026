'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import styles from '../Forms.module.scss'

interface ModernFormCheckboxProps {
  name: string
  errors?: string[]
  onValidationChange?: (fieldName: string, isValid: boolean) => void
}

export function ModernFormCheckbox({
  name,
  errors,
  onValidationChange,
}: ModernFormCheckboxProps) {
  const t = useTranslations()
  const [checked, setChecked] = useState(false)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    // Always report validation state - checkbox must be checked to be valid
    // Only skip validation if field hasn't been interacted with AND no server errors present
    if (touched || (errors && errors.length > 0)) {
      onValidationChange?.(name, checked)
    } else {
      // On mount, if checkbox is required (implied by having validation), report invalid state
      // This allows form to know the field needs to be checked
      onValidationChange?.(name, false)
    }
  }, [checked, touched, name, onValidationChange, errors])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    if (!touched) setTouched(true)
  }

  const handleBlur = () => {
    if (!touched) setTouched(true)
  }

  // Show server errors or validation errors
  // Hide error only when checkbox is actually checked
  const displayError = checked ? null : (errors && errors[0])
  const hasError = Boolean(displayError)

  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.checkbox}
        />
        <span className={styles.checkboxText}>
          {t("ds.p1")}
          <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
            {t("ds.ds")}
          </a>
          {" "}{t("ds.p2")}{" "}
          <a href="/agb" target="_blank" rel="noopener noreferrer">
            {t("ds.agb")}
          </a>
          {" "}{t("ds.p3")}
        </span>
      </label>
      {hasError && <span className={styles.errorText}>{displayError}</span>}
    </div>
  )
}
