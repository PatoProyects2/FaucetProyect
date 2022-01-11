const EnergySistem = artifacts.require('EnergySistem');

module.exports = async function (deployer, network, accounts) {
  var Energy;
  var price = web3.utils.toWei('1', 'wei'); // price in wai

  if(network === 'development'){
    await deployer.deploy(EnergySistem, price, accounts[1]);
    Energy = await EnergySistem.deployed();

  }else{
    await deployer.deploy(/*EnergySistem, accounts[0]*/);
    Energy = await EnergySistem.deployed();// MODIFICAR ESTO ANTES DE HACER DEPLOY.

  }

  var content = "export const " + network + "EnergyAddress = \"" + Energy.address + "\"\n";
  
  var fs = require('fs');
  fs.writeFile(network + ".js", content, (err)=>{
    if(err){
      console.log(err);
    }
  });


  };