// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/*
*/


contract Random {
    string originSeed = "NoTeQuemesPato!";
    uint256  baseSeed;

    constructor(){
        baseSeed =(uint256(keccak256(abi.encodePacked(originSeed))))/(block.timestamp*100);
    }

    function NewBaseSeed(string memory _randomString)
        public                
        returns(uint256)
    {
    uint256 seed = uint256(keccak256(abi.encodePacked(
        block.timestamp + block.difficulty +
        ((uint256(keccak256(abi.encodePacked(originSeed)))) / (block.timestamp)) +
        block.gaslimit + 
        ((uint256(keccak256(abi.encodePacked(_randomString)))) / (block.timestamp)) +
        block.number
    )));
        baseSeed = seed;
        return seed;
    }
   
    function rand() public view returns(uint256) {
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp + block.difficulty +         
                              ((uint256(keccak256(abi.encodePacked(baseSeed)))) +
                                block.number))));        
        return seed;
    }   

    
    /**
     * @dev Generate random uint in range [a, b]
     * @return uint
     */
    function randrange(uint a, uint b) public view returns(uint) {
        return a + (rand() % b);
    }
    function blockTime()public view returns(uint){
        return block.timestamp;
    }
    function blockNum()public view returns(uint){
        return block.number;
    }
    
}