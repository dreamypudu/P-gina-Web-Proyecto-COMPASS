import es from './es.json';
import en from './en.json';

export const languages = { es: 'Español', en: 'English' } as const;
export const defaultLang = 'es';
export type Lang = keyof typeof languages;

const dict = { es, en } as const;

/** Resolve the active language from an Astro URL (`/en/...` => en). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg in dict) return seg as Lang;
  return defaultLang;
}

/**
 * Return a translator bound to `lang`.
 * `t('hero.titleDo')` => string. `t('dice.rows')` => array/object.
 * Falls back to the default language, then to the key itself.
 */
export function useTranslations(lang: Lang) {
  const active = dict[lang] ?? dict[defaultLang];
  return function t<T = string>(path: string): T {
    const lookup = (src: unknown) =>
      path.split('.').reduce<unknown>((acc, key) => {
        if (acc && typeof acc === 'object' && key in (acc as object)) {
          return (acc as Record<string, unknown>)[key];
        }
        return undefined;
      }, src);
    const value = lookup(active) ?? lookup(dict[defaultLang]);
    return (value ?? path) as T;
  };
}

/** Prefix a path with the language (es stays at root, en under /en/). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '' : clean}`;
}

/** Path to the same page in the other language (for the switcher). */
export function alternatePath(lang: Lang): string {
  return lang === 'es' ? '/en/' : '/';
}
