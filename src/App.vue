<template>
  <div>
    <transition name="blur" mode="out-in">
      <router-view/>
    </transition>
    <vue-snotify :class="toastStyle"/>
  </div>
</template>

<style lang="scss">
  @import './scss/app.scss';
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {ToastDefaultConfig, ToastDefaultStyle, ToastGlobalConfig, ToastStyle} from '@/simpli'

@Component
export default class App extends Vue {
  toastStyle: ToastStyle = ToastDefaultStyle

  // Standard Behaviours
  created() {
    this.$snotify.setDefaults({
      global: ToastGlobalConfig,
      toast: ToastDefaultConfig,
    })
  }
}
</script>
