class Chain {
  name = "-"
  id = "-"
  symbol = "-"
  rpcUrl = "-"
  blockExplorerUrl = "-"
  patoTokenAddress = "-"
  stakingAddress = "-"
  faucetAddress = "-"
  pancakePairAddress = "-"
  pancakeSwapAddress = "-"
  polygonPairAddress = "-"
  polygonSwapAddress = "-"

  constructor(
    name,
    id,
    symbol,
    rpcUrl,
    blockExplorerUrl,
    patoTokenAddress,
    stakingAddress,
    faucetAddress,
    pancakePairAddress,
    pancakeSwapAddress,
    polygonPairAddress,
    polygonSwapAddress,
  ) {
    this.name = name
    this.id = id
    this.symbol = symbol
    this.rpcUrl = rpcUrl
    this.blockExplorerUrl = blockExplorerUrl
    this.patoTokenAddress = patoTokenAddress
    this.stakingAddress = stakingAddress
    this.faucetAddress = faucetAddress
    this.pancakePairAddress = pancakePairAddress
    this.pancakeSwapAddress = pancakeSwapAddress
    this.polygonPairAddress = polygonPairAddress
    this.polygonSwapAddress = polygonSwapAddress
  }
}

export default Chain;
