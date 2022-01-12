// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EnergySistem {
    IERC20 public buyToken;
    address public owner;
    address public feeWallet;
    uint public pricePerDay;

    // Addres del (user => fecha en segudos donde se le termina la energia al user)
    mapping (address=> uint256) public userEnergy;
    //TODO> mapping add=>bool) ownersEnergyFuLL;

    constructor (uint _price, address _feeWallet){
        owner = msg.sender; 
        feeWallet = _feeWallet;
        pricePerDay = _price * 1 ether;
    }
    
    function buyDay(uint _days) public returns(uint){
        uint _price = pricePerDay * _days; // Todo: -Bug si compra dos veces seguidas-
        require(checkUser(msg.sender) == false, "Ya tiene tiempo comprado." );
        require(buyToken.balanceOf(msg.sender) >= _price, "Fondos insuficientes.");        
        buyToken.transferFrom(msg.sender,feeWallet, _price);
        userEnergy[msg.sender] = block.timestamp + _days * 1 days;
        return (userEnergy[msg.sender] - block.timestamp);
    }

    function checkUser(address _user) public view returns(bool){
        if(userEnergy[_user]> block.timestamp){
            return true;
        }else {
            return false;
        }
    }

    function setBuyToken(address _buyToken) public {
        require (msg.sender == owner , "NO eres el owner");
        buyToken = IERC20(_buyToken);
    }

    //price in wai
    function setPricePerDay (uint _pricePerDayInWai) public {
        require (msg.sender == owner , "NO eres el owner");
        pricePerDay = _pricePerDayInWai * 1 ether;
    }
 
        /* TODO:
        * Fction: SetToken, SetPricem, checker (done)-----
        * Fuctions: Para que generar una lista de vips free uso.
        * Function: Regresar tiempo en segundos restantes de energia. 
        * Replantear: Comprar 2 veces seguidas y sumar el tiempo.
        *
        */
}

