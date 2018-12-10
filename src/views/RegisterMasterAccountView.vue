<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          {{$t('classes.RegisterMasterAccountRequest.title')}}
        </h1>
      </div>
    </section>

    <section class="mb-20">
      <div class="container">
        <div class="elevated">
          <div class="py-20">
            <div class="container fluid">

              <div class="horiz gutter-10">
                <input-text :label="$t('classes.RegisterMasterAccountRequest.columns.newAccount')" v-model="request.newAccount" class="weight-1"/>
              </div>

              <div class="horiz gutter-10">
                <input-text :label="$t('classes.RegisterMasterAccountRequest.columns.entityName')" v-model="request.entityName" class="weight-1"/>
                <input-text :label="$t('classes.RegisterMasterAccountRequest.columns.entityAddress')" v-model="request.entityAddress" class="weight-1"/>
              </div>

              <div class="horiz gutter-10">
                <input-text type="phone" :label="$t('classes.RegisterMasterAccountRequest.columns.entityPhone')" v-model="request.entityPhone" class="weight-1"/>
                <input-text type="email" :label="$t('classes.RegisterMasterAccountRequest.columns.entityEmail')" v-model="request.entityEmail" class="weight-1"/>
              </div>

              <await :name="request.$operation" class="text-center">
                <button class="secondary" @click="request.doInvoke()">
                  {{$t('app.register')}}
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
