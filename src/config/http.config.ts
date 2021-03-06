/**
 * @file
 * Http Request Configuration
 * Used in library: vue-resource
 *
 * This file provides the standard configuration to communicate with the server
 * See https://github.com/pagekit/vue-resource/blob/develop/docs/http.md#interceptors
 * This configuration will be set in @/bootstrap/app.ts
 */

import VueResource from 'vue-resource'
import {$, getVersion, getLanguage, isLogged, signOut, HttpStatus, error} from '@/simpli'

/**
 * Base URL of the server API
 * @type {string}
 */
export const apiURL = process.env.VUE_APP_API_URL || 'http://localhost/api'

/**
 * Standard behavior during a request
 * @param {VueResource.HttpOptions} request
 * @param {Function} next
 */
export const httpInterceptor = (request: VueResource.HttpOptions, next: any) => {
  const regex = new RegExp(`^${apiURL}\\S*$`, 'g')
  const match = regex.exec(request.url || '')

  if (match) {
    request.headers.set('Accept-Language', getLanguage())
    request.headers.set('X-Client-Version', `w${getVersion()}`) // w = web

    if (isLogged()) request.headers.set('Authorization', `Bearer`)
  }

  next((resp: VueResource.HttpResponse) => {
    if (!resp.status) error('system.error.noServer')
    else if (resp.status >= 400) {
      if (resp.status === HttpStatus.UNAUTHORIZED) signOut()

      $.snotify.error(resp.data.message || resp.statusText, resp.status.toString())
    }
  })
}
