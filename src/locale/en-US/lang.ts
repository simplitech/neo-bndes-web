/**
 * @file
 * Language: English United States
 */
export default {
  lang: {
    code: 'en-US',
    name: 'English',
    decimal: '.',
    thousands: ',',
  },

  currency: {
    USD: {
      prefix: '$',
      precision: '2',
    },
    BRL: {
      prefix: 'BRL$',
      precision: '2',
    },
  },

  country: {
    BRA: {
      name: 'Brazil',
      alpha2: 'BR',
      alpha3: 'BRA',
      lang: {
        code: 'pt-BR',
        name: 'Portuguese',
      },
    },

    USA: {
      name: 'United States',
      alpha2: 'US',
      alpha3: 'USA',
      lang: {
        code: 'en-US',
        name: 'English',
      },
    },
  },

  system: {
    question: {
      confirmRemove: 'Are you sure you want to remove this item?',
    },
    info: {
      welcome: 'Welcome',
    },
    success: {
      resetPassword: 'An E-Mail has been sent to your account',
      recoverPassword: 'The password has successfully changed',
      persist: 'Persisted Successfully!',
    },
    error: {
      unexpected: 'Unexpected Error. Please try again later',
      invalidEncryptedWif: 'Invalid Encrypted Key',
      unauthorized: 'Restricted Access',
      noServer: 'Could not connect to server',
      validation: 'Validation error',
      required: 'The field \'{0}\' is required',
      invalidEmail: 'The field \'{0}\' must be e-mail',
      invalidDate: 'The field \'{0}\' has not valid date',
      passwordLength: 'The password must have between {0} and {1} characters',
      samePassword: 'The fields password must match',
      length: 'The field \'{0}\' must have between {1} and {2} characters',
      maxLength: 'The field \'{0}\' must not exceed {0} characters',
      minLength: 'The field \'{0}\' must have at least {0} characters',
      min: 'The field \'{0}\' must have a minimum value of {1}',
      max: 'The field \'{0}\' must have a maximum value of {1}',
      invalidAlpha: 'The field \'{0}\' must contain only letters',
      invalidAlphanumeric: 'The field \'{0}\' must contain only letters and numbers',
      invalidCreditCard: 'Invalid card credit number',
      format: 'Wrong format for field \'{0}\'',
      phoneFormat: 'Wrong format for phone number',
      zipcodeFormat: 'Wrong format for zip code',
      rgFormat: 'Wrong format for RG document',
      cpfFormat: 'Wrong format for CPF document',
      cnpjFormat: 'Wrong format for CNPJ document',
    },
  },

  app: {
    title: 'NeoBndes',
    logout: 'Logout',
    menu: 'Menu',
    add: 'Add',
    register: 'Register',
    export: 'Export',
    select: 'Select',
    remove: 'Remove',
    cancel: 'Cancel',
    noDataToShow: 'No data to show',
    downloadCsv: 'Download CSV',
    search: 'Search',
    totalLines: '{total} total lines',
    version: 'Version',
    onlyIfWantChangePassword: 'Fill this field only if you want to change the password',
    wait: 'Wait...',
  },

  dateFormat: {
    date: 'MM/DD/YYYY',
    datetime: 'MM/DD/YYYY hh:mm',
    time: 'hh:mm',
    datemask: '##/##/####',
    datetimemask: '##/##/#### ##:##',
  },

  format: {
    cpf: '###.###.###-##',
    cnpj: '##.###.###/####-##',
    rg: '##.###.###-#',
    cep: '#####',
    phone: '(###) ###-####',
    phoneAlt: '(###) ###-####',
  },

  filter: {
    phone: {
      regex: '(\\d{3})(\\d{3})(\\d{4})$',
      format: '($1) $2-$3',
    },
    cep: {
      regex: '(\\d{5})$',
      format: '$1',
    },
  },

  boolean: {
    true: 'Yes',
    false: 'No',
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

  approvalStatus: {
    '-1': 'Not found',
    '0': 'Waiting approval',
    '1': 'Approved',
  },

  accountType: {
    1: 'E-CPF',
    2: 'E-CNPJ',
  },

  navbar: {
    brand: 'NEO BNDES',
    masterAccounts: 'Master Accounts',
    operations: 'Operations',
    track: 'Track',
    companies: 'Companies',
    authorities: 'Authorities',
    myWallet: 'My Wallet',
    transfer: 'Transfer',
  },

  view: {
    resetPassword: {
      title: 'Forgot Password',
      account: 'E-Mail',
      submit: 'Submit',
      signIn: 'Sign-in',
    },

    recoverPassword: {
      title: 'Recover Password',
      newPassword: 'New password',
      confirmPassword: 'Confirm password',
      submit: 'Submit',
    },

    persistAccount: {
      selectDigitalCertificate: 'Select your digital certificate',
      friendlyName: 'Friendly name',
      password: 'Password',
      repeatPassword: 'Repead Password',
      selectTheFile: 'Select the file',
      fillThePassword: 'Fill the password',
      selectCertificate: 'Select the certificate',
      missingCertificateData: 'Missing certificate data',
      certificateData: 'Certificate data',
      newAccount: 'New account',
      importEncryptedWif: 'Import encrypted private key',
      newAccountName: 'New account name',
      blockchainInfo: 'Blockchain info',
      publicKey: 'Public key',
      encryptedWif: 'Encypted WIF',
      privateKey: 'Private key',
      address: 'Address',
      scriptHash: 'Script hash',
      passwordDoesntMatch: 'The password fields does not match',
      requestApproval: 'Request approval',
      fillPrivateKey: 'Fill private key',
      email: 'E-mail',
      name: 'Name',
      document: 'Document',
    },

    persistTransaction: {
      destinationAddress: 'Destination account address',
      transactionValue: 'Value',
      comments: 'Comments',
      destinationInfo: 'Destination info',
      name: 'Name:',
      type: 'Type:',
      document: 'Document:',
      publicKey: 'Public key:',
    },

    signinToWallet: {
      title: 'My Account',
      walletNotFound: 'Wallet not found',
      importWalletFile: 'Import JSON',
      openWallet: 'Open Wallet',
      createWallet: 'Create Wallet',
    },

    account: {
      title: 'Account',
      chooseAnAccountToBeAbleToApprove: 'Choose an account to be able to approve',
      unspentTransactions: 'Unspent Transactions',
    },

    myWallet: {
      title: 'My Wallet',
      createNewAccount: 'Create new account',
      import: 'Import',
      export: 'Export JSON',
      password: 'Fill a password',
      withdraw: 'Withdraw',
      approve: 'Approve account',
    },

    accountSelector: {
      selectTheAccount: 'Select your account',
      fillThePassword: 'Fill the password',
      authenticate: 'Authenticate',
    },

    mint: {
      title: 'Mint tokens',
    },
  },

  persist: {
    number: 'Number',
    datetime: 'Datetime',
    submit: 'Submit',
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
        block: 'Bloco',
        transaction1: 'Transaction 1',
        transaction2: 'Transaction 2',
        idTransactionInputPk: 'Id Transaction Input Pk',
        amount: 'Amount',
        spent: 'Spent',
        to: 'To',
        previousIdTransactionFk: 'Previous Id Transaction Fk',
        idTransactionFk: 'Id Transaction Fk',
        idAssetFk: 'Id Asset Fk',
        addressOfMasterMint: 'Master mint address',
      },
    },
    Transaction: {
      title: 'Transfer',
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
        password: 'Password',
        pkcs12Der: 'Pkcs12Der',
        content: 'Content',
        selectedFriendlyName: 'Fiendly Name',
        altNames: 'Alternative Name',
        accountName: 'Account Name',
        accountPassword: 'Password',
        repeatAccountPassword: 'Repeat Password',
        wif: 'WIF',
        neoAccount: 'NEO Account',
        encryptedWif: 'Encrypted WIF',
        status: 'Approval Status',
      },
    },
    ListMasterAccount: {
      title: 'List of master accounts',
      columns: {
      },
    },
    MasterAccount: {
      title: 'Register Master Account',
      columns: {
        address: 'Public Address',
        name: 'Entity Name',
        physicalAddress: 'Entity Address',
        phone: 'Entity Phone',
        email: 'Entity E-Mail',
      },
    },
  },
}
