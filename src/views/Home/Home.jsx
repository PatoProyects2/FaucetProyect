import React, { Component } from 'react'
import ReactPlayer from "react-player"
import Footer from '../../components/Footer/Footer'

import './Home.css'

class Home extends Component {

  render() {
    let decimals;
    decimals = 1000000000000000000;
    let actualRewardsPerDay;
    actualRewardsPerDay = 1964;
    return (
      <div>
        <h1 class="titles">Pato Verde Projects (PVP)</h1>

        <div class="homes2">
          <h3>My Stats</h3>
          <div>
            <h4>Total In Pool (Deposit + Profit):</h4>
            <h5>{Math.round((this.props.stakingStaked / decimals) + (this.props.stakingPending / decimals)) + " " + this.props.tokenSymbol}</h5>
            <h4>My Rewards Per Day:</h4>
            <h5>{Math.round((this.props.rewardsPerDay / decimals)) + " " + this.props.tokenSymbol}</h5>
            <h4>Wallet Balance:</h4>
            <h5>{Math.round(window.web3.utils.fromWei(this.props.patoTokenBalance.toString(), 'Ether') * 100) / 100 + " " + this.props.tokenSymbol}</h5>
          </div>

          <h3>PVP Token Stats</h3>
          <div>
            <h4>Name:</h4>
            <h5>{this.props.tokenName}</h5>
            <h4>Symbol:</h4>
            <h5>{this.props.tokenSymbol}</h5>
            <h4>Total Supply:</h4>
            <h5>{Math.round(window.web3.utils.fromWei(this.props.totalSupply.toString(), 'Ether') * 100) / 100 + " " + this.props.tokenSymbol}</h5>
            <h4>Max Supply:</h4>
            <h5>{Math.round(window.web3.utils.fromWei(this.props.maxSupply.toString(), 'Ether') * 100) / 100 + " " + this.props.tokenSymbol}</h5>
            <h4>Price:</h4>
            <h5>0 $ (FREE)</h5>
          </div>

          <h3>Claim Stats</h3>
          <div>
            <h4>Active Claims:</h4>
            <h5>{this.props.claimActive}</h5>
            <h4>Available To Claim:</h4>
            <h5>{Math.round(this.props.faucetPatoTokenBalance / decimals) + " " + this.props.tokenSymbol}</h5>
          </div>

          <h3>Pool Stats</h3>
          <div>
            <h4>Active Rewards:</h4>
            <h5>{this.props.rewardsActive}</h5>
            <h4>Total Deposited In Pool:</h4>
            <h5>{(this.props.tokensInPool / decimals) + " " + this.props.tokenSymbol}</h5>
            <h4>Rewards Per Day:</h4>
            <h5>{actualRewardsPerDay + " " + this.props.tokenSymbol}</h5>
          </div>
        </div>
        <div id="twitch">
          <ReactPlayer
            width="640"
            height="360"
            url="https://www.twitch.tv/patoverde_pv"
            controls
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;