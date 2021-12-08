// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//import "../contracts/TransactionFee.sol";

contract PatoVerde is ERC20 {

  
  address public owner;
  uint public maxSupply = 21000000 ether;
  uint public supply = 0;
  

  /**
   * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
   * account that deploys the contract and mint 1million tokens to master chef address
   *
   * See {ERC20-constructor}.
   *///
  constructor(address masterChef) ERC20('Pato Verde Projects', 'PVP') {
    uint initial = 10000000 ether;
    _mint(masterChef, initial);    
    owner = msg.sender;    
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
    require(msg.sender == owner, "Mint: onlyOWner");
    require((supply + amount) <= maxSupply, "Max supply alcanzado");
    supply = supply + amount;
    _mint(to, amount);
  }
  

}