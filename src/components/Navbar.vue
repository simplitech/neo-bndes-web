<template>
  <header>
    <nav>
      <div class="container">
        <div class="level-1">
          <div class="label secondary">
            <div class="label-prefix">
              Bloco Atual
            </div>
            {{ blockcount }}
          </div>

          <div class="label secondary">
            <div class="label-prefix">
              Última atualização
            </div>
            há {{ secondsSinceLastBlock }} segundos
          </div>

          <div class="label secondary">
            <div class="label-prefix">
              Rede
            </div>
            Testnet
          </div>
        </div>

        <div class="level-2">
          <div class="brand">
            <router-link to="/">
              {{$t('navbar.brand')}}
            </router-link>
          </div>

          <div class="slot-1">
            <ul>
              <li>
                <router-link tag="button" to="/master-account">
                  {{$t('navbar.masterAccounts')}}
                </router-link>
              </li>
              <li>
                <router-link tag="button" to="/transaction/new">
                  {{$t('navbar.transfer')}}
                </router-link>
              </li>
              <li>
                <router-link tag="button" to="/charts">
                  {{$t('navbar.charts')}}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="slot-2">
            <ul>
              <li>
                <router-link class="btn" to="/my-wallet">
                  <i class="icon icon-wallet"></i>
                  {{$t('navbar.myWallet')}}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="slot-3" v-if="isLogged">
            <ul>
              <li>
                <button @click="signOut()">
                  <i class="icon icon-logout"></i>
                  {{$t('app.logout')}}
                </button>
              </li>
            </ul>
          </div>

          <div class="menu-icon">
            <button class="icon flat" @click="showSidebar">
              <img src="@/assets/img/menu.svg" alt="menu">
            </button>
          </div>

        </div>
      </div>
    </nav>

    <aside>
      <transition name="fade" mode="out-in">
        <div class="outbound" @click="hideSidebar" v-if="sidebar"></div>
      </transition>

      <transition name="fade-left-big" mode="out-in">
        <nav class="sidebar" v-if="sidebar">
          <div class="brand">
            <router-link to="/" class="btn">
              {{$t('navbar.brand')}}
            </router-link>
          </div>

          <div class="slot-1">
            <ul>
              <li>
                <router-link tag="button" to="/register-master-account">
                  {{$t('navbar.registerMasterAccount')}}
                </router-link>
              </li>
            </ul>

          </div>

          <div class="slot-2">
            <ul>
              <li>
                <router-link class="btn" to="/my-wallet">
                  <i class="icon icon-wallet"></i>
                  {{$t('navbar.myWallet')}}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="slot-3" v-if="isLogged">
            <ul>
              <li>
                <button @click="signOut()">
                  <i class="icon icon-logout"></i>
                  {{$t('app.logout')}}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </transition>
    </aside>

  </header>
</template>

<script lang="ts">
  import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
  import moment from 'moment'
  import {Action, Getter} from 'vuex-class'
  import { getBlockCount } from '@/simpli'

  @Component
  export default class Navbar extends Vue {
    @Action('auth/signOut') signOut!: Function
    @Getter('auth/isLogged') isLogged!: boolean

    sidebar = false
    blockcount = 0
    lastBlockUpdate: moment.Moment | null = null
    secondsSinceLastBlock = 0

    mounted() {
      window.setInterval(this.loadInfo, 5000)
      window.setInterval(this.updateSecondsSinceLastBlock, 500)
    }

    @Watch('blockcount')
    onBlockCount() {
      this.lastBlockUpdate = moment()
    }

    updateSecondsSinceLastBlock() {
      if (this.lastBlockUpdate) {
        this.secondsSinceLastBlock = moment().diff(this.lastBlockUpdate, 's')
      }
    }

    async loadInfo() {
      this.blockcount = await getBlockCount()
    }

    hideSidebar() {
      this.sidebar = false
    }

    showSidebar() {
      this.sidebar = true
    }
  }
</script>
