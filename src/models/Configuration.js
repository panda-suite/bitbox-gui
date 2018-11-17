class Configuration {
  constructor() {
    this.wallet = {
      autogenerateHDMnemonic: false,
      autogenerateHDPath: true,
      displayCashaddr: true,
      //displayTestnet: false,
      usePassword: false,
      entropy: 16,
      network: 'regtest',
      mnemonic: 'fringe demise grab turkey retreat shy genuine alone pass social cable enhance',
      totalAccounts: 10,
      HDPath: {
        masterKey: "m",
        purpose: "44'",
        coinCode: "145'",
        account: "0'",
        change: "0",
        address_index: "0"
      },
      password: '',
      language: 'english',
      mnemonicValidationMsg: '',
      exchangeRate: '',
      exchangeCurrency: 'USD'
    };
  }
}

export default Configuration;
