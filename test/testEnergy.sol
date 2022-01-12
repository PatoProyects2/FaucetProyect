// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/EnergySistem.sol";

contract TestEnergy {
  // The address of the adoption contract to be tested
  EnergySistem energy = EnergySistem(DeployedAddresses.EnergySistem());

  // The id of the pet that will be used for testing
  bool expectedUserBool = true;

  function testCheckUser() public {
    bool expectedBOOL = energy.checkUser(address(this));
    //energy.buyToken()
    Assert.equal(expectedBOOL,expectedUserBool, "energy.feeWallet" );
  }

}