<template>
  <div>
    <section class="header mb-20">
      <h1 class="m-0">
        {{$t('view.myAccount.title')}}
      </h1>
    </section>

    <section class="mb-20">
      <div class="container medium">
        <div class="elevated">
          <div class="py-10">
            <div class="container fluid">

              <div class="display small mb-20">
                Carteira não encontrada
              </div>

              <div class="horiz items-center gutter-5">
                <button>
                  Abrir Carteira
                </button>
                <button class="success">
                  Criar Carteira
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class MyAccountView extends Vue {
  }
</script>
