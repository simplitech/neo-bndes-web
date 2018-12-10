<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          Registrar Conta Master
        </h1>
      </div>
    </section>

    <section class="mb-20">
      <div class="container">
        <div class="elevated">
          <div class="py-20">
            <div class="container fluid">

              <div class="horiz gutter-10">
                <input-text label="Nova Conta" v-model="request.newAccount" class="weight-1"/>
              </div>

              <div class="horiz gutter-10">
                <input-text label="Nome da entidade" v-model="request.entityName" class="weight-1"/>
                <input-text label="Endereço da entidade" v-model="request.entityAddress" class="weight-1"/>
              </div>

              <div class="horiz gutter-10">
                <input-text type="phone" label="Telefone da entidade" v-model="request.entityPhone" class="weight-1"/>
                <input-text type="email" label="E-Mail da entidade" v-model="request.entityEmail" class="weight-1"/>
              </div>

              <await :name="request.$operation" class="text-center">
                <button class="secondary" @click="request.doInvoke()">
                  Registrar
                </button>
              </await>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import RegisterMasterAccountRequest from '@/model/request/RegisterMasterAccountRequest'

  @Component
  export default class RegisterMasterAccountView extends Vue {
    request = new RegisterMasterAccountRequest()
  }
</script>
