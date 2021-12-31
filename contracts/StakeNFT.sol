// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//import "@OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";    

import "./nfts/Herreria.sol"; // minter token of rewards
import "./token/Silver.sol";


contract Staking is Ownable {
    struct user {
        uint[] nftIdStake;
        //uint256 power; //Suma total de las recompenzas que generan sus nfts por bloque.
        uint256 rewardDebt; //recompenzas ya pagadas.
        uint256 lastRewardBlock; //Recompenzas del ultimo pago al usuario
    }


    mapping (address => user) public listOfUsers;
    mapping (uint256 => uint256) public blockidDeposit; // block number in deposit (id => block.number)
    mapping (uint256 => uint256) public blocEndRw; //vincular id => energia.
    mapping (uint256 => uint256) public power; //vincular id => power 
    //PatoVerde public PATO; //token de recompenza.
    Herreria public smiti;
    Silver public silver;

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
        Silver _silver,
        Herreria _smity,
        address _devaddr,
        address _devSetter
        ) {
        silver = _silver;
        smiti = _smity;
        devaddr = _devaddr;
        devSetter = _devSetter;        
        startBlock = block.number;
           
    }   

    //-----FUNCIONES BRRRRRRRRRRRRRRRRRRRRR-------
    
    // PENDING PATOS  

    function claim(address _user) public{
        //listOfUsers(_user);
        require(listOfUsers[_user].nftIdStake.length > 0,"No tiene nfts en stake");       
        uint256 bloksOfReward = bloksNoPagos(listOfUsers[_user].lastRewardBlock);
        uint256 pending = pendingPay(listOfUsers[_user].nftIdStake, bloksOfReward, listOfUsers[_user].lastRewardBlock); // toquens a pagar. 
        require(pending > 0, "No pending to brrr");
        //payTo(_user, pending); FLATA IMPLEMENTAR
        listOfUsers[_user].lastRewardBlock = block.number;
        listOfUsers[_user].rewardDebt +=pending;
    }

    //------------FUNCIONES DE DEPOSITO ---------
    function deposit(address _user, uint _id) public {
        //requiere que el user tenga el nft. xD

        if(listOfUsers[_user].nftIdStake.length > 0){
            uint256 bloksOfReward = bloksNoPagos(listOfUsers[_user].lastRewardBlock);
            uint256 pending = pendingPay(listOfUsers[_user].nftIdStake, bloksOfReward, listOfUsers[_user].lastRewardBlock);
            if(pending > 0){
                //pagar lo adeudado
                //payTo(_user, pending); FLATA IMPLEMENTAR
                listOfUsers[_user].rewardDebt +=pending;
            }
        }
        smiti.safeTransferFrom(_user,address(this),_id);
        // USER PERFIL
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
        // End user perfil
        blockidDeposit[_id] = block.number; // block donde el nft empiza a consumir energia
        blocEndRw[_id] = block.number + smiti.getActEnergyByID(_id);/* smiti.getEnergy(_id) */
        
        power[_id] = 0 /* smiti.getPower(_id) */;       
        
        //emit
    }
    
    function Withdraw(address _user, uint _id) public {
        require(listOfUsers[_user].nftIdStake.length > 0, "no tiene nfts en stake");
        // pagamos lo acumulado:
         uint256 bloksOfReward = bloksNoPagos(listOfUsers[_user].lastRewardBlock);
            uint256 pending = pendingPay(listOfUsers[_user].nftIdStake, bloksOfReward, listOfUsers[_user].lastRewardBlock);
            if(pending > 0){
                //pagar lo adeudado
                //payTo(_user, pending); FLATA IMPLEMENTAR
                listOfUsers[_user].rewardDebt +=pending;
            }
        // restamos energia al nft:
        smiti.redEnergy(_id, calcEnergytored(_id));
        // regresamos el nft
        smiti.safeTransferFrom(address(this),_user,_id);
        // actualizamos datos del usuario
        uint[] memory _nftIdStake = listOfUsers[_user].nftIdStake;
        if(_nftIdStake.length == 1 ){ //modificar, copy past de deposit
            listOfUsers[_user].nftIdStake[0]=0;
        }else{
            for(uint256 i = 0; i <= _nftIdStake.length; i++){
                if(listOfUsers[_user].nftIdStake[i] == _id){
                    listOfUsers[_user].nftIdStake[i] = 0;
                }
                            }
        }
        listOfUsers[_user].lastRewardBlock = block.number;
        // Variables mappings:        
        //emit withdraw

    }

    //retorna el vector de los ids que tiene EN stake el msg.sender
    function userIdStake() external view returns (uint256[] memory) {
        return listOfUsers[msg.sender].nftIdStake;
    }
    //retorna las recompenzas por bloque que genera el usuario
    function rewardsPerBLOCK() public view returns (uint){         
        return  0; 
    }
    //todo implementar  payTo
    function payTo(address _to, uint256 _amount) internal{
        silver.mint(_to, _amount);
    }

    //cambiar devAddress
    function dev(address _devaddr) public {
        require(msg.sender == devSetter, "devSetter: wut?");
        devaddr = _devaddr;
    }

    //CALCULOS DE segundos a BLOQUES 
    function segToBlocks(uint256 _segs) internal view returns(uint256){
        return ((_segs*10) / AvrgBlock)/10;
    }//se debe setear en el deposit

    /*todo setter function to AvrgBlock*/
    function setAvrgBlock(uint _segs) public onlyOwner{
        AvrgBlock = _segs *10;
    }

    function bloksNoPagos(uint256 _lastBlock) internal view returns(uint256){
        return block.number - _lastBlock;
    }

    //Calcula la energia que debe restarce al _ID, 0 = a todo la energia actual
    function calcEnergytored(uint256 _id) internal  returns(uint256){
        if (blocEndRw[_id] > block.number){
            return block.number - blockidDeposit[_id];
        } else {
            return 0;
        }
    }   

    /* Debe ingresar: 
     * El id nft
     * La cantidad de bloques sin pagar(blocksNoPagos),
     * El ultimo claim del user. RETORNA los tokens que se deben pagar por ese nft. */
    function rewardPerNFT(uint _id, uint _blocksToReward,uint _lastClaim) internal view returns(uint256){
        uint blockEndReward = blocEndRw[_id];
        uint blockPower = power[_id];
        if (blockEndReward >= block.number){
            return _blocksToReward * blockPower;
        }else if(blockEndReward > _lastClaim){
            return (blockEndReward - _lastClaim) * blockPower;
        }else {
            return 0;
        }
    }

    //regresa los toquens TOTALES que se le deben pagar al user
    function pendingPay(uint[] memory _nfts, uint _blocksToReward,uint _lastClaim) internal view returns(uint256){
        uint total = 0;        
        for (uint256 index = 0; index < _nfts.length; index++) {
            if(_nfts[index] != 0){
                total += rewardPerNFT(_nfts[index],_blocksToReward,_lastClaim);                
            }
        }
        return total;
    } 

}
