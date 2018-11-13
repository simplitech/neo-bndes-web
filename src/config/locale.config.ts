/**
 * @file
 * Locale Configuration
 * Used in library: vue-i18n
 *
 * This file controls the languages and currencies
 * See https://kazupon.github.io/vue-i18n/guide/started.html
 * This configuration will be set in @/bootstrap/app.ts
 */

import {Lang, Currency} from '@/simpli'

/**
 * App languages pack
 */
import enUs from '@/locale/en-US/lang'
import ptBr from '@/locale/pt-BR/lang'

/**
 * Moment JS languages pack
 * Note: US English is already imported by default
 */
import 'moment/locale/pt-br'

/**
 * App default language
 * @type {Lang}
 */
export const defaultLang = process.env.VUE_APP_LANG as Lang

/**
 * App default currency
 * @type {Currency}
 */
export const defaultCurrency = process.env.VUE_APP_CURRENCY as Currency

/**
 * VUE i18n locale
 */
export const locale = {
  [Lang.EN_US]: enUs,
  [Lang.PT_BR]: ptBr,
}
