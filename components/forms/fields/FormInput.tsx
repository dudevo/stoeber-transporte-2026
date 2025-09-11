"use client";

import { forwardRef } from "react";
import { UseFormRegister, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import styles from "../Forms.module.scss";

interface FormInputProps {
  name: string;
  type?: "text" | "email" | "tel" | "date";
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  required?: boolean;
  min?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, type = "text", placeholder, register, error, required, min, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={error ? styles.inputError : ""}
          min={min}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorText}>{(error as any).message || "Error"}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
