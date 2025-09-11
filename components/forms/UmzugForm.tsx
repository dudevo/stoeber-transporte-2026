"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Truck } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { umzugSchema } from "@/lib/validations/forms";
import FormContainer from "@/components/ui/layout/form-container";
import { ContactSection } from "./sections/ContactSection";
import { LocationSection } from "./sections/LocationSection";
import { FormSelect } from "./fields/FormSelect";
import { FormTextarea } from "./fields/FormTextarea";
import { FormCheckbox } from "./fields/FormCheckbox";
import styles from "./Forms.module.scss";

export default function UmzugForm() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showGlobalError, setShowGlobalError] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(umzugSchema) as any,
    mode: "onSubmit",
    defaultValues: {
      cname: "",
      cemail: "",
      firma: "",
      tel: "",
      fax: "",
      mob: "",
      comment: "",
      lort: today,
      aort: "", // Optional delivery date
      ldplz: "",
      ldort: "",
      ldstrasse: "",
      ldland: "",
      ldanz: "1", // Start with 1 room instead of 0
      ldet: "",
      ldhaus: 0,
      ldaufzug: 0,
      abplz: "",
      abort: "",
      abstrasse: "",
      abland: "",
      abanz: "1", // Start with 1 room instead of 0
      abet: "",
      abhaus: 0,
      abaufzug: 0,
      montage: 0,
      packen: 0,
      agbChecked: false,
    },
  });

  const lortValue = watch("lort");

  // Handle errors and scroll to first error field
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      setShowGlobalError(true);

      // Find the first error field and scroll to it
      const firstErrorField = errorKeys[0];
      const errorElement = document.querySelector(
        `[name="${firstErrorField}"]`,
      );

      if (errorElement) {
        setTimeout(() => {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Focus the element if it's an input
          if (
            errorElement instanceof HTMLInputElement ||
            errorElement instanceof HTMLSelectElement ||
            errorElement instanceof HTMLTextAreaElement
          ) {
            errorElement.focus();
          }
        }, 100);
      }
    } else {
      setShowGlobalError(false);
    }
  }, [errors]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setShowGlobalError(false); // Hide error message on successful validation
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setMessage(result.message || "Formular wurde erfolgreich gesendet!");
      reset();
    } catch (error) {
      setMessage(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      );
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 20000);
    }
  };

  const onInvalid = () => {
    setShowGlobalError(true);
  };

  // Service options
  const montageOptions = [
    { value: "0", label: t("mont.m0") },
    { value: "1", label: t("mont.m1") },
    { value: "2", label: t("mont.m2") },
    { value: "3", label: t("mont.m3") },
  ];

  const packenOptions = [
    { value: "0", label: t("pk.pk0") },
    { value: "1", label: t("pk.pk1") },
    { value: "2", label: t("pk.pk2") },
    { value: "3", label: t("pk.pk3") },
  ];

  const pageTitle = t("dl.h1.uz");

  return (
    <FormContainer
      title={pageTitle}
      icon={<Truck size={40} color="#274c88" strokeWidth={1.5} />}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={styles.form}
      >
        {/* Contact Information */}
        <ContactSection register={register} errors={errors} />

        {/* Pickup and Delivery Locations */}
        <div className={styles.form__group}>
          <LocationSection
            register={register}
            errors={errors}
            prefix="ld"
            title="h2lo"
            includeRooms={true}
            includeFloor={true}
            includeHouseType={true}
            includeElevator={true}
            minDate={today}
          />

          <LocationSection
            register={register}
            errors={errors}
            prefix="ab"
            title="h2ao"
            includeRooms={true}
            includeFloor={true}
            includeHouseType={true}
            includeElevator={true}
            minDate={lortValue}
          />
        </div>

        {/* Services */}
        <div className={styles.form__group}>
          <div className={styles.form__groupLeft}>
            <h2>{t("h2mt")}</h2>
            <FormSelect
              name="montage"
              options={montageOptions}
              register={register}
              error={errors.montage}
              defaultValue="0"
            />
          </div>

          <div className={styles.form__groupRight}>
            <h2>{t("h2pk")}</h2>
            <FormSelect
              name="packen"
              options={packenOptions}
              register={register}
              error={errors.packen}
              defaultValue="0"
            />
          </div>
        </div>

        {/* Comment */}
        <div className={styles.form__group}>
          <div className={styles.form__groupComment}>
            <h2>{t("h2c")}</h2>
            <FormTextarea
              name="comment"
              register={register}
              error={errors.comment}
              rows={4}
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className={styles.form__group}>
          <FormCheckbox
            name="agbChecked"
            register={register}
            error={errors.agbChecked}
          />
        </div>

        {/* Global Error Message */}
        {showGlobalError && (
          <div className={styles.globalErrorMessage}>
            Es sind noch Fehler im Formular vorhanden. Bitte korrigieren Sie die
            markierten Felder.
          </div>
        )}

        {/* Submit Button */}
        <div className={styles.form__group}>
          <button
            type="submit"
            disabled={loading || isSubmitting}
            style={{
              backgroundColor: loading || isSubmitting ? "#ccc" : "#2757a8",
              color: "white",
              padding: "0.75rem 2rem",
              border: "none",
              borderRadius: "6px",
              cursor: loading || isSubmitting ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            {loading || isSubmitting ? "Wird gesendet..." : t("btn")}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={styles.form__group}>
            <div
              style={{
                padding: "1rem",
                backgroundColor: message.includes("Fehler")
                  ? "#f8d7da"
                  : "#d4edda",
                color: message.includes("Fehler") ? "#721c24" : "#155724",
                borderRadius: "6px",
                border: `1px solid ${message.includes("Fehler") ? "#f5c6cb" : "#c3e6cb"}`,
              }}
            >
              {message}
            </div>
          </div>
        )}
      </form>
    </FormContainer>
  );
}
