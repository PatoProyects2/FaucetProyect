const PatoVerde = artifacts.require('PatoVerde');
const Staking = artifacts.require('Staking');
const Reward = artifacts.require('Reward');
const Faucet = artifacts.require("Faucet");
//const RandomToken = artifacts.require('RandomToken');

module.exports = async function (deployer, network, accounts) {
  
  //const viellasPerBlock = web3.utils.toWei('0.1', 'ether');
  const viellasPerBlock = web3.utils.toWei('45000000000000000', 'wei');
  var PATO;
  var stk;
  var rwrd;
  //var rnd;
  var fau;

  if(network === 'development'){
    await deployer.deploy(PatoVerde, accounts[0]);
    PATO = await PatoVerde.deployed();

    await deployer.deploy(Reward, PATO.address);
    rwrd = await Reward.deployed();

    await deployer.deploy(Staking, PATO.address, PATO.address, accounts[0] , viellasPerBlock, 0, rwrd.address);
    await deployer.deploy(Faucet, accounts[0], PATO.address);

  }else{
    //await deployer.deploy(PatoVerde, accounts[0]);
    // = await PatoVerde.deployed();// MODIFICAR ESTO ANTES DE HACER DEPLOY.

    await deployer.deploy(Reward, PATO.address);
    rwrd = await Reward.deployed();

    await deployer.deploy(Staking, PATO.address, PATO.address, accounts[0], viellasPerBlock, 0, rwrd.address);
    await deployer.deploy(Faucet, accounts[0], PATO.address);
  }
/*
  await deployer.deploy(RandomToken, web3.utils.toWei('1000000', 'ether'));

  //rnd = await RandomToken.deployed(); 
*/
  fau = await Faucet.deployed()
  stk = await Staking.deployed();

  await rwrd.setStakingAddress(stk.address);
  await PATO.setStakingMinter(stk.address);
  



  var content = "export const " + network + "PatoAddress = \"" + PATO.address + "\"\n";
  content += "export const " + network + "FaucetAddress = \"" + fau.address + "\"\n";
  content += "export const " + network + "StakingAddress = \"" + stk.address + "\"\n";
  //content += "export const " + network + "RandomTokenAddress = \"" + rnd.address + "\"\n";

  var fs = require('fs');
  fs.writeFile(network + ".js", content, (err)=>{
    if(err){
      console.log(err);
    }
  });


  };