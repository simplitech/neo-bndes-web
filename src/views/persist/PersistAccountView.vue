<template>
  <div class="verti">
    <section class="header">
      <h1 class="m-0">
        {{ $t('classes.Account.title') }}
      </h1>
    </section>

    <section class="container fluid">

      <div class="elevated padded items-center-top">

        <form v-if="!friendlyNames" class="verti items-center-top" @submit.prevent="loadFileAndPassword">

          <input
              type="file"
              ref="inputFile"
              class="w-300 mb-15"
              @change="onInputFileChange"
              multiple="multiple"/>
          <input
              type="password"
              v-model="password"
              class="w-300 mb-15"
              :placeholder="$t('view.persistAccount.password')"/>

          <hr>

          <button type="submit" class="primary">{{ $t('persist.proceed') }}</button>

        </form>

        <select v-if="friendlyNames && !selectedFriendlyName" v-model="selectedFriendlyName">
          <option :value="null">{{ $t('view.persistAccount.selectCertification') }}</option>
          <option v-for="opt in friendlyNames" :value="opt">{{ opt }}</option>
        </select>

        <div class="verti">
          <div v-for="an in altNames">{{ an }}</div>
        </div>

      </div>

    </section>
  </div>
</template>

<script lang="ts">
  import forge from 'node-forge'
  import { RSAKey } from 'jsrsasign'
  import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
  import {$, successAndPush, error } from '@/simpli'
  import Account from '@/model/Account'

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  interface MapOfStringAndBooleans {
    [key: string]: boolean
  }

  @Component
  export default class PersistAccountView extends Vue {
    @Prop({type: [String, Number]}) id?: string
    model = new Account()

    password: string | null = null
    pkcs12Der: string | null = null
    content: forge.pkcs12.Pkcs12Pfx | null = null

    friendlyNames: string[] | null = null

    selectedFriendlyName: string | null = null

    altNames: string[] = []

    onInputFileChange(e: HTMLInputEvent) {
      if (!e || !e.target || !e.target.files) return

      const tempReader = new FileReader()

      tempReader.onload = () => {
        this.pkcs12Der = this.arrayBufferToString(tempReader.result as ArrayBuffer)
      }

      tempReader.readAsArrayBuffer(e.target.files[0])
    }

    arrayBufferToString(buffer: ArrayBuffer) {
      let binary = ''
      const bytes = new Uint8Array(buffer)

      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }

      return binary
    }

    loadFileAndPassword() {
      if (!this.pkcs12Der) {
        error('view.persistAccount.selectTheFile')
        return
      }

      if (!this.password) {
        error('view.persistAccount.fillThePassword')
        return
      }

      const pkcs12Asn1 = forge.asn1.fromDer(this.pkcs12Der)
      this.content = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, false, this.password)

      const preFriendlyNames = this.content.safeContents.reduce((arr: string[], sc) => [
        ...arr,
        ...[].concat(...sc.safeBags.map((sb) => sb.attributes.friendlyName)),
      ], [])

      const seen: MapOfStringAndBooleans = {}
      this.friendlyNames = preFriendlyNames.filter((item) => {
        if (seen.hasOwnProperty(item)) {
          return false
        }
        seen[item] = true
        return true
      })

      if (this.friendlyNames.length === 1) {
        this.selectedFriendlyName = this.friendlyNames[0]
      }
    }

    @Watch('selectedFriendlyName')
    loadCert() {
      if (this.selectedFriendlyName && this.content) {
        const keyContainer = this.content.getBags({friendlyName: this.selectedFriendlyName}).friendlyName
        if (!keyContainer) {
          error('view.persistAccount.missingCertificationData')
          return
        }

        keyContainer.forEach((kc) => {
          if (kc.cert) {
            const extension: any = kc.cert.getExtension('subjectAltName')

            if (extension) {
              this.recursivelyPopulateAltNames(extension.altNames)
            }
          }
        })
      }
    }

    recursivelyPopulateAltNames(altNamesPureValues: any[]) {
      altNamesPureValues.forEach((an) => {
        if (an.value instanceof Array) {
          this.recursivelyPopulateAltNames(an.value)
        } else if (an.type !== 6) {
          this.altNames.push(an.value)
        }
      })
    }

    async persist() {
      await this.model.validate()
      await this.model.save()
      successAndPush('system.success.persist', '/admin/list')
    }
  }
</script>
