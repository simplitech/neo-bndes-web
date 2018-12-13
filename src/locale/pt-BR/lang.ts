/**
 * @file
 * Language: Portuguese Brazil
 */
export default {
  lang: {
    code: 'pt-BR',
    name: 'Português',
    decimal: ',',
    thousands: '.',
  },

  currency: {
    USD: {
      prefix: 'USD$',
      precision: '2',
    },
    BRL: {
      prefix: 'R$',
      precision: '2',
    },
  },

  country: {
    BRA: {
      name: 'Brasil',
      alpha2: 'BR',
      alpha3: 'BRA',
      lang: {
        code: 'pt-BR',
        name: 'Português',
      },
    },

    USA: {
      name: 'Estados Unidos',
      alpha2: 'US',
      alpha3: 'USA',
      lang: {
        code: 'en-US',
        name: 'Inglês',
      },
    },
  },

  system: {
    question: {
      confirmRemove: 'Tem certeza que deseja remover este item?',
    },
    info: {
      welcome: 'Bem-vindo',
    },
    success: {
      resetPassword: 'Um e-mail foi enviado à sua conta',
      recoverPassword: 'Senha alterada com sucesso',
      persist: 'Salvo com Sucesso!',
    },
    error: {
      unexpected: 'Ocorreu um erro inesperado, tente novamente mais tarde',
      invalidEncryptedWif: 'Encrypted Key Inválido',
      unauthorized: 'Acesso Restrito',
      noServer: 'Não foi possível conectar ao servidor',
      validation: 'Erro de validação',
      required: 'Campo \'{0}\' é obrigatório',
      invalidEmail: 'Campo \'{0}\' deve ser um e-mail',
      invalidDate: 'Campo \'{0}\' não possui data válida',
      passwordLength: 'A senha deve ter entre {0} e {1} caracteres',
      samePassword: 'Os campos senha devem ser iguais',
      length: 'Campo \'{0}\' deve ter entre {1} e {2} caracteres',
      minLength: 'Campo \'{0}\' deve conter pelo menos {1} caracteres',
      maxLength: 'Campo \'{0}\' deve ter no máximo {1} caracteres',
      min: 'Campo \'{0}\' deve ser no mínimo {1}',
      max: 'Campo \'{0}\' deve ser no máximo {1}',
      invalidAlpha: 'Campo \'{0}\' deve conter apenas letras',
      invalidAlphanumeric: 'Campo \'{0}\' deve conter apenas letras e números',
      invalidCreditCard: 'Número de cartão de crédito inválido',
      format: 'Campo \'{0}\' está com a formatação errada',
      phoneFormat: 'O número de telefone está com a formatação errada',
      zipcodeFormat: 'O CEP está com a formatação errada',
      rgFormat: 'O RG está com a formatação errada',
      cpfFormat: 'O CPF está com a formatação errada',
      cnpjFormat: 'O CNPJ está com a formatação errada',
    },
  },

  app: {
    title: 'NeoBndes',
    logout: 'Sair',
    menu: 'Menu',
    add: 'Cadastrar',
    register: 'Registrar',
    export: 'Exportar',
    select: 'Selecione',
    remove: 'Remover',
    cancel: 'Cancelar',
    noDataToShow: 'Nenhum dado para apresentar',
    downloadCsv: 'Baixar CSV',
    search: 'Buscar',
    totalLines: '{total} entradas no total',
    version: 'Versão',
    onlyIfWantChangePassword: 'Preencha este campo somente se quiser alterar a senha',
    wait: 'Aguarde...',
  },

  dateFormat: {
    date: 'DD/MM/YYYY',
    datetime: 'DD/MM/YYYY HH:mm',
    time: 'hh:mm',
    datemask: '##/##/####',
    datetimemask: '##/##/#### ##:##',
  },

  format: {
    cpf: '###.###.###-##',
    cnpj: '##.###.###/####-##',
    rg: '##.###.###-#',
    cep: '#####-###',
    phone: '(##) ####-####',
    phoneAlt: '(##) #####-####',
  },

  filter: {
    phone: {
      regex: '(\\d{2})(\\d{4,5})(\\d{4})$',
      format: '($1) $2-$3',
    },
    cep: {
      regex: '(\\d{5})(\\d{3})$',
      format: '$1-$2',
    },
  },

  boolean: {
    true: 'Sim',
    false: 'Não',
  },

  httpResponse: {
    100: 'Continue',
    101: 'Switching Protocol',
    200: 'Ok',
    201: 'Created',
    202: 'Accepted',
    203: 'Non Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Large',
    414: 'Request URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'Http Version Not Supported',
  },

  navbar: {
    brand: 'NEO BNDES',
    registerMasterAccount: 'Registrar Conta Master',
    operations: 'Operações',
    track: 'Rastreio',
    companies: 'Empresas',
    authorities: 'Autoridades',
    myWallet: 'Minha Carteira',
    transfer: 'Transferir',
  },

  view: {
    signIn: {
      title: 'Fazer Login',
      passphrase: 'Passphrase',
      encryptedWIF: 'Encrypted WIF',
      signin: 'Entrar',
      forgotPassword: 'Esqueci senha',
    },

    resetPassword: {
      title: 'Esqueci senha',
      account: 'E-Mail',
      submit: 'Enviar',
      signIn: 'Fazer login',
    },

    recoverPassword: {
      title: 'Recuperar senha',
      newPassword: 'Nova senha',
      confirmPassword: 'Confirmar senha',
      submit: 'Enviar',
    },

    persistAccount: {
      selectDigitalCertificate: 'Selecione seu certificado digital',
      friendlyName: 'Nome amigável',
      password: 'Senha',
      repeatPassword: 'Repetir senha',
      selectTheFile: 'Selecione o arquivo',
      fillThePassword: 'Preencha a senha',
      selectCertificate: 'Selecione o certificado',
      missingCertificateData: 'Conteúdo do certificado não encontrado',
      certificateData: 'Dados do certificado',
      newAccount: 'Nova conta',
      importPrivateKey: 'Importar chave privada',
      newAccountName: 'Nome da nova conta',
      blockchainInfo: 'Informações da blockchain',
      publicKey: 'Chave pública',
      encryptedWif: 'WIF criptografado',
      privateKey: 'Chave privada',
      address: 'Endereço',
      scriptHash: 'ScriptHash',
      passwordDoesntMatch: 'As duas senhas informadas não são identicas',
      requestApproval: 'Solicitar aprovação',
      fillPrivateKey: 'Preencha a chave privada',
    },

    persistTransaction: {
      destinationAddress: 'Endereço da conta de destino',
      transactionValue: 'Valor',
      comments: 'Comentários',
      destinationInfo: 'Informações do destinatário',
      name: 'Nome:',
      type: 'Tipo:',
      document: 'Documento:',
      publicKey: 'Chave pública:',
    },

    signinToWallet: {
      title: 'Minha Conta',
      walletNotFound: 'Carteira não encontrada',
      importWalletFile: 'Importar JSON',
      createWallet: 'Criar carteira',
    },

    myWallet: {
      title: 'Minha Carteira',
      createNewAccount: 'Cadastrar nova conta',
      import: 'Cadastrar nova conta',
      export: 'Exportar JSON',
      password: 'Preencha uma senha',
      withdraw: 'Resgatar',
    },
  },

  persist: {
    number: 'Numérico',
    datetime: 'Data e Hora',
    submit: 'Enviar',
    proceed: 'Prosseguir',
  },

  classes: {
    TransactionType: {
      title: 'Transaction Type',
      columns: {
        idTransactionTypePk: 'Id Transaction Type Pk',
        name: 'Name',
      },
    },
    Admin: {
      title: 'Admin',
      columns: {
        idAdminPk: 'Id Admin Pk',
        email: 'Email',
        password: 'Password',
      },
    },
    TransactionInput: {
      title: 'Transaction Input',
      columns: {
        asset: 'Asset',
        transaction1: 'Transaction 1',
        transaction2: 'Transaction 2',
        idTransactionInputPk: 'Id Transaction Input Pk',
        amount: 'Amount',
        spent: 'Spent',
        to: 'To',
        previousIdTransactionFk: 'Previous Id Transaction Fk',
        idTransactionFk: 'Id Transaction Fk',
        idAssetFk: 'Id Asset Fk',
      },
    },
    Transaction: {
      title: 'Transferir',
      columns: {
        block: 'Block',
        transactionType: 'Transaction Type',
        idTransactionPk: 'Id Transaction Pk',
        hash: 'Hash',
        from: 'From',
        idTypeFk: 'Id Type Fk',
        idBlockFk: 'Id Block Fk',
      },
    },
    Block: {
      title: 'Block',
      columns: {
        idBlockPk: 'Id Block Pk',
        height: 'Height',
        hash: 'Hash',
        creationDate: 'Creation Date',
        sizeInBytes: 'Size In Bytes',
      },
    },
    AuthRequest: {
      title: 'Auth Request',
      columns: {
        passphrase: 'Passphrase',
        encryptedWIF: 'Encrypted WIF',
      },
    },
    LoginSerialized: {
      title: 'Login Serialized',
      columns: {
        email: 'Email',
        password: 'Password',
        hash: 'Hash',
      },
    },
    Asset: {
      title: 'Asset',
      columns: {
        idAssetPk: 'Id Asset Pk',
        name: 'Name',
      },
    },
    Account: {
      title: 'Account',
      columns: {
        password: 'Senha',
        pkcs12Der: 'Pkcs12Der',
        content: 'Conteúdo',
        selectedFriendlyName: 'Nome amigável',
        altNames: 'Nome alternativo',
        accountName: 'Nome da Conta',
        accountPassword: 'Senha',
        repeatAccountPassword: 'Repetir Senha',
        wif: 'WIF',
        neoAccount: 'Conta NEO',
        encryptedWif: 'WIF criptografado',
        blockchainAddress: 'Endereço Blockchain',
        certificateInfo: 'Informações do Certificado',
        amount: 'Saldo',
      },
    },
    RegisterMasterAccountRequest: {
      title: 'Registrar Conta Master',
      columns: {
        newAccount: 'Nova Conta',
        entityName: 'Nome da entidade',
        entityAddress: 'Endereço da entidade',
        entityPhone: 'Telefone da entidade',
        entityEmail: 'E-Mail da entidade',
      },
    },
  },
}
