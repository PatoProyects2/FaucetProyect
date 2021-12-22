import Chain from "./Chain"
import {
    PatoTokenAddress,
    StakingAddress,
    FaucetAddress,
    PancakePairAddress,
    PancakeSwapAddress
} from './Contracts'

let chains = []

chains.push(
    new Chain(
        "Polygon Mainnet",
        137,
        "MATIC",
        "https://polygon-rpc.com/",
        "https://explorer.matic.network/",
        PatoTokenAddress,
        StakingAddress,
        FaucetAddress,
        PancakePairAddress,
        PancakeSwapAddress

        // "Binance Smart Chain Mainnet",
        // 56,
        // "BNB",
        // "https://bsc-dataseed.binance.org/",
        // "https://bscscan.com/",
        // PatoTokenAddress,
        // StakingAddress,
        // FaucetAddress,
        // PancakePairAddress
    )
)

export default chains;

