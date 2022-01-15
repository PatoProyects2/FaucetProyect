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
    
    mapping (address => bool) public vipList;
    //TODO> mapping add=>bool) ownersEnergyFuLL;

    constructor (uint _price, address _feeWallet){
        owner = msg.sender; 
        feeWallet = _feeWallet;
        pricePerDay = _price * 1 ether;
        vipList[msg.sender] = true;
    }
    
    function buyDay(uint _days) public {
        uint _price = pricePerDay * _days;
        //require(checkUser(msg.sender) == false, "Ya tiene tiempo comprado." );
        require(buyToken.balanceOf(msg.sender) >= _price, "Fondos insuficientes.");
        require(buyToken.allowance(msg.sender, address(this)) > _price, "Aprovar mas uso de tokens");
        buyToken.transferFrom(msg.sender,feeWallet, _price);        
        userEnergy[msg.sender] = (block.timestamp + howTimeLeft(msg.sender)) + (_days * 1 days);        
    }

    function checkUser(address _user) public view returns(bool){
        if((userEnergy[_user]> block.timestamp) || vipList[_user]){
            return true;
        }else {
            return false;
        } //todo: agregar la comprobacion de la lista de usuarios vips
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

    //Function: Regresar tiempo en segundos restantes de energia.
    function howTimeLeft(address _user) public view returns(uint){
        if(block.timestamp>=userEnergy[_user] ){
            return 0;
        }else {
            return userEnergy[_user] - block.timestamp;
        }
    }

    function addVIP(address _vipAddress) public {
        require (msg.sender == owner , "NO eres el owner");
        vipList[_vipAddress] = true;
    }

    function setWalletFee(address _wallet) public {
        require (msg.sender == owner , "NO eres el owner");
        feeWallet = _wallet;
    }
 
        /* TODO:
        * Fction: SetToken, SetPricem, checker (done)(tested)
        * Fuctions: Para que generar una lista de vips free uso. (done)
        * Function: Regresar tiempo en segundos restantes de energia. (done)
        * Replantear: Comprar 2 veces seguidas y sumar el tiempo.(done)
        * Generar que los de la lista siempre de true. (done)
        * Function : SetWalletFee (done)
        */

    // ---- GETTERS
    function getVipChek(address _user) public view returns(bool){
        return  vipList[_user];
    }
    function timeBLockChain() external view returns(uint){
        return block.timestamp;
    }

}

