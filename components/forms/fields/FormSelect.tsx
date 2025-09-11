"use client";

import { forwardRef } from "react";
import { UseFormRegister, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import styles from "../Forms.module.scss";

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  name: string;
  options: SelectOption[];
  register: UseFormRegister<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  defaultValue?: string | number;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ name, options, register, error, defaultValue, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <div className={styles.select}>
          <select
            {...register(name)}
            className={error ? styles.inputError : ""}
            defaultValue={defaultValue}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} />
        </div>
        {error && <span className={styles.errorText}>{(error as any).message || "Error"}</span>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
