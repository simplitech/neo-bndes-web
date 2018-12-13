<template>
  <main>
    <!--Header-->
    <navbar/>

    <!--Auth View-->
    <transition name="fade-down" mode="out-in">
      <router-view/>
    </transition>
  </main>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Action} from 'vuex-class'
import Navbar from '@/components/Navbar.vue'

@Component({
  components: { Navbar },
})
export default class DefaultPanelLayout extends Vue {
}
</script>
