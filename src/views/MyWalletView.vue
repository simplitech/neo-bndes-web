<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          {{$t('view.myWallet.title')}}
        </h1>

        <button class="contrast">
          Salvar Carteira
        </button>
      </div>
    </section>

    <section class="mb-20">
      <div class="container">
        <div class="elevated">
          <div class="py-10">
            <div class="container fluid">

              <div class="horiz gutter-10">
                <button class="weight-1 mb-5">
                  {{$t('view.myWallet.createNewAccount')}}
                </button>
                <button class="weight-1 mb-5">
                  {{$t('view.myWallet.import')}}
                </button>
                <button class="weight-1 mb-5">
                  {{$t('view.myWallet.closeWallet')}}
                </button>
              </div>

              <hr>

              <form @submit.prevent="persistAccount" class="horiz gutter-10 mb-20">
                <div class="weight-2">

                  <input-text :label="$t(`classes.Account.columns.accountName`)" v-model="account.accountName"/>

                  <input-text :label="$t(`classes.Account.columns.blockchainAddress`)" disabled v-model="blockchainAddress"/>

                  <div class="elevated">
                    <div class="p-10">
                      <div class="display mini">
                        {{$t(`classes.Account.columns.certificateInfo`)}}
                      </div>

                      <pre v-html="certificateInfo"></pre>
                    </div>
                  </div>

                  <div class="label success input big">
                    <div class="label-prefix">
                      Status Ativação
                    </div>
                    <span>
                    Confirmado
                  </span>
                  </div>

                </div>

                <div class="weight-1">
                  <div class="label input big">
                    <div class="label-prefix">
                      {{$t(`classes.Account.columns.amount`)}}
                    </div>
                    {{amount}} BNDEST
                  </div>

                  <div class="items-right-center">
                    <a class="btn">
                      {{$t('view.myWallet.withdraw')}}
                    </a>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {successAndPush} from '@/simpli'
  import Account from '@/model/Account'

  @Component
  export default class MyWalletView extends Vue {
    account = new Account()

    amount = 1000
    blockchainAddress = 'WtXh3ryloPmU0WhfwWDIHm0mF4oM4EMF'
    certificateInfo = `Tipo: CPF Digital
Nome: DUNHA DA SILVA
Documento: 111.222.333-44
Chave Pública:
-----BEGIN PUBLIC KEY-----
O93AN1Fbdt35y7oKO93AN1Fbdt35y7oKO93AN1Fbdt35y7oKO93AN1Fbdt35y7oK
yHQv9p2LGvRvs8tsyHQv9p2LGvRvs8tsyHQv9p2LGvRvs8tsyHQv9p2LGvRvs8ts
Vse1XTvNQyy6hBdYVse1XTvNQyy6hBdYVse1XTvNQyy6hBdYVse1XTvNQyy6hBdY
ArZSqbKJmjPqxnGDArZSqbKJmjPqxnGDArZSqbKJmjPqxnGDArZSqbKJmjPqxnGD
-----END PUBLIC KEY-----
`

    async persistAccount() {
      await this.account.persist()
      successAndPush('system.success.persist', '/admin/list')
    }
  }
</script>
