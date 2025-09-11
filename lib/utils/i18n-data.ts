export type TranslationFunction = (key: string) => string;

export interface CategoryConfig {
  key: string; // translation key inside namespace
  href: string;
}

export interface LocalizedCategory {
  title: string;
  href: string;
}

/**
 * Builds a list of localized categories from a config and translation function.
 * Example usage:
 * const t = await getTranslations({ locale, namespace: 'forms' });
 * const cats = buildLocalizedCategories(configs, t, 'dl');
 */
export function buildLocalizedCategories(
  configs: CategoryConfig[],
  t: TranslationFunction,
  namespace: string = "dl",
): LocalizedCategory[] {
  return configs.map((c) => ({
    href: c.href,
    title: t(`${namespace}.${c.key}`),
  }));
}
