import React, { Component } from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'

import PatoVerde from './abis/PatoVerde.json'
import FaucetAbi from './abis/Faucet.json'
import StakingAbi from './abis/Staking.json'

import chains from './components/Blockchain/AvailableChains'
import Header from './components/Header/Header'
import LoadingPage from './components/Loading/LoadingPage'
import NotFound from './components/NotFound'
import WrongNetwork from './components/WrongNetwork'

import Home from './views/Home/Home'
import Faucet from './views/Faucet/Faucet'
import Pool from './views/Pool/Pool'
import Game from './views/Game/Game'
import Maintenance from './views/Status/Maintenance'
import Soon from './views/Status/Soon'

import './App.css'

function getLibrary(provider) {
  return new Web3(provider)
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      patoToken: {},
      faucet: {},
      staking: {},
      stakingPending: 0,
      stakingStaked: 0,
      patoExpiry: 0,
      patoTokenBalance: '0',
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
    }
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

      } catch (e) {
        window.alert('PATO CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const staking = new web3.eth.Contract(StakingAbi.abi, chainInUse.stakingAddress)
        this.setState({ staking })
        let rewardsActive = await staking.methods.rewardsActive().call()
        this.setState({ rewardsActive: rewardsActive.toString() })
        let tokensInPool = await staking.methods.tokenInPool(0).call()
        this.setState({ tokensInPool: tokensInPool.toString() })
        let stakingStaked = await this.state.staking.methods.userInfo(0, this.state.account).call()
        let stakingPending = await this.state.staking.methods.pendingPATO(0, this.state.account).call()
        this.setState({
          stakingStaked: stakingStaked[0],
          stakingPending: stakingPending,
        })
      } catch (e) {
        window.alert('STAKING CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      try {
        const faucet = new web3.eth.Contract(FaucetAbi.abi, chainInUse.faucetAddress)
        this.setState({ faucet })
        let claimActive = await faucet.methods.setActiveOn().call()
        this.setState({ claimActive: claimActive.toString() })
        let patoExpiry = await this.state.faucet.methods.getExpiryOf(this.state.account, chainInUse.patoTokenAddress).call()
        this.setState({ patoExpiry: patoExpiry })
      } catch (e) {
        window.alert('FAUCET CONTRACT NOT DEPLOYED TO DETECTED NETWORK!')
      }
      this.setState({ loading: 'FALSE' })
      this.setState({ chest: 'FALSE' })
    }
  }

  render() {

    let loading
    if (this.state.loading === 'WEB3') {
      loading = <main>
        <LoadingPage />
      </main>
    }
    if (this.state.loading === 'INVALID_CHAIN') {
      loading = <article>
        <WrongNetwork />
      </article>
    }

    let home
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      home = <article>
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
      </article>
    }

    let claim
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      claim = <article>
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
      pool = <article>
        <Pool
          chainInUse={this.state.chainInUse}
          account={this.state.account}
          patoToken={this.state.patoToken}
          staking={this.state.staking}
          patoTokenBalance={this.state.patoTokenBalance}
          stakingPending={this.state.stakingPending}
          stakingStaked={this.state.stakingStaked}
          tokenSymbol={this.state.tokenSymbol}
        />
      </article>
    }

    let game
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      game = <article>
        <Game />
      </article>
    }

    let soon
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      soon = <article>
        <Soon />
      </article>
    }

    let maintenance
    if (this.state.loading === 'FALSE' && this.state.loading !== 'INVALID_CHAIN') {
      maintenance = <article>
        <Maintenance />
      </article>
    }

    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Header />
        <main>
          <section>
            <Route render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={450}
                  classNames="fade"
                >
                  <Switch location={location}>
                    {loading}
                    <Route exact path="/">
                      {home}
                    </Route>
                    <Route path="/claim">
                      {claim}
                    </Route>
                    <Route path="/pool">
                      {pool}
                    </Route>
                    <Route path="/game">
                      {soon}
                    </Route>
                    <Route component={NotFound} />
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