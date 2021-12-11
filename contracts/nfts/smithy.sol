// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./Random.sol";


//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SMITHY is  ERC721, ERC721Enumerable, Ownable, Random{

    //using SafeERC20 for IERC20;
    uint256 COUNTER = 1;
    uint256 fee = 1 ether;
    uint256 costMint = 50 ether; 
    address feeWallet;
    IERC20 buyTokenMinter;//Address del token que paga el user por hacer mint
    

    struct smithy{
        string name; //delete this var
        uint256 id; //
        uint256 dna; //delete this var
        uint256 serie; 
        uint256 maxEnergy; // Energia maxima del nft, se puede mejorar.
        uint256 actEnergy; // Energia acutal del nft, se puede recargar a maxEnergy.
        uint256 efficiency; // Esta var es para mantener la produccion del staking.
        uint256 level;
        uint256 stars; // This var is for more chance to upgrade your level
        
    }
    //Info of token need to update stats.
    struct smithyTokenInfo{
        IERC20 levelUPToken; //Addres to level up smithy
        IERC20 starsUpToken; //Address to stars up smithy
        IERC20 energyRecharge; //Address to energy recharge   
        // efficincy token      
    }

    smithy[] public smithys;
    uint256 public smithyLenght;
    smithyTokenInfo public tokensUpgrade; // Info of token need to update stats.

    constructor(
        //string memory _name, 
        //string memory _symbol,
        //address _feeWallet,
        //IERC20 _levelUPToken,
        //IERC20 _starsUpToken,
        //IERC20 _energyRecharge,
        //IERC20 _buyTokenMinter
    )ERC721("SMITHY","SMTY")
    {
        //setUp tokens needs
        //feeWallet = _feeWallet;
        //tokensUpgrade.levelUPToken = _levelUPToken;
        //tokensUpgrade.starsUpToken = _starsUpToken;
        //tokensUpgrade.energyRecharge = _energyRecharge;
        //buyTokenMinter = _buyTokenMinter;
        //eficiency token
    }

    event NewSmithy ( address indexed owner, uint256 id, uint256 dna);
    event levelUp (uint256 id, uint lvl);

    //Helpers
    //FUNCTION TU SETTER TOKENS.
        
    
    function _createRandomNum(uint256 _mod) internal view returns(uint256){
        uint randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    }

    //regresa el numero de serie 0-5 (no escalable :/).
    function _getSerie() internal view returns(uint256){
        uint256 s;
        if(COUNTER < 100) {
            s = 0;
        }
        if((COUNTER > 99) && (COUNTER < 1000)) {
            s = 1;
        }
        if((COUNTER > 999) && (COUNTER < 10000)) {
            s = 2;
        }
        if((COUNTER > 9999) && (COUNTER < 20000)) {
            s = 3;
        }
        if((COUNTER > 19999) && (COUNTER < 50000)) {
            s = 4;
        }
        if(COUNTER > 49999) {
            s = 5;
        }

        return s;
    }

    function updateFee(uint256 _fee) external onlyOwner() {
        fee = _fee;
    }
    
    //creation
    function _createSmithy(string memory _name, uint256 _serie) internal {
        uint256 randDna =  _createRandomNum(10*16);
        smithy memory newSmithy = smithy (_name, COUNTER, randDna, _serie, 100, 100, 10, 1, 1);
        smithys.push(newSmithy);
        _safeMint(msg.sender, COUNTER);        //erc721 standar func
        emit NewSmithy(msg.sender, COUNTER, randDna);
        COUNTER++;
    }
    
    function createRandomSmithy (string memory _name) public payable {        
        //require(buyTokenMinter.balanceOf(msg.sender) >= costMint, "not founds for this buy" );
        //buyTokenMinter.transferFrom(address(msg.sender), address(feeWallet), costMint);
        uint256 serie = _getSerie();
        _createSmithy(_name, serie);
    }

    //getter and Setters
    function getSmithy() public  view returns(smithy[] memory){
        return smithys;
    }
    //fee to go tokens of CreateRandomSmithy function
    function setFeeWallet(address _newFeeWallet)public onlyOwner{
        feeWallet = _newFeeWallet;
    }
    function setCostMintNFT(uint _newCostMint) public onlyOwner {
        costMint = _newCostMint;        
    }    
    function setTokenMinter(IERC20 _buyTokenMinter)public onlyOwner{
        buyTokenMinter = _buyTokenMinter;
    }

    //--------------------FUNCTIONS TO UPDATE SMITHY STATS.---------------------------
    //---- smithys.level  functions

    //upgrade level
    function upgradeLevel(address _user,uint _id) public returns(bool){
        smithy memory _smiti = smithys[_id-1];
        require(_smiti.id == _id, "errore al encontrar el nft ingresado por parametro");
        require(_user == ownerOf(_id), "Quien llama no tiene este nft" );
        uint cost = costLevelUp(smithys[_id-1].level);
        require(tokensUpgrade.levelUPToken.balanceOf(_user) >= cost, "No tiene fondos suficientes");
        //agregar prov de fallo.
        uint probUpgrade = (_smiti.level*5)-(_smiti.level*5)*((_smiti.stars*20)/100);
        if(probUpgrade > randrange(1,100)){// cuidado, siempre false, modificar 10 por random (0-100)
            tokensUpgrade.levelUPToken.transferFrom(_user, address(feeWallet), cost);
            smithys[_id-1].level++;
            smithys[_id-1].actEnergy = smithys[_id-1].maxEnergy;
            smithys[_id-1].stars = 0;
            smithys[_id-1].efficiency = getEfficiencyPerLvl(smithys[_id-1].level);            
            emit levelUp(_id,smithys[_id-1].level);
        return true;        
        }
        return false;    
    }
    //Tokens que se requieren para subir 1 nivel
    function costLevelUp(uint256 _level) public pure returns(uint256){
        return 1*_level+_level**6;
    }


    //---- smithy.energy functions ----

    //Recharge energy
    function rechargeEnergy(address _user,uint _id) public returns(bool){
        smithy memory _smiti = smithys[_id-1];
        require(_smiti.id == _id, "errore al encontrar el nft ingresado por parametro");
        require(_user == ownerOf(_id), "Quien llama no tiene este nft" );
        uint difOfEnergy =  _smiti.maxEnergy- _smiti.actEnergy;
        uint cost= costOfRechargeEnergy(_smiti.level, difOfEnergy);
        require(tokensUpgrade.energyRecharge.balanceOf(_user) >= cost, "no tiene fondos suficientes");
        tokensUpgrade.energyRecharge.transferFrom(_user, address(feeWallet), cost); //$gems
        smithys[_id-1].actEnergy = smithys[_id-1].maxEnergy; 
        return true;
    }
    //Aumenta la estadistica de energia maxima
    function upgradeEnergy(address _user,uint _id)public {
        smithy memory _smiti = smithys[_id-1];
        require(_smiti.id == _id, "errore al encontrar el nft ingresado por parametro");
        require(_user == ownerOf(_id), "Quien llama no tiene este nft" );
        uint cost = costOfUpgradeEnergy();
        tokensUpgrade.levelUPToken.transferFrom(_user, address(feeWallet), cost);// $wood o $gold
        smithys[_id-1].maxEnergy +=10;

        //emit 
    }
    //Reducir Energia, usada por el stake.
    //-----------------------------------Modificar onlyOwner a onlyStake.
    function redEnergy(uint _id, uint _value) external onlyOwner{
        require(smithys[_id-1].actEnergy - _value >= 0, "error en disminuir energia");
        smithys[_id-1].actEnergy = smithys[_id-1].actEnergy - _value;
    }
    
    //Cantidad de tokens que se requiere para RECARGAR energia
    function costOfRechargeEnergy(uint _level, uint _DifEnergy) public pure returns(uint256){
        return _DifEnergy+_level; //editar cuando se tengan numeros de produccion / dia.
    }
    //Cantidad de tokens que requiere MEJORAR la energia.
    function costOfUpgradeEnergy() public pure returns(uint256) {
        return 6;//editar cuando se tengan numeros de produccion / dia.
    }
    

    //---- smithy.stars functions ----
    /** 
     * Strellas: Variable de 0 - 5, se usa para medir la probabilidad de fallo al mejorar o reparar
     * (5 estrellas = 0% de fallo).  Si se mejora herrería, la variable regresa a 0. se usa $Gems para mejorar
     */
    function upgradeStars(address _user,uint _id)public {
        smithy memory _smiti = smithys[_id-1];
        require(_smiti.id == _id, "errore al encontrar el nft ingresado por parametro");
        require(_user == ownerOf(_id), "Quien llama no tiene este nft" );
        require(smithys[_id-1].stars <= 5, "Ya tienes maximo de stars");
        uint cost =costOfUpgradeStars(smithys[_id-1].level, smithys[_id-1].stars);
        tokensUpgrade.starsUpToken.transferFrom(_user, address(feeWallet), cost);
        smithys[_id-1].stars++;
    }
    //costo para mejorar las stars
    function costOfUpgradeStars(uint _level, uint _stars) public pure returns(uint){
        return (_level+_stars)*2; //editar cuando se tenga economics
    }

    // --------- smithy.eficciency ----
    /**
     * Afecta a la durabilidad de las hachas, desbloquea reparaciones,
     * disminulle en cada interaccion. 
    */
    /*
    function rechargeEfficiency(address _user, uint _id) public returns(uint){
        smithy memory _smiti = smithys[_id-1];
        require(_smiti.id == _id, "errore al encontrar el nft ingresado por parametro");
        require(_user == ownerOf(_id), "Quien llama no tiene este nft" );
        
        uint cost= costOfRechargeEnergy(_smiti.level, difOfEnergy);
        require(tokensUpgrade.energyRecharge.balanceOf(_user) >= cost, "no tiene fondos suficientes");
        tokensUpgrade.energyRecharge.transferFrom(_user, address(feeWallet), cost); //$gems
    }
    */
    //retorna el valor que debe tener maximo de eficiencia.
    function getEfficiencyPerLvl(uint _level) internal pure returns(uint) {
        return _level*10;
    }    

    // funciones para evitar conflictos erc721 standar con erc721enumerable standar.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
