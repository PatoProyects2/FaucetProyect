// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";  

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract smiti is ERC721, Ownable {

    //using SafeERC20 for IERC20;
    uint256 COUNTER = 1;
    uint256 fee = 1 ether;
    uint256 costMint = 50 ether; 
    address feeWallet;
    IERC20 buyTokenMinter;//Addres of token used to mint nfts.
    

    struct smithy{
        string Name; //delete this var
        uint256 id;
        uint256 dna; //why this var
        uint256 Serie; 
        uint8 level;
        uint8 stars; // This var is for more chance to upgrade your level
        uint256 energy; // Esta var es para mantener la produccion del staking.   
    }
    //Info of token need to update stats.
    struct smithyTokenInfo{
        IERC20 levelUPToken; //Addres to level up smithy
        IERC20 starsUpToken; //Address to stars up smithy
        IERC20 energyRecharge; //Address to energy recharge         
    }

    smithy[] public smithys;
    uint256 public smithyLenght;
    smithyTokenInfo public tokensUpgrade; // Info of token need to update stats.

    constructor(
        string memory _name, 
        string memory _symbol,
        address _feeWallet,
        IERC20 _levelUPToken,
        IERC20 _starsUpToken,
        IERC20 _energyRecharge,
        IERC20 _buyTokenMinter
    )ERC721(_name,_symbol)
    {
        //setUp tokens needs
        feeWallet = _feeWallet;
        tokensUpgrade.levelUPToken = _levelUPToken;
        tokensUpgrade.starsUpToken = _starsUpToken;
        tokensUpgrade.energyRecharge = _energyRecharge;
        buyTokenMinter = _buyTokenMinter;
    }

    event NewSmithy ( address indexed owner, uint256 id, uint256 dna);

    //Helpers
    //FUNCTION TU SETTER TOKENS.
        
    
    function _createRandomNum(uint256 _mod) internal view returns(uint256){
        uint randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    }

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

    function withdraw() external payable onlyOwner(){
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }
    
    //creation
    function _createSmithy(string memory _name, uint256 _serie) internal {
        uint256 randDna =  _createRandomNum(10*16);
        smithy memory newSmithy = smithy (_name, COUNTER, randDna, _serie, 1, 1, 100);
        smithys.push(newSmithy);
        _safeMint(msg.sender, COUNTER);        
        emit NewSmithy(msg.sender, COUNTER, randDna);
        COUNTER++;
    }

    
    function createRandomSmithy (string memory _name) public payable {        
        require(buyTokenMinter.balanceOf(msg.sender) >= costMint, "not founds for this buy" );
        buyTokenMinter.transferFrom(address(msg.sender), address(feeWallet), costMint);
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
    //function setTokenMinter

    //Upgrades 
    //upgrade level
    function upgradeLevel(uint _id) public returns(bool){
        smithy memory _smiti = smithys[_id-1];
        require(_smiti.id == _id, "No son iguales");
        uint cost = costLevelUp(smithys[_id-1].level);

        require(tokensUpgrade.levelUPToken.balanceOf(address(msg.sender)) >= cost, "No tiene fondos suficientes");

        smithys[_id-1].level++; 
            
        //transfer cost to contractFEES wallets       
        return true;        
    }
    //Requisite to upgrade level.
    function costLevelUp(uint256 _level) public pure returns(uint256){
        return 1*_level+_level**6;
    }

}