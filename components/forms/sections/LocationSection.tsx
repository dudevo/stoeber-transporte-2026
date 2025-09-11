"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FormInput } from "../fields/FormInput";
import { FormSelect } from "../fields/FormSelect";
import styles from "../Forms.module.scss";

interface LocationSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  prefix: string; // "ld" for pickup, "ab" for delivery, "eo" for operation
  title: string; // translation key for section title
  includeRooms?: boolean;
  includeFloor?: boolean;
  includeHouseType?: boolean;
  includeElevator?: boolean;
  minDate?: string;
}

export function LocationSection({ 
  register, 
  errors, 
  prefix, 
  title,
  includeRooms = false,
  includeFloor = false,
  includeHouseType = false,
  includeElevator = false,
  minDate
}: LocationSectionProps) {
  const t = useTranslations();

  // Generate field names based on prefix
  const dateField = prefix === "ld" ? "lort" : "aort";
  const plzField = `${prefix}plz`;
  const ortField = prefix === "ld" ? "ldort" : "abort"; // Fix field name mismatch
  const strasseField = prefix === "ld" ? "ldstrasse" : "abstrasse"; // Fix field name mismatch
  const landField = prefix === "ld" ? "ldland" : "abland"; // Fix field name mismatch
  const etField = prefix === "ld" ? "ldet" : "abet"; // Fix field name mismatch
  const anzField = `${prefix}anz`;
  const hausField = `${prefix}haus`;
  const aufzugField = `${prefix}aufzug`;

  // Room options (z0="1 Zimmer", z1="2 Zimmer", ..., z9="10 Zimmer")
  const roomOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(), // value: 1,2,3,4,5,6,7,8,9,10
    label: t(`ldanz.z${i}`)    // key: z0,z1,z2,z3,z4,z5,z6,z7,z8,z9
  }));

  // House type options
  const houseOptions = [
    { value: "0", label: t("ldhaus.ld0") },
    { value: "1", label: t("ldhaus.ld1") }
  ];

  // Elevator options
  const elevatorOptions = [
    { value: "0", label: t("ldaufzug.ld0") },
    { value: "1", label: t("ldaufzug.ld1") }
  ];

  return (
    <div className={styles.form__groupLeft}>
      <h2>{t(title)}</h2>
      
      {/* Date field for pickup location */}
      {prefix === "ld" && (
        <FormInput
          name={dateField}
          type="date"
          register={register}
          error={errors[dateField]}
          min={minDate}
        />
      )}
      
      {/* Date field for delivery location - removed as it's not required for most forms */}
      
      <FormInput
        name={plzField}
        placeholder={t("pl.plz")}
        register={register}
        error={errors[plzField]}
      />
      
      <FormInput
        name={ortField}
        placeholder={t("pl.ort")}
        register={register}
        error={errors[ortField]}
      />
      
      <FormInput
        name={strasseField}
        placeholder={t("pl.street")}
        register={register}
        error={errors[strasseField]}
      />
      
      <FormInput
        name={landField}
        placeholder={t("pl.land")}
        register={register}
        error={errors[landField]}
      />
      
      {includeRooms && (
        <FormSelect
          name={anzField}
          options={roomOptions}
          register={register}
          error={errors[anzField]}
          defaultValue="1"
        />
      )}
      
      {includeFloor && (
        <FormInput
          name={etField}
          placeholder={t("pl.et")}
          register={register}
          error={errors[etField]}
        />
      )}
      
      {includeHouseType && (
        <FormSelect
          name={hausField}
          options={houseOptions}
          register={register}
          error={errors[hausField]}
          defaultValue="0"
        />
      )}
      
      {includeElevator && (
        <FormSelect
          name={aufzugField}
          options={elevatorOptions}
          register={register}
          error={errors[aufzugField]}
          defaultValue="0"
        />
      )}
    </div>
  );
}
