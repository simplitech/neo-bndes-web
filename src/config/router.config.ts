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

import MyWalletView from '@/views/MyWalletView.vue'

import ListMasterAccountView from '@/views/list/ListMasterAccountView.vue'

import PersistMasterAccountView from '@/views/persist/PersistMasterAccountView.vue'
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
        {path: '/my-wallet', component: MyWalletView},

        {path: '/master-account', component: ListMasterAccountView},
        {path: '/master-account/new', component: PersistMasterAccountView},

        {path: '/account/new', component: PersistAccountView},

        {path: '/transaction/new', component: PersistTransactionView},
      ],
    },
    {path: '*', redirect: '/my-wallet'},
  ],
}
