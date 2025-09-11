'use client'

import { useActionState, useCallback, useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'
import { Truck } from 'lucide-react'

import FormContainer from '@/components/ui/layout/form-container'
import { submitUmzugForm, type FormState } from '@/lib/actions/form-actions'
import { ModernFormInput } from './ModernFormInput'
import { ModernFormSelect } from './ModernFormSelect'
import { ModernFormTextarea } from './ModernFormTextarea'
import { ModernFormCheckbox } from './ModernFormCheckbox'
import styles from '../Forms.module.scss'

const initialState: FormState = {
  success: false,
  errors: {},
}

function SubmitButton() {
  const { pending } = useFormStatus()
  const t = useTranslations()
  
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        backgroundColor: pending ? "#ccc" : "#2757a8",
        color: "white",
        padding: "0.75rem 2rem",
        border: "none",
        borderRadius: "6px",
        cursor: pending ? "not-allowed" : "pointer",
        fontSize: "1rem",
        fontWeight: "600"
      }}
    >
      {pending ? "Wird gesendet..." : t("submitBtn")}
    </button>
  )
}

export default function ModernUmzugForm() {
  const t = useTranslations()
  const [state, formAction] = useActionState(submitUmzugForm, initialState)
  const [validFields, setValidFields] = useState<Set<string>>(new Set())

  // Handle field validation changes to clear errors dynamically
  const handleValidationChange = useCallback((fieldName: string, isValid: boolean) => {
    setValidFields(prev => {
      const newSet = new Set(prev)
      if (isValid) {
        newSet.add(fieldName)
      } else {
        newSet.delete(fieldName)
      }
      return newSet
    })
  }, [])

  const today = new Date().toISOString().slice(0, 10)

  // Service options
  const montageOptions = [
    { value: "0", label: t("mont.m0") },
    { value: "1", label: t("mont.m1") },
    { value: "2", label: t("mont.m2") },
    { value: "3", label: t("mont.m3") },
  ]

  const packenOptions = [
    { value: "0", label: t("pk.pk0") },
    { value: "1", label: t("pk.pk1") },
    { value: "2", label: t("pk.pk2") },
    { value: "3", label: t("pk.pk3") },
  ]

  const hausOptions = [
    { value: "0", label: "Nein" },
    { value: "1", label: "Ja" },
  ]

  const aufzugOptions = [
    { value: "0", label: "Nein" },
    { value: "1", label: "Ja" },
  ]

  const roomOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} ${i === 0 ? 'Zimmer' : 'Zimmer'}`
  }))

  const pageTitle = t("dl.h1.uz")

  // Clear errors for fields that have become valid
  const getFieldErrors = (fieldName: string) => {
    // If field is valid, don't show any errors
    if (validFields.has(fieldName)) return undefined
    // Otherwise show server errors
    return state.errors?.[fieldName]
  }

  // Check if all fields with errors have become valid
  const hasRemainingErrors = state.errors && Object.keys(state.errors).some(field => !validFields.has(field))

  // Auto-scroll to first error field when validation errors appear
  useEffect(() => {
    if (!state.success && state.errors && Object.keys(state.errors).length > 0) {
      // Define field order as they appear in the form
      const fieldOrder = [
        'cname', 'firma', 'cemail', 'tel', 'mob', 'fax', // Contact info
        'lort', 'ldplz', 'ldort', 'ldstrasse', 'ldland', 'ldanz', 'ldet', 'ldhaus', 'ldaufzug', // Pickup location
        'aort', 'abplz', 'abort', 'abstrasse', 'abland', 'abanz', 'abet', 'abhaus', 'abaufzug', // Delivery location
        'montage', 'packen', // Services
        'comment', 'agbChecked' // Comment and AGB
      ]
      
      // Find the first field with an error based on form order
      const firstErrorField = fieldOrder.find(field => state.errors?.[field])
      
      if (firstErrorField) {
        // Try to find the input element by name
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
        if (errorElement) {
          // Scroll to the element with some offset for better visibility
          errorElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          })
          
          // Add a brief highlight effect to draw attention
          if (errorElement instanceof HTMLElement) {
            errorElement.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.5)'
            setTimeout(() => {
              errorElement.style.boxShadow = ''
            }, 2000)
          }
          
          // Optional: Focus the field for better accessibility
          if (errorElement instanceof HTMLInputElement || 
              errorElement instanceof HTMLSelectElement || 
              errorElement instanceof HTMLTextAreaElement) {
            setTimeout(() => errorElement.focus(), 500) // Small delay to ensure smooth scroll completes
          }
        }
      }
    }
  }, [state.errors, state.success])

  return (
    <FormContainer 
      title={pageTitle}
      icon={<Truck size={40} color="#274c88" strokeWidth={1.5} />}
    >
      <form action={formAction} className={styles.form} noValidate>
        {/* Contact Information */}
        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <h2>{t("h2ap")}</h2>
            <ModernFormInput
              name="cname"
              type="text"
              placeholder={t("pl.cname")}
              required
              minLength={2}
              errors={getFieldErrors('cname')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="firma"
              type="text"
              placeholder={t("pl.firma")}
              errors={getFieldErrors('firma')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="cemail"
              type="email"
              placeholder="E-Mail"
              required
              errors={getFieldErrors('cemail')}
              onValidationChange={handleValidationChange}
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <h2>{t("h2kd")}</h2>
            <ModernFormInput
              name="tel"
              type="tel"
              placeholder={t("pl.phone")}
              required
              errors={getFieldErrors('tel')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="mob"
              type="tel"
              placeholder={t("pl.mobile")}
              errors={getFieldErrors('mob')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="fax"
              type="tel"
              placeholder={t("pl.fax")}
              errors={getFieldErrors('fax')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        {/* Pickup Location */}
        <div className={styles.form__group}>
          <h2>{t("h2lo")}</h2>
          
          <div className={styles.form__groupLeft}>
            <ModernFormInput
              name="lort"
              type="date"
              required
              min={today}
              errors={getFieldErrors('lort')}
              onValidationChange={handleValidationChange}
              defaultValue={today}
            />
          </div>
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <ModernFormInput
              name="ldplz"
              type="text"
              placeholder={t("pl.plz")}
              required
              minLength={5}
              errors={getFieldErrors('ldplz')}
              onValidationChange={handleValidationChange}
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <ModernFormInput
              name="ldort"
              type="text"
              placeholder={t("pl.ort")}
              required
              errors={getFieldErrors('ldort')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <ModernFormInput
              name="ldstrasse"
              type="text"
              placeholder={t("pl.street")}
              required
              errors={getFieldErrors('ldstrasse')}
              onValidationChange={handleValidationChange}
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <ModernFormInput
              name="ldland"
              type="text"
              placeholder={t("pl.land")}
              required
              errors={getFieldErrors('ldland')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <ModernFormSelect
              name="ldanz"
              options={roomOptions}
              errors={getFieldErrors('ldanz')}
              onValidationChange={handleValidationChange}
              defaultValue="1"
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <ModernFormInput
              name="ldet"
              type="text"
              placeholder={t("pl.et")}
              errors={getFieldErrors('ldet')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <ModernFormSelect
              name="ldhaus"
              options={hausOptions}
              errors={getFieldErrors('ldhaus')}
              onValidationChange={handleValidationChange}
              defaultValue="0"
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <ModernFormSelect
              name="ldaufzug"
              options={aufzugOptions}
              errors={getFieldErrors('ldaufzug')}
              onValidationChange={handleValidationChange}
              defaultValue="0"
            />
          </div>
        </div>

        {/* Delivery Location */}
        <div className={styles.form__group}>
          <h2>{t("h2ao")}</h2>

          <div className={styles.form__groupLeft}>
            <ModernFormInput
              name="aort"
              type="date"
              errors={getFieldErrors('aort')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <ModernFormInput
              name="abplz"
              type="text"
              placeholder={t("pl.plz")}
              required
              minLength={5}
              errors={getFieldErrors('abplz')}
              onValidationChange={handleValidationChange}
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <ModernFormInput
              name="abort"
              type="text"
              placeholder={t("pl.ort")}
              required
              errors={getFieldErrors('abort')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <ModernFormInput
              name="abstrasse"
              type="text"
              placeholder={t("pl.street")}
              required
              errors={getFieldErrors('abstrasse')}
              onValidationChange={handleValidationChange}
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <ModernFormInput
              name="abland"
              type="text"
              placeholder={t("pl.land")}
              required
              errors={getFieldErrors('abland')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <ModernFormSelect
              name="abanz"
              options={roomOptions}
              errors={getFieldErrors('abanz')}
              onValidationChange={handleValidationChange}
              defaultValue="1"
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <ModernFormInput
              name="abet"
              type="text"
              placeholder={t("pl.et")}
              errors={getFieldErrors('abet')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <ModernFormSelect
              name="abhaus"
              options={hausOptions}
              errors={getFieldErrors('abhaus')}
              onValidationChange={handleValidationChange}
              defaultValue="0"
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <ModernFormSelect
              name="abaufzug"
              options={aufzugOptions}
              errors={getFieldErrors('abaufzug')}
              onValidationChange={handleValidationChange}
              defaultValue="0"
            />
          </div>
        </div>

        {/* Services */}
        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <h2>{t("h2mt")}</h2>
            <ModernFormSelect
              name="montage"
              options={montageOptions}
              errors={getFieldErrors('montage')}
              onValidationChange={handleValidationChange}
              defaultValue="0"
            />
          </div>

          <div className={styles.form__groupRight}>
            <h2>{t("h2pk")}</h2>
            <ModernFormSelect
              name="packen"
              options={packenOptions}
              errors={getFieldErrors('packen')}
              onValidationChange={handleValidationChange}
              defaultValue="0"
            />
          </div>
        </div>

        {/* Comment */}
        <div className={styles.form__group}>
          <div className={styles.form__groupComment}>
            <h2>{t("h2c")}</h2>
            <ModernFormTextarea
              name="comment"
              rows={4}
              errors={getFieldErrors('comment')}
              onValidationChange={handleValidationChange}
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className={styles.form__group}>
          <ModernFormCheckbox
            name="agbChecked"
            errors={getFieldErrors('agbChecked')}
            onValidationChange={handleValidationChange}
          />
        </div>

        {/* Global Error/Success Message */}
        {state.message && (state.success || hasRemainingErrors) && (
          <div className={styles.form__group}>
            <div style={{
              padding: "1rem",
              backgroundColor: state.success ? "#d4edda" : "#f8d7da",
              color: state.success ? "#155724" : "#721c24",
              borderRadius: "6px",
              border: `1px solid ${state.success ? "#c3e6cb" : "#f5c6cb"}`
            }}>
              {state.message}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className={styles.form__group}>
          <SubmitButton />
        </div>
      </form>
    </FormContainer>
  )
}
