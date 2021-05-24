usePlugin('@nomiclabs/buidler-waffle')
usePlugin('@nomiclabs/buidler-ethers')
usePlugin("@nomiclabs/buidler-web3")
usePlugin('@openzeppelin/buidler-upgrades')

const privatekey = require('./privatekey.js');

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(await account.getAddress())
  }
})

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  defaultNetwork: 'bsc',
  networks: {
    local: {
      url: 'http://localhost:7545',
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/b0b8be8fbe3646bdae0d45d5ac7d8265',
      accounts: [privatekey.privateKey]
    },
    bsctest: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [privatekey.privateKey],
      gas: "auto",
      blockGasLimit: 95000000
    },
    bsc: {
      url: privatekey.bscMainnet,
      accounts: [privatekey.privateKey],
      gas: "auto",
      blockGasLimit: 95000000
    },
  },
  solc: {
    version: '0.5.16',
  },
  paths: {
      tests: './test/unit',
  },
  mocha: {
    timeout: 60000
  }
}
