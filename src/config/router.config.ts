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

import SignInToWalletView from '@/views/SignInToWalletView.vue'
import MyWalletView from '@/views/MyWalletView.vue'
import RegisterMasterAccountView from '@/views/RegisterMasterAccountView.vue'

import PersistAccountView from '@/views/persist/PersistAccountView.vue'
import PersistTransactionView from '@/views/persist/PersistTransactionView.vue'

/**
 * VUE Router Configuration
 */
export const router = {
  routes: [
    {
      path: '/my-wallet',
      component: DefaultPanelLayout,
      children: [
        {path: '/my-wallet', name: 'my-wallet', component: MyWalletView},

        {path: '/my-wallet/signin', component: SignInToWalletView},
        {path: '/account/new', component: PersistAccountView},
        {path: '/transaction/new', component: PersistTransactionView},
        {path: '/register-master-account', component: RegisterMasterAccountView},
      ],
    },
    {path: '*', redirect: '/my-wallet'},
  ],
}
