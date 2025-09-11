"use client";

import { forwardRef } from "react";
import { UseFormRegister, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { useTranslations } from "next-intl";
import styles from "../Forms.module.scss";

interface FormCheckboxProps {
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ name, register, error, ...props }, ref) => {
    const t = useTranslations();
    
    return (
      <div className={styles.checkboxWrapper}>
        <label className={styles.checkboxLabel}>
          <input
            {...register(name)}
            type="checkbox"
            className={styles.checkbox}
            ref={ref}
            {...props}
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
        {error && <span className={styles.errorText}>{(error as any).message || "Error"}</span>}
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";
