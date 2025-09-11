"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FormInput } from "../fields/FormInput";
import styles from "../Forms.module.scss";

interface ContactSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function ContactSection({ register, errors }: ContactSectionProps) {
  const t = useTranslations();

  return (
    <div className={styles.form__group}>
      <div className={styles.form__groupLeft}>
        <h2>{t("h2ap")}</h2>
        <FormInput
          name="cname"
          placeholder={t("pl.cname")}
          register={register}
          error={errors.cname}
        />
        <FormInput
          name="firma"
          placeholder={t("pl.firma")}
          register={register}
          error={errors.firma}
        />
        <FormInput
          name="cemail"
          type="email"
          placeholder="E-Mail"
          register={register}
          error={errors.cemail}
        />
      </div>
      
      <div className={styles.form__groupRight}>
        <h2>{t("h2kd")}</h2>
        <FormInput
          name="tel"
          type="tel"
          placeholder={t("pl.phone")}
          register={register}
          error={errors.tel}
        />
        <FormInput
          name="mob"
          type="tel"
          placeholder={t("pl.mobile")}
          register={register}
          error={errors.mob}
        />
        <FormInput
          name="fax"
          placeholder={t("pl.fax")}
          register={register}
          error={errors.fax}
        />
      </div>
    </div>
  );
}
