"use client";

import { forwardRef } from "react";
import { UseFormRegister, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import styles from "../Forms.module.scss";

interface FormTextareaProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  rows?: number;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ name, placeholder, register, error, rows = 4, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <textarea
          {...register(name)}
          placeholder={placeholder}
          className={error ? styles.inputError : ""}
          rows={rows}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorText}>{(error as any).message || "Error"}</span>}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
