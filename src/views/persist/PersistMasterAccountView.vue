<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          {{$t('classes.MasterAccount.title')}}
        </h1>
      </div>
    </section>

    <section class="mb-20">
      <div class="container">
        <div class="elevated">
          <div class="py-20">
            <div class="container fluid">

              <account-selector autoAuthenticate/>

              <div class="horiz gutter-10 mt-30">
                <input-text :label="$t('classes.MasterAccount.columns.address')"
                            v-model="request.address" class="weight-1"/>
              </div>

              <div class="horiz gutter-10">
                <input-text :label="$t('classes.MasterAccount.columns.name')"
                            v-model="request.name" class="weight-1"/>
                <input-text :label="$t('classes.MasterAccount.columns.physicalAddress')"
                            v-model="request.physicalAddress" class="weight-1"/>
              </div>

              <div class="horiz gutter-10">
                <input-text type="phone" :label="$t('classes.MasterAccount.columns.phone')"
                            v-model="request.phone" class="weight-1"/>
                <input-text type="email" :label="$t('classes.MasterAccount.columns.email')"
                            v-model="request.email" class="weight-1"/>
              </div>

              <await :name="request.$operation" class="text-center">
                <button class="secondary" @click="submit">
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
  import {successAndPush} from '../../simpli'
  import MasterAccount from '../../model/MasterAccount'
  import AccountSelector from '@/components/AccountSelector.vue'

  @Component({
    components: { AccountSelector },
  })
  export default class PersistMasterAccountView extends Vue {
    request = new MasterAccount()

    async submit() {
      await this.request.persist()
      successAndPush('system.success.persist', '/master-account')
    }
  }
</script>
