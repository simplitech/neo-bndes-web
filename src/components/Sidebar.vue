<template>
  <div class="sidebar des-w-200 tab-w-200 w-full des-h-window">
    <aside class="verti des-w-200 tab-w-200 w-full des-h-window tab-h-window des-fixed tab-fixed y-scroll">

      <div class="horiz items-center">
        <div class="brand">
          <img src="@/assets/img/logo.png" alt="Logo">
          <span>
            NeoBndes
          </span>
        </div>

        <a class="mobile icon icon-menu" @click="toggleMenu"></a>
      </div>

      <!--<div class="horiz items-center">-->
      <!--<h3 class="truncate">-->
      <!--{{user.email}}-->
      <!--</h3>-->
      <!--</div>-->

      <div class="weight-1" :class="{ 'desktop-tablet': !menu }">
        <ul>

          <li>
            <router-link to="/dashboard" @click.native="menuOff" class="btn fluid flat contrast">
              <i class="icon icon-home"></i>
              {{ $t('view.dashboard.title') }}
            </router-link>
          </li>

          <li>
            <router-link to="/transaction-type/list" @click.native="menuOff" class="btn fluid flat contrast">
              {{ $t('classes.TransactionType.title') }}
            </router-link>
          </li>
          <li>
            <router-link to="/admin/list" @click.native="menuOff" class="btn fluid flat contrast">
              {{ $t('classes.Admin.title') }}
            </router-link>
          </li>
          <li>
            <router-link to="/transaction-input/list" @click.native="menuOff" class="btn fluid flat contrast">
              {{ $t('classes.TransactionInput.title') }}
            </router-link>
          </li>
          <li>
            <router-link to="/transaction/list" @click.native="menuOff" class="btn fluid flat contrast">
              {{ $t('classes.Transaction.title') }}
            </router-link>
          </li>
          <li>
            <router-link to="/block/list" @click.native="menuOff" class="btn fluid flat contrast">
              {{ $t('classes.Block.title') }}
            </router-link>
          </li>
          <li>
            <router-link to="/asset/list" @click.native="menuOff" class="btn fluid flat contrast">
              {{ $t('classes.Asset.title') }}
            </router-link>
          </li>

          <div class="weight-1"></div>

          <li>
            <a @click="signOut(false)" class="btn fluid flat contrast">
              <i class="icon icon-logout"/>
              {{$t('app.logout')}}
            </a>
          </li>
        </ul>

      </div>

      <footer class="p-10 desktop-tablet text-light">
        <small>
          <b>Version</b>
          {{version}}
        </small>
      </footer>

    </aside>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {Action, Getter} from 'vuex-class'

  @Component
  export default class Sidebar extends Vue {
    @Getter('version') version!: string
    // @Getter('auth/user') user!: User
    @Action('auth/signOut') signOut!: Function

    menu: boolean = false

    toggleMenu() {
      this.menu = !this.menu
    }

    menuOff() {
      this.menu = false
    }
  }
</script>
