class Chain {

  name = "-"
  id = "-"
  symbol = "-"
  rpcUrl = "-"
  blockExplorerUrl = "-"
  patoTokenAddress = "-"
  stakingAddress = "-"
  faucetAddress = "-"

  constructor(name, id, symbol, rpcUrl, blockExplorerUrl, patoTokenAddress, stakingAddress, faucetAddress){
    this.name = name
    this.id = id
    this.symbol = symbol
    this.rpcUrl = rpcUrl
    this.blockExplorerUrl = blockExplorerUrl
    this.patoTokenAddress = patoTokenAddress
    this.stakingAddress = stakingAddress
    this.faucetAddress = faucetAddress
  } 
}

export default Chain;
