import { z } from "zod";

// Helper function to convert undefined to empty string
const stringField = (message: string) => z.preprocess(
  (val) => val === undefined || val === null ? "" : val,
  z.string().min(1, message)
);

const optionalStringField = () => z.preprocess(
  (val) => val === undefined || val === null ? "" : val,
  z.string().optional()
);

const emailField = (message: string) => z.preprocess(
  (val) => val === undefined || val === null ? "" : val,
  z.string().email(message)
);

// Base schemas for reusable fields
export const baseContactSchema = z.object({
  cname: stringField("Name ist erforderlich").refine(val => val.length >= 2, "Name ist erforderlich"),
  cemail: emailField("Gültige E-Mail-Adresse erforderlich"),
  firma: optionalStringField(),
  tel: stringField("Telefonnummer ist erforderlich"),
  fax: optionalStringField(),
  mob: optionalStringField(),
});

export const baseLocationSchema = z.object({
  plz: stringField("PLZ ist erforderlich").refine(val => val.length >= 5, "PLZ ist erforderlich"),
  ort: stringField("Ort ist erforderlich"),
  strasse: stringField("Straße ist erforderlich"),
  land: stringField("Land ist erforderlich"),
  et: optionalStringField(),
});

export const baseMovingLocationSchema = baseLocationSchema.extend({
  anz: stringField("Anzahl Zimmer ist erforderlich"),
  haus: z.coerce.number().int().min(0).max(1),
  aufzug: z.coerce.number().int().min(0).max(1),
});

// Date schema
export const baseDateSchema = z.object({
  lort: stringField("Datum ist erforderlich"),
  aort: optionalStringField(),
});

// Vehicle schema
export const vehicleSchema = z.object({
  kfzart: stringField("Fahrzeugtyp ist erforderlich"),
  zustand: stringField("Zustand ist erforderlich"),
});

// Goods/Packaging schema
export const goodsSchema = z.object({
  vpart: optionalStringField(),
  vpanzahl: optionalStringField(),
  vpkb: optionalStringField(),
  wgw: optionalStringField(),
  wmasse: optionalStringField(),
});

// Storage schema
export const storageSchema = z.object({
  zr: stringField("Zeitraum ist erforderlich"),
});

// Common fields
export const commonFieldsSchema = z.object({
  comment: optionalStringField(),
  agbChecked: z.preprocess(
    (val) => {
      // Convert various truthy values to boolean
      if (val === true || val === "true" || val === "on") return true;
      // Convert falsy values (including undefined, false, null, empty string) to false
      return false;
    },
    z.boolean().refine(val => val === true, {
      message: "AGB müssen akzeptiert werden"
    })
  ),
});

// Umzug form schema
export const umzugSchema = baseContactSchema
  .extend({
    // Pickup location
    ldplz: stringField("PLZ ist erforderlich").refine(val => val.length >= 5, "PLZ ist erforderlich"),
    ldort: stringField("Ort ist erforderlich"),
    ldstrasse: stringField("Straße ist erforderlich"),
    ldland: stringField("Land ist erforderlich"),
    ldanz: stringField("Anzahl Zimmer ist erforderlich"),
    ldet: optionalStringField(),
    ldhaus: z.coerce.number().int().min(0).max(1),
    ldaufzug: z.coerce.number().int().min(0).max(1),
    
    // Delivery location
    abplz: stringField("PLZ ist erforderlich").refine(val => val.length >= 5, "PLZ ist erforderlich"),
    abort: stringField("Ort ist erforderlich"),
    abstrasse: stringField("Straße ist erforderlich"),
    abland: stringField("Land ist erforderlich"),
    abanz: stringField("Anzahl Zimmer ist erforderlich"),
    abet: optionalStringField(),
    abhaus: z.coerce.number().int().min(0).max(1),
    abaufzug: z.coerce.number().int().min(0).max(1),
    
    // Dates
    lort: stringField("Datum ist erforderlich"),
    aort: optionalStringField(),
    
    // Services
    montage: z.coerce.number().int().min(0).max(3),
    packen: z.coerce.number().int().min(0).max(3),
  })
  .merge(commonFieldsSchema);

// Beiladung form schema
export const beiladungSchema = baseContactSchema
  .extend({
    // Pickup location
    ldplz: stringField("PLZ ist erforderlich").refine(val => val.length >= 5, "PLZ ist erforderlich"),
    ldort: stringField("Ort ist erforderlich"),
    ldstrasse: stringField("Straße ist erforderlich"),
    ldland: stringField("Land ist erforderlich"),
    ldet: optionalStringField(),
    
    // Delivery location
    abplz: stringField("PLZ ist erforderlich").refine(val => val.length >= 5, "PLZ ist erforderlich"),
    abort: stringField("Ort ist erforderlich"),
    abstrasse: stringField("Straße ist erforderlich"),
    abland: stringField("Land ist erforderlich"),
    abet: optionalStringField(),
    
    // Date
    lort: stringField("Datum ist erforderlich"),
    
    // Goods
    vpart: optionalStringField(),
    vpanzahl: optionalStringField(),
    vpkb: optionalStringField(),
    wgw: optionalStringField(),
    wmasse: optionalStringField(),
  })
  .merge(commonFieldsSchema);

// Transport form schema
export const transportSchema = beiladungSchema; // Same as beiladung

// Möbellift form schema
export const moebelliftSchema = baseContactSchema
  .extend({
    // Operation location
    eoplz: stringField("PLZ ist erforderlich").refine(val => val.length >= 5, "PLZ ist erforderlich"),
    eoort: stringField("Ort ist erforderlich"),
    eostrasse: stringField("Straße ist erforderlich"),
    eoland: stringField("Land ist erforderlich"),
    eoet: optionalStringField(),
    
    // Date
    lort: stringField("Datum ist erforderlich"),
    
    // Special field for lift - optional boolean, both values are valid
    bf: z.preprocess(
      (val) => {
        // Convert various truthy values to boolean
        if (val === true || val === "true" || val === "on") return true;
        // Convert falsy values to false
        return false;
      },
      z.boolean().optional() // Optional boolean - both true and false are valid
    ),
  })
  .merge(commonFieldsSchema);

// Vehicle transport form schema
export const fahrzeugueberfuehrungSchema = baseContactSchema
  .extend({
    // Pickup location
    ldplz: stringField("PLZ ist erforderlich").refine(val => val.length >= 5, "PLZ ist erforderlich"),
    ldort: stringField("Ort ist erforderlich"),
    ldstrasse: stringField("Straße ist erforderlich"),
    ldland: stringField("Land ist erforderlich"),
    
    // Delivery location
    abplz: stringField("PLZ ist erforderlich").refine(val => val.length >= 5, "PLZ ist erforderlich"),
    abort: stringField("Ort ist erforderlich"),
    abstrasse: stringField("Straße ist erforderlich"),
    abland: stringField("Land ist erforderlich"),
    
    // Date
    lort: stringField("Datum ist erforderlich"),
    
    // Vehicle details
    kfzart: stringField("Fahrzeugtyp ist erforderlich"),
    zustand: stringField("Zustand ist erforderlich"),
  })
  .merge(commonFieldsSchema);

// Storage form schema
export const lagerungSchema = baseContactSchema
  .extend({
    // Start date
    lort: stringField("Startdatum ist erforderlich"),
    
    // Storage period (zeitraum)
    zeitraum: stringField("Zeitraum ist erforderlich"),
    
    // Weight and dimensions (optional)
    gewicht: optionalStringField(), // Weight
    masse: optionalStringField(),   // Mass/Dimensions
    kubikmeter: optionalStringField(), // Cubic meters
  })
  .merge(commonFieldsSchema);

// Export types
export type UmzugFormData = z.infer<typeof umzugSchema>;
export type BeiladungFormData = z.infer<typeof beiladungSchema>;
export type TransportFormData = z.infer<typeof transportSchema>;
export type MoebelliftFormData = z.infer<typeof moebelliftSchema>;
export type FahrzeugueberfuehrungFormData = z.infer<typeof fahrzeugueberfuehrungSchema>;
export type LagerungFormData = z.infer<typeof lagerungSchema>;

export type FormData = 
  | UmzugFormData 
  | BeiladungFormData 
  | TransportFormData 
  | MoebelliftFormData 
  | FahrzeugueberfuehrungFormData 
  | LagerungFormData;
