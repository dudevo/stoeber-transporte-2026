'use client'

import { useActionState, useCallback, useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'
import { Truck } from 'lucide-react'

import FormContainer from '@/components/ui/layout/form-container'
import { submitBeiladungForm, type FormState } from '@/lib/actions/form-actions'
import { ModernFormInput } from './ModernFormInput'
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

export default function ModernBeiladungForm() {
  const t = useTranslations()
  const [state, formAction] = useActionState(submitBeiladungForm, initialState)
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

  const pageTitle = t("dl.h1.bl")

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
        'lort', 'ldplz', 'ldort', 'ldstrasse', 'ldland', // Pickup location
        'aort', 'abplz', 'abort', 'abstrasse', 'abland', // Delivery location
        'vpart', 'vpanzahl', 'vpkb', 'wgw', 'wmasse', // Packaging and goods
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
          <div className={styles.form__groupLeft}>
            <h2>{t("h2lo")}</h2>
            <ModernFormInput
              name="lort"
              type="date"
              required
              min={today}
              errors={getFieldErrors('lort')}
              onValidationChange={handleValidationChange}
              defaultValue={today}
            />
            <ModernFormInput
              name="ldplz"
              type="text"
              placeholder={t("pl.plz")}
              required
              minLength={5}
              errors={getFieldErrors('ldplz')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="ldort"
              type="text"
              placeholder={t("pl.ort")}
              required
              errors={getFieldErrors('ldort')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="ldstrasse"
              type="text"
              placeholder={t("pl.street")}
              required
              errors={getFieldErrors('ldstrasse')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="ldland"
              type="text"
              placeholder={t("pl.land")}
              required
              errors={getFieldErrors('ldland')}
              onValidationChange={handleValidationChange}
            />
          </div>

          {/* Delivery Location */}
          <div className={styles.form__groupRight}>
            <h2>{t("h2ao")}</h2>
            <ModernFormInput
              name="aort"
              type="date"
              errors={getFieldErrors('aort')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="abplz"
              type="text"
              placeholder={t("pl.plz")}
              required
              minLength={5}
              errors={getFieldErrors('abplz')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="abort"
              type="text"
              placeholder={t("pl.ort")}
              required
              errors={getFieldErrors('abort')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="abstrasse"
              type="text"
              placeholder={t("pl.street")}
              required
              errors={getFieldErrors('abstrasse')}
              onValidationChange={handleValidationChange}
            />
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

        {/* Packaging and Goods */}
        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <h2>{t("h2vp")}</h2>
            <ModernFormInput
              name="vpart"
              type="text"
              placeholder={t("pl.vpart")}
              errors={getFieldErrors('vpart')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="vpanzahl"
              type="text"
              placeholder={t("pl.vpanzahl")}
              errors={getFieldErrors('vpanzahl')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="vpkb"
              type="text"
              placeholder={t("pl.vpkb")}
              errors={getFieldErrors('vpkb')}
              onValidationChange={handleValidationChange}
            />
          </div>
          
          <div className={styles.form__groupRight}>
            <h2>{t("h2w")}</h2>
            <ModernFormInput
              name="wgw"
              type="text"
              placeholder={t("pl.wgw")}
              errors={getFieldErrors('wgw')}
              onValidationChange={handleValidationChange}
            />
            <ModernFormInput
              name="wmasse"
              type="text"
              placeholder={t("pl.wmasse")}
              errors={getFieldErrors('wmasse')}
              onValidationChange={handleValidationChange}
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
