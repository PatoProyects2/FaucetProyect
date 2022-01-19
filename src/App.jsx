import React, { Component } from 'react'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import PatoVerde from './abis/PatoVerde.json'
import FaucetAbi from './abis/Faucet.json'
import StakingAbi from './abis/Staking.json'
import PairAbi from './abis/Pair/PancakeFactory.json'
import SwapAbi from './abis/Swap/PancakeRouter.json'
import EnergyAbi from './abis/Energy/energySistem.json'

import chains from './components/Blockchain/AvailableChains'
import Layout from './components/Header/Layout'
import LoadingPage from './components/Loading/LoadingPage'
import NotFound from './components/NotFound'
import WrongNetwork from './components/WrongNetwork'

import Home from './views/Home/Home'
import Faucet from './views/Faucet/Faucet'
import Pool from './views/Pool/Pool'
import Game from './views/Game/Game'
import Maintenance from './views/Status/Maintenance'
import Soon from './views/Status/Soon'
import MarketPlace from './views/MarketPlace'
import PairSwap from './views/PairSwap/PairSwap'

import './App.scss'

function getLibrary(provider) {
  return new Web3(provider)
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      utc: {},
      erc20: {},
      pairBsc: {},
      pairPolygon: {},
      swapBsc: {},
      swapPolygon: {},
      patoToken: {},
      faucet: {},
      staking: {},
      energySystem: {},
      stakingPending: 0,
      stakingStaked: 0,
      patoExpiry: 0,
      walletBalance: 0,
      walletChainId: 0,
      utcYear: 0,
      utcMonth: 0,
      utcDay: 0,
      utcHour: 0,
      utcMinute: 0,
      utcSecond: 0,
      checkTime: 0,
      checkPrice: 0,
      checkEnergy: 0,
      account: '0x0',
      network: 'invalid',
      patoAllowance: '0',
      energyAllowance: '0',
      patoTokenBalance: '0',
      rewardsPerDay: '0',
      faucetPatoTokenBalance: '0',
      tokensInPool: '0',
      totalSupply: '0',
      maxSupply: '0',
      tokenName: '',
      tokenSymbol: '',
      loading: 'WEB3',
      chainInUse: undefined,
      rewardsActive: undefined,
      claimActive: undefined,
      checkStatus: undefined,
      checkVip: undefined,
    };
  }

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

    const utc = new Date()
    this.setState({ utc });
    let utcYear = this.state.utc.getUTCFullYear()
    this.setState({ utcYear });
    let utcMonth = this.state.utc.getUTCMonth() + 1
    this.setState({ utcMonth });
    let utcDay = this.state.utc.getUTCDate()
    this.setState({ utcDay });
    let utcHour = this.state.utc.getUTCHours()
    this.setState({ utcHour });
    let utcMinute = this.state.utc.getUTCMinutes() + 1
    this.setState({ utcMinute });
    let utcSecond = this.state.utc.getUTCSeconds()
    this.setState({ utcSecond });

    for (let chainIndex in chains) {
      if (chains[chainIndex].id === chainId) {
        chainInUse = chains[chainIndex]
      }
    }

    if (!chainInUse) {
      this.setState({ loading: "INVALID_CHAIN" })
      window.alert('INVALID NETWORK, CONNECT TO POLYGON MAINNET NETWORK!')
    } else {
      this.setState({ chainInUse })
      this.setState({ account: accounts[0] })
      try {
        const patoToken = new web3.eth.Contract(PatoVerde.abi, chainInUse.patoTokenAddress)
        this.setState({ patoToken })
        let patoAllowance = await this.state.patoToken.methods.allowance(this.state.account, chainInUse.stakingAddress).call()
        this.setState({ patoAllowance: patoAllowance.toString() })
        let energyAllowance = await this.state.patoToken.methods.allowance(this.state.account, chainInUse.energyAddress).call()
        this.setState({ energyAllowance: energyAllowance.toString() })
        let patoTokenBalance = await this.state.patoToken.methods.balanceOf(this.state.account).call()
        this.setState({ patoTokenBalance: patoTokenBalance.toString() })
        let faucetPatoTokenBalance = await this.state.patoToken.methods.balanceOf(chainInUse.faucetAddress).call()
        this.setState({ faucetPatoTokenBalance: faucetPatoTokenBalance.toString() })
        let totalSupply = await this.state.patoToken.methods.totalSupply().call()
        this.setState({ totalSupply: totalSupply.toString() })
        let maxSupply = await this.state.patoToken.methods.maxSupply().call()
        this.setState({ maxSupply: maxSupply.toString() })
        let tokenName = await this.state.patoToken.methods.name().call()
        this.setState({ tokenName: tokenName.toString() })
        let tokenSymbol = await this.state.patoToken.methods.symbol().call()
        this.setState({ tokenSymbol: tokenSymbol.toString() })

      } catch (e) {
        console.log('PATO CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const staking = new web3.eth.Contract(StakingAbi.abi, chainInUse.stakingAddress)
        this.setState({ staking })
        let rewardsActive = await this.state.staking.methods.rewardsActive().call()
        this.setState({ rewardsActive: rewardsActive.toString() })
        let rewardsPerDay = await this.state.staking.methods.rewardsPerDay(0, this.state.account).call()
        this.setState({ rewardsPerDay: rewardsPerDay.toString() })
        let tokensInPool = await this.state.staking.methods.tokenInPool(0).call()
        this.setState({ tokensInPool: tokensInPool.toString() })
        let stakingStaked = await this.state.staking.methods.userInfo(0, this.state.account).call()
        this.setState({ stakingStaked: stakingStaked[0] })
        let stakingPending = await this.state.staking.methods.pendingPATO(0, this.state.account).call()
        this.setState({ stakingPending: stakingPending })
      } catch (e) {
        console.log('STAKING CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const faucet = new web3.eth.Contract(FaucetAbi.abi, chainInUse.faucetAddress)
        this.setState({ faucet })
        let claimActive = await this.state.faucet.methods.setActiveOn().call()
        this.setState({ claimActive: claimActive.toString() })
        let patoExpiry = await this.state.faucet.methods.getExpiryOf(this.state.account, chainInUse.patoTokenAddress).call()
        this.setState({ patoExpiry: patoExpiry })
      } catch (e) {
        console.log('FAUCET CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const pairBsc = new web3.eth.Contract(PairAbi.abi, chainInUse.pancakePairAddress)
        this.setState({ pairBsc })

      } catch (e) {
        console.log('PAIR BSC CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const swapBsc = new web3.eth.Contract(SwapAbi.abi, chainInUse.pancakeSwapAddress)
        this.setState({ swapBsc })
      } catch (e) {
        console.log('SWAP BSC CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const pairPolygon = new web3.eth.Contract(PairAbi.abi, chainInUse.polygonPairAddress)
        this.setState({ pairPolygon })

      } catch (e) {
        console.log('PAIR POLYGON CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const swapPolygon = new web3.eth.Contract(SwapAbi.abi, chainInUse.polygonSwapAddress)
        this.setState({ swapPolygon })
      } catch (e) {
        console.log('SWAP POLYGON CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const energySystem = new web3.eth.Contract(EnergyAbi.abi, chainInUse.energyAddress)
        this.setState({ energySystem })
        let checkStatus = await this.state.energySystem.methods.checkUser(this.state.account).call()
        this.setState({ checkStatus: checkStatus })
        let checkVip = await this.state.energySystem.methods.getVipChek(this.state.account).call()
        this.setState({ checkVip: checkVip })
        let checkTime = await this.state.energySystem.methods.howTimeLeft(this.state.account).call()
        this.setState({ checkTime: checkTime })
        let checkPrice = await this.state.energySystem.methods.pricePerDay().call()
        this.setState({ checkPrice: checkPrice })
        let checkEnergy = await this.state.energySystem.methods.userEnergy(this.state.account).call()
        this.setState({ checkEnergy: checkEnergy })
      } catch (e) {
        console.log('ENERGY SYSTEM')
      }
      try {
        let walletBalance = await web3.eth.getBalance(this.state.account)
        this.setState({ walletBalance: walletBalance.toString() })
        let walletChainId = await web3.eth.getChainId()
        this.setState({ walletChainId: walletChainId.toString() })
      } catch (e) {
        console.log('SNIPER BOT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      if (this.state.walletChainId === '56') {
        this.setState({ network: 'Bsc' })
      }
      if (this.state.walletChainId === '137') { 
        this.setState({ network: 'Polygon' })
      }
      this.setState({ loading: 'FALSE' })
    }
  }

  render() {

    let loading
    if (this.state.loading === 'WEB3') {
      loading = <main className="page">
        <LoadingPage />
      </main>
    }
    if (this.state.loading === 'INVALID_CHAIN') {
      loading = <article className="page">
        <WrongNetwork />
      </article>
    }

    let home
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      home = <article className="page">
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
          rewardsPerDay={this.state.rewardsPerDay}
        />
      </article>
    }

    let claim
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      claim = <article className="page">
        <Faucet
          chainInUse={this.state.chainInUse}
          account={this.state.account}
          patoToken={this.state.patoToken}
          faucet={this.state.faucet}
          patoTokenBalance={this.state.patoTokenBalance}
          faucetPatoTokenBalance={this.state.faucetPatoTokenBalance}
          patoExpiry={this.state.patoExpiry}
          tokenSymbol={this.state.tokenSymbol}
        />
      </article>
    }

    let pool
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      pool = <article className="page">
        <Pool
          chainInUse={this.state.chainInUse}
          account={this.state.account}
          patoToken={this.state.patoToken}
          staking={this.state.staking}
          patoTokenBalance={this.state.patoTokenBalance}
          stakingPending={this.state.stakingPending}
          stakingStaked={this.state.stakingStaked}
          tokenSymbol={this.state.tokenSymbol}
          patoAllowance={this.state.patoAllowance}
          rewardsActive={this.state.rewardsActive}
        />
      </article>
    }

    let game
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      game = <article className="page">
        <Game />
      </article>
    }

    let marketplace
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      marketplace = <article className="page">
        <MarketPlace />
      </article>
    }

    let pairSwap
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      pairSwap = <article className="page">
        <PairSwap
          pairBsc={this.state.pairBsc}
          pairPolygon={this.state.pairPolygon}
          swapBsc={this.state.swapBsc}
          swapPolygon={this.state.swapPolygon}
          account={this.state.account}
          walletBalance={this.state.walletBalance}
          network={this.state.network}
          utcYear={this.state.utcYear}
          utcMonth={this.state.utcMonth}
          utcDay={this.state.utcDay}
          utcHour={this.state.utcHour}
          utcMinute={this.state.utcMinute}
          utcSecond={this.state.utcSecond}
          energySystem={this.state.energySystem}
          checkStatus={this.state.checkStatus}
          checkVip={this.state.checkVip}
          checkTime={this.state.checkTime}
          checkPrice={this.state.checkPrice}
          checkEnergy={this.state.checkEnergy}
          energyAllowance={this.state.energyAllowance}
          patoToken={this.state.patoToken}
        />
      </article>
    }

    let soon
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      soon = <article className="page">
        <Soon />
      </article>
    }

    let maintenance
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      maintenance = <article className="page">
        <Maintenance />
      </article>
    }

    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout />
        <main>
          <section>
            {loading}
            <Route render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={450}
                  classNames="fade"
                >
                  <Switch location={location}>

                    <Route exact path="/">
                      {home}
                    </Route>

                    {/* RUTAS */}
                    <Route exact path="/claim">
                      {claim}
                    </Route>
                    <Route exact path="/faucet">
                      <Redirect to="/claim"></Redirect>
                    </Route>
                    <Route exact path="/free">
                      <Redirect to="/claim"></Redirect>
                    </Route>
                    <Route path="/game">
                      {game}
                    </Route>
                    <Route exact path="/marketplace">
                      {marketplace}
                    </Route>
                    <Route exact path="/bot">
                      {pairSwap}
                    </Route>

                    {/* REDIRECCIONES */}
                    <Route exact path="/pool">
                      {pool}
                    </Route>
                    <Route exact path="/stake">
                      <Redirect to="/pool"></Redirect>
                    </Route>
                    <Route exact path="/pools">
                      <Redirect to="/pool"></Redirect>
                    </Route>
                    <Route exact path="/piscina">
                      <Redirect to="/pool"></Redirect>
                    </Route>

                    <Route path="/:notFound" component={NotFound} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )} />
          </section>
        </main>
      </Web3ReactProvider>
    );
  }
}

export default App;