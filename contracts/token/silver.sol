// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//import "../contracts/TransactionFee.sol";

contract Silver is ERC20 {

  
  address public owner;
  address public minter;
  //uint public maxSupply = 21000000 ether;
  uint public supply = 0;
  

  /**
   * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
   * account that deploys the contract and mint 1million tokens to master chef address
   *
   * See {ERC20-constructor}.
   *///
  constructor(address masterChef) ERC20('Silver', 'PVP') {
      owner = masterChef;
      minter = masterChef;
  }

  /**
   * @dev Creates `amount` new tokens for `to`.
   *
   * See {ERC20-_mint}.
   *
   * Requirements:
   *
   * - the caller must have the `MINTER_ROLE`.
   */
  function mint(address to, uint256 amount) public virtual {    
    require(msg.sender == minter, "Mint: onlyOWner");
    //require((supply + amount) <= maxSupply, "Max supply alcanzado");
    supply = supply + amount;
    _mint(to, amount);
  }

  function setMinter(address _newMinter) public {
    require(msg.sender == owner, "No tienes permisos para cambiar al minter");
    minter = _newMinter;
  }
  

}