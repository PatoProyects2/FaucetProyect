import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  NavLink
} from "react-router-dom";
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'

import PatoVerde from './abis/PatoVerde.json'
import FaucetAbi from './abis/Faucet.json'
import StakingAbi from './abis/Staking.json'

import LoadingPage from './components/LoadingPage'
import LoadingTransaction from './components/LoadingTransaction'
import ConnectWalletButton from './components/ConnectWalletButton'
import AddTokenButton from './components/AddTokenButton'
import chains from './components/AvailableChains'
import WrongNetwork from './components/WrongNetwork'
import NotFound from './components/NotFound'
import Footer from './components/Footer'

import Home from './views/Home'
import Claim from './views/Claim'
import Pool from './views/Pool'
import Soon from './views/Soon'

import Logo from './images/patologo.png'

import './App.css'

function getLibrary(provider) {
  return new Web3(provider)
}

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('ETHEREUM - BROWSER NOT DETECTED! PLEASE INSTALL METAMASK EXTENSION')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    let chainId = await web3.eth.getChainId()
    let chainInUse = null

    for (let chainIndex in chains){
            if(chains[chainIndex].id === chainId){
        chainInUse = chains[chainIndex]
      } 
    }
 
    if(!chainInUse){
      this.setState({ loading: "INVALID_CHAIN" })
      window.alert('INVALID NETWORK, CONNECT TO BSC-MAINNET NETWORK!')
    } else {
      this.setState({ chainInUse })
      this.setState({ account: accounts[0] })
      try { 
        const patoToken = new web3.eth.Contract(PatoVerde.abi, chainInUse.patoTokenAddress)
        this.setState({ patoToken })
        let patoTokenBalance = await patoToken.methods.balanceOf(this.state.account).call()
        this.setState({ patoTokenBalance: patoTokenBalance.toString() })
        let faucetPatoTokenBalance = await patoToken.methods.balanceOf(chainInUse.faucetAddress).call()  
        this.setState({ faucetPatoTokenBalance: faucetPatoTokenBalance.toString() })
        let totalSupply = await patoToken.methods.totalSupply().call()  
        this.setState({ totalSupply: totalSupply.toString() })
        let maxSupply = await patoToken.methods.maxSupply().call()  
        this.setState({ maxSupply: maxSupply.toString() })
        let tokenName = await patoToken.methods.name().call()
        this.setState({ tokenName: tokenName.toString() })
        let tokenSymbol = await patoToken.methods.symbol().call()
        this.setState({ tokenSymbol: tokenSymbol.toString() })

      } catch(e) {
        window.alert('PATO CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const staking = new web3.eth.Contract(StakingAbi.abi, chainInUse.stakingAddress)
        this.setState({ staking })
        // let perBlock = await staking.methods.rewardsPerDay(0, "0xcc73ede51729ed1122e6b9b34180c75b7f58acfb").call()
        // this.setState({ perBlock: perBlock.toString() })
        let rewardsActive = await staking.methods.rewardsActive().call()
        this.setState({ rewardsActive: rewardsActive.toString() })
        let tokensInPool = await staking.methods.tokenInPool(0).call()
        this.setState({ tokensInPool: tokensInPool.toString() })
        let stakingStaked = await this.state.staking.methods.userInfo(0, this.state.account).call()
        let stakingPending = await this.state.staking.methods.pendingPATO(0, this.state.account).call()
        this.setState({ stakingStaked: stakingStaked[0],
                        stakingPending: stakingPending,              
                      })
      } catch(e) {
        window.alert('STAKING CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const faucet = new web3.eth.Contract(FaucetAbi.abi, chainInUse.faucetAddress)
        this.setState({ faucet })
        let claimActive = await faucet.methods.setActiveOn().call()
        this.setState({ claimActive: claimActive.toString() })
        let patoExpiry = await this.state.faucet.methods.getExpiryOf(this.state.account, chainInUse.patoTokenAddress).call()
        this.setState({ patoExpiry: patoExpiry})
      } catch(e) {
        window.alert('FAUCET CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      } 
      this.setState({ loading: 'FALSE' })
    }
  }
  
  addToken = async ()  => {
    try {
      const provider = window.web3.currentProvider
      await provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: this.state.chainInUse.patoTokenAddress, // The address that the token is at.
            symbol: "PVP", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image: "data:image/png;base64,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",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  addNetwork = async ()  => {
    try {
      const provider = window.web3.currentProvider
      await provider.sendAsync({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: "0x38",
            chainName: "BSC - Mainnet",
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            iconUrls: ["https://queesunbitcoin.com/wp-content/uploads/2021/05/curso-sobre-binance-online.png"],
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18,
            },
            blockExplorerUrls: ["https://bscscan.com/"],
        }],
      });
    } catch (error) {
      console.log(error);
    }
  }

  switchNetwork = async ()  => {
    try {
      const provider = window.web3.currentProvider
      await provider.sendAsync({
        method: 'wallet_switchEthereumChain',
        params: [{
            chainId: "0x38",
        }],
      });
    } catch (error) {
      console.log(error);
    }
  }
 
  claimToken = async () => {
    this.setState({ loading: 'TRANSACTION' })
    this.state.faucet.methods
    .claim(this.state.chainInUse.patoTokenAddress)
    .send({from: this.state.account})
    .on('receipt', (hash) => {
      window.location.reload()
    })
    .on('error', function(error) {
      window.location.reload()
    });
  }
  

  approveToken = async () => {
    this.setState({ loading: 'TRANSACTION' })
    this.state.patoToken.methods
    .approve(this.state.chainInUse.stakingAddress, window.web3.utils.toWei(window.web3.utils.toBN(new BigNumber(100000000000000000000000000000000000000000000000000)).toString(), 'Ether'))
    .send({from: this.state.account})
    .on('receipt', (hash) => {
      window.location.reload()
    })
    .on('error', function(error) {
      window.location.reload()
    });
  }

  depositToken = async (value) => {
    this.setState({ loading: 'TRANSACTION' })
    this.state.staking.methods
    .deposit(0, window.web3.utils.toWei(value.toString(), 'Ether'))
    .send({from: this.state.account})
    .on('receipt', (hash) => {
      window.location.reload()
    })
    .on('error', function(error) {
      window.location.reload()
    });
  }

  harvestToken = async () => {
    this.setState({ loading: 'TRANSACTION' })
    this.state.staking.methods
    .brrr(0)
    .send({from: this.state.account})
    .on('receipt', async (hash) =>  {
      window.location.reload()
    })
    .on('error', function(error) {
      window.location.reload()
    });
  }

  withdrawToken = async (value) => {
    this.setState({ loading: 'TRANSACTION' })
    this.state.staking.methods
    .withdraw(0, window.web3.utils.toWei(value.toString(), 'Ether'))
    .send({from: this.state.account})
    .on('receipt', async (hash) =>  {
      window.location.reload()
    })
    .on('error', function(error) {
      window.location.reload()
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      patoToken: {},
      faucet: {},
      staking: {},
      stakingPending: 0,
      stakingStaked: 0,
      value: 0,
      patoExpiry: 0,
      patoTokenBalance: '0',
      faucetPatoTokenBalance: '0',
      perBlock: '0',
      tokensInPool: '0',
      totalSupply: '0',
      maxSupply: '0',
      tokenName: '',
      tokenSymbol: '',
      loading: 'WEB3',
      rewardsActive: undefined,
      chainInUse: undefined,
      claimActive: undefined,

    }
    this.handleChange = this.handleChange.bind(this);
  }

  render() {

    let loading
    if(this.state.loading === 'WEB3') {
      loading = <main>
        <LoadingPage />
      </main>
    } 
    if(this.state.loading === 'TRANSACTION') {
      loading = <main>
        <LoadingTransaction />
      </main>
    }
    if(this.state.loading === 'INVALID_CHAIN') {
      loading = <main>
        <WrongNetwork 
          addNetwork={this.addNetwork}
        />
      </main>
    }
  
    let addToken
      addToken = <div id="addBtn">
        <AddTokenButton 
          addToken={this.addToken}
        />
      </div>

    let soon
    if(this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      soon = <div>
        <Soon
        
        />
      </div>
    }

    let home
    if(this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      home = <div>
        <Home
          patoPerBlock={this.state.perBlock}
          rewardsActive={this.state.rewardsActive}
          tokensInPool={this.state.tokensInPool}
          stakingPending={this.state.stakingPending}
          stakingStaked={this.state.stakingStaked}
          totalSupply={this.state.totalSupply}
          maxSupply={this.state.maxSupply}
          tokenName={this.state.tokenName}
          tokenSymbol={this.state.tokenSymbol}
          patoTokenBalance={this.state.patoTokenBalance}
          faucetPatoTokenBalance={this.state.faucetPatoTokenBalance}
          claimActive={this.state.claimActive}
        />
      </div>
    }

    let claim
    if(this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      claim = <div>
        <Claim
          patoToken={this.state.patoToken}
          faucet={this.state.faucet}
          claimToken={this.claimToken} 
          patoTokenBalance={this.state.patoTokenBalance}
          faucetPatoTokenBalance={this.state.faucetPatoTokenBalance}
          patoExpiry={this.state.patoExpiry} 
          tokenSymbol={this.state.tokenSymbol}
        />
      </div>
    } 
 
    let pool
    if(this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      pool = <div>
        <Pool
          patoToken={this.state.patoToken}
          staking={this.state.staking}
          approveToken={this.approveToken}
          harvestToken={this.harvestToken} 
          handleChange={this.handleChange}
          depositToken={this.depositToken}
          withdrawToken={this.withdrawToken}
          approveValue={this.state.approveValue} 
          value={this.state.value}
          patoTokenBalance={this.state.patoTokenBalance}      
          stakingPending={this.state.stakingPending}
          stakingStaked={this.state.stakingStaked}
          tokenSymbol={this.state.tokenSymbol}
        />
      </div>
    }

    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <div>
          <Router>
            <header>
              <div id="tokenModal">
                <a href="/" id="hh1">
                  <img src={Logo} width="30" height="30" alt="" /> 
                  <h1>Pato</h1><h1>Verde</h1><h1>Projects</h1>
                </a>
                <nav>
                  <ul id="menu">                                                          
                    <NavLink className="inactive" activeClassName="active" to="/claim"><li><a>Claim</a></li></NavLink>                                     
                    <NavLink className="inactive" activeClassName="active" to="/pool"><li><a>Pool</a></li></NavLink>                                     
                    <NavLink className="inactive" activeClassName="active" to="/vote"><li><a>Vote</a></li></NavLink>                               
                    <NavLink className="inactive" activeClassName="active" to="/nft"><li><a>Nft</a></li></NavLink>    
                    <NavLink className="inactive" activeClassName="active" to="/games"><li><a>Games</a></li></NavLink>                   
                  </ul> 
                </nav> 
              </div>                           
              <div id="walletModal">
                {addToken}
                <ConnectWalletButton />
              </div> 
            </header>
            <main>
              <section>   
                <Switch>             
                  {loading}
                  <Route exact path="/">{home}</Route>         
                  <Route path="/claim">{claim}</Route>
                  <Route path="/pool">{pool}</Route>
                  <Route path="/vote">{soon}</Route>
                  <Route path="/nft">{soon}</Route>
                  <Route path="/games">{soon}</Route> 
                  <Route component={NotFound} /> 
                </Switch>
              </section>
            </main>
            <footer>
              <Footer /> 
            </footer> 
          </Router>     
        </div> 
      </Web3ReactProvider>
    );
  }
}
 
export default App;