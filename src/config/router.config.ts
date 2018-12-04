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
import SignInView from '@/views/SignInView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import RecoverPasswordView from '@/views/RecoverPasswordView.vue'

import ListTransactionTypeView from '@/views/list/ListTransactionTypeView.vue'
import ListAdminView from '@/views/list/ListAdminView.vue'
import ListTransactionInputView from '@/views/list/ListTransactionInputView.vue'
import ListTransactionView from '@/views/list/ListTransactionView.vue'
import ListBlockView from '@/views/list/ListBlockView.vue'
import ListAssetView from '@/views/list/ListAssetView.vue'

import PersistAccountView from '@/views/persist/PersistAccountView.vue'
import PersistAdminView from '@/views/persist/PersistAdminView.vue'
import PersistTransactionInputView from '@/views/persist/PersistTransactionInputView.vue'
import PersistTransactionTypeView from '@/views/persist/PersistTransactionTypeView.vue'
import PersistBlockView from '@/views/persist/PersistBlockView.vue'
import PersistAssetView from '@/views/persist/PersistAssetView.vue'
import PersistTransactionView from '@/views/persist/PersistTransactionView.vue'

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
      path: '/password/reset',
      name: 'resetPassword',
      component: ResetPasswordView,
    },
    {
      path: '/password/recover/:hash',
      name: 'recoverPassword',
      component: RecoverPasswordView,
      props: true,
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
        {path: '/transaction-type/list', component: ListTransactionTypeView},
        {path: '/admin/list', component: ListAdminView},
        {path: '/transaction-input/list', component: ListTransactionInputView},
        {path: '/transaction/list', component: ListTransactionView},
        {path: '/block/list', component: ListBlockView},
        {path: '/asset/list', component: ListAssetView},

        {path: '/admin/new', component: PersistAdminView},
        {
          path: '/admin/edit/:id',
          name: 'editAdmin',
          component: PersistAdminView,
          props: true,
        },

        {path: '/transaction-input/new', component: PersistTransactionInputView},
        {
          path: '/transaction-input/edit/:id',
          name: 'editTransactionInput',
          component: PersistTransactionInputView,
          props: true,
        },

        {path: '/transaction-type/new', component: PersistTransactionTypeView},
        {
          path: '/transaction-type/edit/:id',
          name: 'editTransactionType',
          component: PersistTransactionTypeView,
          props: true,
        },

        {path: '/block/new', component: PersistBlockView},
        {
          path: '/block/edit/:id',
          name: 'editBlock',
          component: PersistBlockView,
          props: true,
        },

        {path: '/asset/new', component: PersistAssetView},
        {
          path: '/asset/edit/:id',
          name: 'editAsset',
          component: PersistAssetView,
          props: true,
        },

        {path: '/transaction/new', component: PersistTransactionView},
        {
          path: '/transaction/edit/:id',
          name: 'editTransaction',
          component: PersistTransactionView,
          props: true,
        },
      ],
    },
    {path: '/', redirect: '/signIn'},
    {path: '*', redirect: '/dashboard'},
  ],
}
