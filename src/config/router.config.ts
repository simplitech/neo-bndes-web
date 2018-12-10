/**
 * @file
 * Router Configuration
 * Used in library: vue-router
 *
 * Use this file to register the App routes
 * See https://router.vuejs.org/guide/#javascript
 * This configuration will be set in @/bootstrap/app.ts
 */

import DefaultPanelLayout from '@/views/layouts/DefaultPanelLayout.vue'
import DashboardView from '@/views/DashboardView.vue'

import MyAccountView from '@/views/MyAccountView.vue'
import MyWalletView from '@/views/MyWalletView.vue'
import RegisterMasterAccountView from '@/views/RegisterMasterAccountView.vue'
import SignInView from '@/views/SignInView.vue'

import PersistAccountView from '@/views/persist/PersistAccountView.vue'

/**
 * VUE Router Configuration
 */
export const router = {
  routes: [
    {
      path: '/signIn',
      name: 'signIn',
      component: SignInView,
    },
    {
      path: '/dashboard',
      component: DefaultPanelLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView,
        },

        {path: '/account/new', component: PersistAccountView},
        {path: '/my-account', component: MyAccountView},
        {path: '/my-wallet', component: MyWalletView},
        {path: '/register-master-account', component: RegisterMasterAccountView},
      ],
    },
    {path: '/', redirect: '/signIn'},
    {path: '*', redirect: '/dashboard'},
  ],
}
