// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import './library/SafeMath.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./token/PatoVerde.sol";

interface IReward {
    function payTo(address _to, uint256 _amount) external;
    function totalPATOInContract() view external returns(uint256);
}


contract Staking is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount;     // How many tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.Lo que ya se le entrego.
        //uint256 userPerBLock; //Tokens que recibe el user por bloque.

        //
        // We do some fancy math here. Basically, any point in time, the amount of CAKEs
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accPATOPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accPATOPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 stakedToken;       // Address of staked token contract.
        uint256 allocPoint;       // How many allocation points assigned to this pool. TUPATO to distribute per block.
        uint256 lastRewardBlock;  // Last block number that TUPATO distribution occurs.
        uint256 accPATOPerShare;   // Accumulated TUPATO per share, times 1e12. See below.
        uint256 totalTokensInPool;
    }

    // The TUpato TOKEN!
    PatoVerde public PATO;

    IReward public rewardContract;
    // Dev address.
    address public devaddr;
    
    address public devSetter;
    // TUPATO tokens created per block.
    uint256 public PATOPerBlock;

    uint256 public initialPATOPerBlock;
    // Bonus muliplier for early tvt makers.
    uint256 public BONUS_MULTIPLIER = 1;

    // Info of each pool.
    PoolInfo[] public poolInfo;
    // Info of each user that stakes tokens.
    mapping (uint256 => mapping (address => UserInfo)) public userInfo;
    //Contador de usuarios.
    uint public cantUsers = 0;
    //Fee in witdraaaws!
    uint public fee = 200; 
    // Total allocation points. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when TUpato mining starts.
    uint256 public startBlock;

    //Variable para el timelock. Permite activar desactivar harvest and reinvet brrr.
    bool public rewardsActive = false;
    //hola
    

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);

    constructor(
        PatoVerde _PATO,
        address _devaddr,
        address _devSetter,
        uint256 _PATOPerBlock,
        uint256 _startBlock,
        IReward _rewardContract
    ) {
        PATO = _PATO;
        devaddr = _devaddr;
        devSetter = _devSetter;
        PATOPerBlock = _PATOPerBlock;
        startBlock = _startBlock;
        rewardContract = _rewardContract;

        // staking pool
        poolInfo.push(PoolInfo({
            stakedToken: _PATO,
            allocPoint: 1000, // TOkens en stake dentro de la pool
            lastRewardBlock: startBlock,
            accPATOPerShare: 0,
            totalTokensInPool: 0
        }));
        totalAllocPoint = 1000;
        initialPATOPerBlock = PATOPerBlock;

    }

    //Pato Fuctions
    //------------------- GETTERS/ VIEWS----------------------------
    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        return _to.sub(_from).mul(BONUS_MULTIPLIER);
    }

    // View function to see pending TUPATO on frontend.
    function pendingPATO(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accPATOPerShare = pool.accPATOPerShare;
        uint256 stakedSupply = pool.stakedToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && stakedSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 PATOReward = multiplier.mul(PATOPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
            accPATOPerShare = accPATOPerShare.add(PATOReward.mul(1e12).div(stakedSupply));
        }
        return user.amount.mul(accPATOPerShare).div(1e12).sub(user.rewardDebt);
    }   

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    //Cant of user in all stakes.
    function cantOfusers() public view returns(uint){
        return cantUsers;
    }
    //Tokens en la pool.
    function tokenInPool(uint _pid) public view returns (uint){
        return poolInfo[_pid].totalTokensInPool;
    }
    //Amount of tokens in pool for each user
    function userAmountInPool(uint256 _pid, address _address) public view returns (uint){      
        
        return  userInfo[_pid][_address].amount;
    }
    //Reward per day of msg.sender
    function rewardsPerDay(uint256 _pid, address _address) public view returns (uint){      
        
        return  userInfo[_pid][_address].amount.mul(28800).div(poolInfo[_pid].totalTokensInPool).mul(PATOPerBlock); 
    }
    //-------------------------------------------------------------------------------

    function updateMultiplier(uint256 multiplierNumber) public onlyOwner {
        BONUS_MULTIPLIER = multiplierNumber;
    }    

    // Add a new staking token to the pool. Can only be called by the owner.
    // XXX DO NOT add the same staking token more than once. Rewards will be messed up if you do.
    function addPool(uint256 _allocPoint, IERC20 _stakedToken, bool _withUpdate) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(PoolInfo({
            stakedToken: _stakedToken,
            allocPoint: _allocPoint,
            lastRewardBlock: lastRewardBlock,
            accPATOPerShare: 0,
            totalTokensInPool: 0
        }));
        updateStakingPool();
    }

    // Update the given pool's TUpato allocation point. Can only be called by the owner.
    function set(uint256 _pid, uint256 _allocPoint, bool _withUpdate) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 prevAllocPoint = poolInfo[_pid].allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
        if (prevAllocPoint != _allocPoint) {
            totalAllocPoint = totalAllocPoint.sub(prevAllocPoint).add(_allocPoint);
            updateStakingPool();
        }
    }

    function updateStakingPool() internal {
        uint256 length = poolInfo.length;
        uint256 points = 0;
        for (uint256 pid = 1; pid < length; ++pid) {
            points = points.add(poolInfo[pid].allocPoint);
        }
        if (points != 0) {
            points = points.div(3);
            totalAllocPoint = totalAllocPoint.sub(poolInfo[0].allocPoint).add(points);
            poolInfo[0].allocPoint = points;
        }
    }

    

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }


    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 stakedSupply = pool.stakedToken.balanceOf(address(this));
        if (stakedSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 PATOReward = multiplier.mul(PATOPerBlock).mul(pool.allocPoint).div(totalAllocPoint);

        if(PATO.totalSupply() < 1000000 ether - PATOReward.mul(11).div(10)){
            PATO.mint(devaddr, PATOReward.div(10));
            PATO.mint(address(rewardContract), PATOReward);
        }

        pool.accPATOPerShare = pool.accPATOPerShare.add(PATOReward.mul(1e12).div(stakedSupply));
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to MasterChef for pato allocation.    
    function deposit(uint256 _pid, uint256 _amount) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if(rewardsActive){
            if (user.amount > 0) {
                uint256 pending = user.amount.mul(pool.accPATOPerShare).div(1e12).sub(user.rewardDebt);
                if(pending > 0) {
                    rewardContract.payTo(msg.sender, pending);
                }
            }
        }
        if (user.amount == 0){
            cantUsers = cantUsers.add(1);
        }
        
        if (_amount > 0) {
            pool.stakedToken.safeTransferFrom(address(msg.sender), address(this), _amount);            
            pool.totalTokensInPool = pool.totalTokensInPool.add(_amount);
            
            user.amount = user.amount.add(_amount);
        } 
            
        user.rewardDebt = user.amount.mul(pool.accPATOPerShare).div(1e12);     

        //multiplierAutomatic();
        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256 _amount) public {
        require(rewardsActive == true, "Las recompenza aun no estan preparadas");
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];        
        require(user.amount >= _amount, "withdraw exceeds user balance");        

        updatePool(_pid);
        uint256 pending = user.amount.mul(pool.accPATOPerShare).div(1e12).sub(user.rewardDebt);
        if(rewardsActive){
            if(pending > 0) {
                rewardContract.payTo(msg.sender, pending);
            }
        }
        if(_amount > 0) {

            uint256 depositFee = _amount.mul(fee).div(10000);
            uint256 amountFee =  _amount.sub(depositFee);

            pool.stakedToken.safeTransfer(devaddr, depositFee);
            user.amount = user.amount.sub(_amount);          
            pool.stakedToken.safeTransfer(address(msg.sender), amountFee);
            
            pool.totalTokensInPool = pool.totalTokensInPool.sub(_amount);
        }
       
        user.rewardDebt = user.amount.mul(pool.accPATOPerShare).div(1e12);

        if(user.amount == 0){
            cantUsers =cantUsers.sub(1);
        }        
        emit Withdraw(msg.sender, _pid, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        pool.stakedToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, _pid, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
        if(user.amount == 0){
            cantUsers =cantUsers.sub(1);
        }  

    }

    // Update dev address by the previous dev.
    function dev(address _devaddr) public {
        require(msg.sender == devSetter, "devSetter: wut?");
        devaddr = _devaddr;
    }

    // brrr en tu cartera
    function brrr(uint256 _pid) public{
        require(rewardsActive == true, "Las recompenza aun no estan preparadas");
        updatePool(_pid);
        
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        uint256 accPATOPerShare = pool.accPATOPerShare;
        uint256 stakedSupply = pool.stakedToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && stakedSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 PATOReward = multiplier.mul(PATOPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
            accPATOPerShare = accPATOPerShare.add(PATOReward.mul(1e12).div(stakedSupply));
        }

        uint256 pending = user.amount.mul(accPATOPerShare).div(1e12).sub(user.rewardDebt);
        //PATOCODE
        //uint256 userPerBLock = user.amount.mul(PATOPerBlock).div(pool.totalTokensInPool).mul(28800);
        require(pending > 0, "No pending to brrr");
        rewardContract.payTo(msg.sender, pending);
        user.rewardDebt = user.amount.mul(accPATOPerShare).div(1e12);
    }

    // Reinvest PATO
    function reinvest() public{
        require(rewardsActive == true, "Las recompenza aun no estan preparadas");
        PoolInfo storage pool = poolInfo[0];
        UserInfo storage user = userInfo[0][msg.sender];
        updatePool(0);
        
        uint256 pending = user.amount.mul(pool.accPATOPerShare).div(1e12).sub(user.rewardDebt);
        require(pending > 0, "No pending to reinvest");

        rewardContract.payTo(address(this), pending);
        user.amount = user.amount.add(pending - pending.mul(7).div(1000));
        pool.totalTokensInPool = pool.totalTokensInPool.add(pending - pending.mul(7).div(1000));
        
        user.rewardDebt = user.amount.mul(pool.accPATOPerShare).div(1e12);
        emit Deposit(msg.sender, 0, pending);
    }

    //returns the pid of the pool
    function findPidOf(IERC20 token) public view returns (uint256 _pid){
        
        uint length = poolInfo.length;
        for(uint256 i = 0; i < length; i++){
            if(token == poolInfo[i].stakedToken){
                return i;
            }
        }
    }
    

    //Setters-----------------------------------------------
    //Configurar fee Default 200(2%)
    function setFee(uint _fee) public onlyOwner {
        fee = _fee;       
    }

    //Activar retiros de reward.sol
    function setActive(bool _rewardsActive) public onlyOwner {
        rewardsActive = _rewardsActive;
    }
    
}