// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Reward {
  
  address admin;
  address staking;
  IERC20 PATO;

  constructor(IERC20 _PATO) {
    admin = msg.sender;
    PATO = _PATO;
    // hola
  }

  function setStakingAddress(address _staking) external{
    require(msg.sender == admin, "You cant set anything!");
    staking = _staking;
    admin = address(0);
  }

  function payTo(address to, uint256 amount) external{
    require(msg.sender == staking, "You cant pay anyone!");
    
    uint256 PATOBalance = PATO.balanceOf(address(this));
    if (amount > PATOBalance) {
        PATO.transfer(to, PATOBalance);
    } else {
        PATO.transfer(to, amount);
    }
  }

  function totalPATOInContract() public view returns(uint256){
    return PATO.balanceOf(address(this));
  }
}


