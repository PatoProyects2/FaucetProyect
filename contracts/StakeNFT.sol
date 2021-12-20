// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//import "@OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./nfts/smithy.sol"; // minter token of rewards
import "./token/silver.sol";


contract Staking is Ownable {
    struct user {
        uint[] nftIdStake;
        uint256 power; //Suma total de las recompenzas que generan sus nfts por bloque.
        uint256 rewardDebt; //recompenzas ya pagadas.
        uint256 lastRewardBlock; //Recompenzas del ultimo pago al usuario
    }


    mapping (address => user) public listOfUsers;
    mapping (uint256 => uint256) public expireOfStaking; //vincular con energia y listofuser[user].id

    //PatoVerde public PATO; //token de recompenza.
    IERC721 public smiti;

    address public devaddr;    
    address public devSetter;

    uint256 public cantUsers = 0;
    uint256 public startBlock;
    uint256 public AvrgBlock = 22;
    
    bool public rewardsActive = true;
    
    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    //event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);


     constructor(
        //PatoVerde _PATO, token de recompenza
        IERC721 _smity,
        address _devaddr,
        address _devSetter
    ) {
        //PATO = _PATO;
        smiti = _smity;
        devaddr = _devaddr;
        devSetter = _devSetter;        
        startBlock = block.number;
           
    }

    /*
     -   function para calcular las rewards totales de un usuario (last reward, actual reward).
     -   function para modificar lo debitado a cada usuario y pagarle lo que falta. (BRRrrr) ClaimRewards
     -

     -   function para depositar (reclama recompenzas no debitadas)
     -   fuction para retirar nft

    */

    //-----FUNCIONES BRRRRRRRRRRRRRRRRRRRRR-------
    
    // PENDING PATOS  

    function claim(address _user) public{
        //listOfUsers(_user);
        //require
        uint256 _last = listOfUsers[_user].lastRewardBlock;
        uint256 bloksOfReward = bloksNoPagos(_last);
        uint256 pending = bloksOfReward * listOfUsers[_user].power; // es lo que se le debe al user. Crear funcion aparte
        require(pending > 0, "No pending to brrr");
        //payTo(_user, pending); FLATA IMPLEMENTAR
        listOfUsers[_user].lastRewardBlock = block.number;
        listOfUsers[_user].rewardDebt +=pending;
    }

    //------------FUNCIONES DE DEPOSITO ---------
    function deposit(address _user, uint _id) public {
        //listOfUsers(_user);
         //CAMBIAR POR PENDING PATO ------
        uint256 bloksOfReward = bloksNoPagos(listOfUsers[_user].lastRewardBlock);
        uint256 pending = bloksOfReward * listOfUsers[_user].power;
        if(pending > 0){
            //pagar lo adeudado
             //payTo(_user, pending); FLATA IMPLEMENTAR
        }
         //CAMBIAR POR PENDING PATO ------
        smiti.safeTransferFrom(_user,address(this),_id);
       //agregar los del usuario, perfil
        uint[] memory _nftIdStake = listOfUsers[_user].nftIdStake;
        if(_nftIdStake.length < 1 ){
            listOfUsers[_user].nftIdStake.push(_id);
        }else{
            for(uint256 i = 0; i <= _nftIdStake.length; i++){
                if(listOfUsers[_user].nftIdStake[i] == 0){
                    listOfUsers[_user].nftIdStake[i] = _id;
                }else{
                    listOfUsers[_user].nftIdStake.push(_id);
                }
            }
        }
        listOfUsers[_user].lastRewardBlock = block.number;
        //cacular new power.
        //emit
    }
    
    function Withdraw(address _user, uint _id) public {
        uint256 _pos;
        uint[] memory _nftIdStake = listOfUsers[_user].nftIdStake;
        for(uint256 i = 0; i <= _nftIdStake.length; i++){
             if(listOfUsers[_user].nftIdStake[i] == _id){                
                _pos = i;
             }
        }
        require (listOfUsers[_user].nftIdStake[_pos] == _id, "No es propietario de ese nft");
        //CAMBIAR POR PENDING PATO ------
        uint256 bloksOfReward = bloksNoPagos(listOfUsers[_user].lastRewardBlock);
        uint256 pending = bloksOfReward * listOfUsers[_user].power;
        if(pending > 0){
            //pagar lo adeudado
             //payTo(_user, pending); FLATA IMPLEMENTAR
        }
        //CAMBIAR POR PENDING PATO ------
        //retirar el nft
        //calcular el new power
        listOfUsers[_user].lastRewardBlock = block.number;
        //emit withdraw

    }

    //retorna el vector de los ids que tiene EN stake el msg.sender
    function userIdStake() external view returns (uint256[] memory) {
        return listOfUsers[msg.sender].nftIdStake;
    }
    //retorna las recompenzas por bloque que genera el usuario
    function rewardsPerBLOCK() public view returns (uint){         
        return  listOfUsers[msg.sender].power; 
    }
    function dev(address _devaddr) public {
        require(msg.sender == devSetter, "devSetter: wut?");
        devaddr = _devaddr;
    }

    //CALCULOS DE BLOQUES
    function segToBlocks(uint256 _segs) internal view returns(uint256){
        return ((_segs*10) / AvrgBlock)/10;
    }
    function bloksNoPagos(uint256 _lastBlock) internal view returns(uint256){
        return block.number - _lastBlock;
    } 
    //Funcion para calcular bloques que se deben pagar, retorna "POWER"

/*


function updateMultiplier(uint256 multiplierNumber) public onlyOwner {
        BONUS_MULTIPLIER = multiplierNumber;
    } 
function emergencyWithdraw(uint256 _pid) public {
        algo que saque todos tus nfts
        }  

    }   

//Activar retiros de reward.sol
    function setActive(bool _rewardsActive) public onlyOwner {
        rewardsActive = _rewardsActive;
    }
    

*/

}
