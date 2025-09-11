'use server'

import { umzugSchema, beiladungSchema, moebelliftSchema, transportSchema, fahrzeugueberfuehrungSchema, lagerungSchema } from '@/lib/validations/forms'

export interface FormState {
  success: boolean
  message?: string
  errors?: Record<string, string[]>
  data?: unknown
}

export async function submitUmzugForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Convert FormData to plain object
    const rawData = Object.fromEntries(formData.entries())
    
    // Handle checkboxes (they won't be in formData if unchecked)
    const processedData = {
      ...rawData,
      agbChecked: formData.has('agbChecked'),
      // Convert numeric fields
      ldhaus: formData.get('ldhaus') || '0',
      ldaufzug: formData.get('ldaufzug') || '0',
      abhaus: formData.get('abhaus') || '0', 
      abaufzug: formData.get('abaufzug') || '0',
      montage: formData.get('montage') || '0',
      packen: formData.get('packen') || '0',
    }

    // Validate with Zod
    const validatedData = umzugSchema.parse(processedData)

    // Here you would normally save to database or send email
    console.log('Form data validated:', validatedData)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For now, just return success
    return {
      success: true,
      message: 'Ihre Umzugsanfrage wurde erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
      data: validatedData
    }

  } catch (error: unknown) {
    // Handle Zod errors - they have different structure than expected
    if (error && typeof error === 'object' && 'issues' in error) {
      // This is a ZodError
      const zodErr = error as { issues?: Array<{ path: (string | number)[]; message: string }> }
      if (Array.isArray(zodErr.issues)) {
        const errors: Record<string, string[]> = {}
        zodErr.issues.forEach((issue) => {
          const field = String(issue.path?.[0] ?? 'form')
          if (!errors[field]) {
            errors[field] = []
          }
          errors[field].push(issue.message)
        })

        return {
          success: false,
          message: 'Bitte korrigieren Sie die markierten Fehler.',
          errors
        }
      }
    }

    // Other errors
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      errors: {}
    }
  }
}

export async function submitTransportForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Convert FormData to plain object
    const rawData = Object.fromEntries(formData.entries())
    
    // Handle checkboxes (they won't be in formData if unchecked)
    const processedData = {
      ...rawData,
      agbChecked: formData.has('agbChecked'),
    }

    // Validate with Zod
    const validatedData = transportSchema.parse(processedData)

    // Here you would normally save to database or send email
    console.log('Transport form data validated:', validatedData)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For now, just return success
    return {
      success: true,
      message: 'Ihre Transportanfrage wurde erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
      data: validatedData
    }

  } catch (error: unknown) {
    // Handle Zod errors - they have different structure than expected
    if (error && typeof error === 'object' && 'issues' in error) {
      // This is a ZodError
      const zodErr = error as { issues?: Array<{ path: (string | number)[]; message: string }> }
      if (Array.isArray(zodErr.issues)) {
        const errors: Record<string, string[]> = {}
        zodErr.issues.forEach((issue) => {
          const field = String(issue.path?.[0] ?? 'form')
          if (!errors[field]) {
            errors[field] = []
          }
          errors[field].push(issue.message)
        })

        return {
          success: false,
          message: 'Bitte korrigieren Sie die markierten Fehler.',
          errors
        }
      }
    }

    // Other errors
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      errors: {}
    }
  }
}

export async function submitBeiladungForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Convert FormData to plain object
    const rawData = Object.fromEntries(formData.entries())
    
    // Handle checkboxes (they won't be in formData if unchecked)
    const processedData = {
      ...rawData,
      agbChecked: formData.has('agbChecked'),
    }

    // Validate with Zod
    const validatedData = beiladungSchema.parse(processedData)

    // Here you would normally save to database or send email
    console.log('Beiladung form data validated:', validatedData)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For now, just return success
    return {
      success: true,
      message: 'Ihre Beiladungsanfrage wurde erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
      data: validatedData
    }

  } catch (error: unknown) {
    // Handle Zod errors - they have different structure than expected
    if (error && typeof error === 'object' && 'issues' in error) {
      // This is a ZodError
      const zodErr = error as { issues?: Array<{ path: (string | number)[]; message: string }> }
      if (Array.isArray(zodErr.issues)) {
        const errors: Record<string, string[]> = {}
        zodErr.issues.forEach((issue) => {
          const field = String(issue.path?.[0] ?? 'form')
          if (!errors[field]) {
            errors[field] = []
          }
          errors[field].push(issue.message)
        })

        return {
          success: false,
          message: 'Bitte korrigieren Sie die markierten Fehler.',
          errors
        }
      }
    }

    // Other errors
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      errors: {}
    }
  }
}

export async function submitFahrzeugueberfuehrungForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const rawData = Object.fromEntries(formData.entries())
    
    // Handle file uploads
    const vehicleImages = formData.getAll('vehicleImages') as File[]
    const validFiles = vehicleImages.filter(file => file.size > 0) // Filter out empty files
    
    const processedData = {
      ...rawData,
      agbChecked: formData.has('agbChecked'),
    }
    
    const validatedData = fahrzeugueberfuehrungSchema.parse(processedData)
    
    // Log file information (in a real app, you'd handle file storage here)
    if (validFiles.length > 0) {
      console.log('Vehicle images uploaded:', validFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      })))
      // Here you would typically:
      // 1. Validate file types and sizes
      // 2. Upload files to cloud storage (AWS S3, Google Cloud, etc.)
      // 3. Save file URLs/paths to database
    }
    
    console.log('Fahrzeugüberführung form data validated:', validatedData)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      success: true,
      message: validFiles.length > 0 
        ? 'Ihre Anfrage zur Fahrzeugüberführung wurde erfolgreich gesendet! Wir haben auch Ihre Bilder erhalten und melden uns bald bei Ihnen.'
        : 'Ihre Anfrage zur Fahrzeugüberführung wurde erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
      data: { ...validatedData, fileCount: validFiles.length }
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodErr = error as { issues?: Array<{ path: (string | number)[]; message: string }> }
      if (Array.isArray(zodErr.issues)) {
        const errors: Record<string, string[]> = {}
        zodErr.issues.forEach((issue) => {
          const field = String(issue.path?.[0] ?? 'form')
          if (!errors[field]) errors[field] = []
          errors[field].push(issue.message)
        })
        return { success: false, message: 'Bitte korrigieren Sie die markierten Fehler.', errors }
      }
    }
    return { success: false, message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.', errors: {} }
  }
}

export async function submitMoebelliftForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Convert FormData to plain object
    const rawData = Object.fromEntries(formData.entries())
    
    // Handle checkboxes (they won't be in formData if unchecked)
    const processedData = {
      ...rawData,
      agbChecked: formData.has('agbChecked'),
      bf: formData.has('bf'), // Balkon oder Fenster befahrbar checkbox
    }

    // Validate with Zod
    const validatedData = moebelliftSchema.parse(processedData)

    // Here you would normally save to database or send email
    console.log('Möbellift form data validated:', validatedData)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For now, just return success
    return {
      success: true,
      message: 'Ihre Möbellift-Anfrage wurde erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
      data: validatedData
    }

  } catch (error: unknown) {
    // Handle Zod errors - they have different structure than expected
    if (error && typeof error === 'object' && 'issues' in error) {
      // This is a ZodError
      const zodErr = error as { issues?: Array<{ path: (string | number)[]; message: string }> }
      if (Array.isArray(zodErr.issues)) {
        const errors: Record<string, string[]> = {}
        zodErr.issues.forEach((issue) => {
          const field = String(issue.path?.[0] ?? 'form')
          if (!errors[field]) {
            errors[field] = []
          }
          errors[field].push(issue.message)
        })

        return {
          success: false,
          message: 'Bitte korrigieren Sie die markierten Fehler.',
          errors
        }
      }
    }

    // Other errors
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      errors: {}
    }
  }
}

export async function submitLagerungForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Convert FormData to plain object
    const rawData = Object.fromEntries(formData.entries())
    
    // Handle checkboxes (they won't be in formData if unchecked)
    const processedData = {
      ...rawData,
      agbChecked: formData.has('agbChecked'),
    }

    // Validate with Zod
    const validatedData = lagerungSchema.parse(processedData)

    // Here you would normally save to database or send email
    console.log('Lagerung form data validated:', validatedData)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For now, just return success
    return {
      success: true,
      message: 'Ihre Lagerungsanfrage wurde erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
      data: validatedData
    }

  } catch (error: unknown) {
    // Handle Zod errors - they have different structure than expected
    if (error && typeof error === 'object' && 'issues' in error) {
      // This is a ZodError
      const zodErr = error as { issues?: Array<{ path: (string | number)[]; message: string }> }
      if (Array.isArray(zodErr.issues)) {
        const errors: Record<string, string[]> = {}
        zodErr.issues.forEach((issue) => {
          const field = String(issue.path?.[0] ?? 'form')
          if (!errors[field]) {
            errors[field] = []
          }
          errors[field].push(issue.message)
        })

        return {
          success: false,
          message: 'Bitte korrigieren Sie die markierten Fehler.',
          errors
        }
      }
    }

    // Other errors
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      errors: {}
    }
  }
}
