// const BatchTransfer = artifacts.require('BatchTransfer');


// require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });

// const { singletons } = require('@openzeppelin/test-helpers');

// module.exports = async function (deployer, network, accounts) {

//   await deployer.deploy(BatchTransfer, "0x1fa1c00d9504d735e2ef546d99db010f5c3a3d6b");
// };

const contractName = 'BatchTransfer';

const Contract = artifacts.require(contractName)

module.exports =  function (deployer, networkName, accounts) {
  deployer.then(async () => {
    let contractDeployed = await deployer.deploy(Contract, "0x1fa1c00d9504d735e2ef546d99db010f5c3a3d6b");
    console.log('--- contracts deployed');
  })
}
