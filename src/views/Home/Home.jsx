import React, { Component } from 'react'
import ReactPlayer from "react-player"

class Home extends Component {

  render() {
    let decimals;
    decimals = 1000000000000000000;
    return (
      <div>
        <article>
          <div class="homes2">
            <h3>Your Stats</h3>
            <div>
              <h4>Total In Pool (Deposit + Profit):</h4>
              <h5>{(this.props.stakingStaked + this.props.stakingPending) / decimals + " " + this.props.tokenSymbol}</h5>
              <h4>Wallet Balance:</h4>
              <h5>{Math.round(window.web3.utils.fromWei(this.props.patoTokenBalance.toString(), 'Ether') * 100) / 100 + " " + this.props.tokenSymbol}</h5>
            </div>
          </div>
        </article>
        <article>
          <div class="homes2">
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
          </div>
        </article>
        <article>
          <div class="homes2">
            <h3>Claim Stats</h3>
            <div>
              <h4>Active Claims:</h4>
              <h5>{this.props.claimActive}</h5>
              <h4>Available To Claim:</h4>
              <h5>{Math.round(this.props.faucetPatoTokenBalance / decimals) + " " + this.props.tokenSymbol}</h5>
            </div>
          </div>
        </article>
        <article>
          <div class="homes2">
            <h3>Pool Stats</h3>
            <div>
              <h4>Active Rewards:</h4>
              <h5>{this.props.rewardsActive}</h5>
              <h4>Total Deposited In Pool:</h4>
              <h5>{Math.round(this.props.tokensInPool / decimals) + " " + this.props.tokenSymbol}</h5>
              <h4>Rewards Per Day:</h4>
              <h5>1964 PVP</h5>
            </div>
          </div>
        </article>
        <article>
          <div class="homes">
            <h3>Frequent Questions</h3>
            <div>
              <h4>1. What is PVP?</h4>
              <p>
                - Pato Verde Projects (PVP) is a community that it is focused on people who wants to study development of decentralized applications and wants to launch
                his project with members of the community or with his own work team.
              </p>
            </div>
            <div>
              <h4>2. Will PVP tokens have value?</h4>
              <p>
                - Yes, in the future PVP tokens will have a value. (PVP tokens will be free for a limited time)
              </p>
            </div>
            <div>
              <h4>3. What can I do with PVP App?</h4>
              <p>
                - Claim 1 free PVP token every 24 hours. (Free claims will be available for a limited time)
              </p>
              <p>
                - Deposit PVP tokens in the pool to be rewarded with more PVP tokens.
              </p>
              <p>
                - Create or vote project ideas on blockchain with PVP tokens. (Soon)
              </p>
              <p>
                - Manage NFT Market Place with PVP tokens. (Soon)
              </p>
              <p>
                - Play with PVP tokens and earn rares NFT. (Soon)
              </p>
            </div>
            <div>
              <h4>4. What if I am an influencer?</h4>
              <p>
                - If you are a small or big influencer you can request for the creation of your project on the blockchain free.
              </p>
              <p>
                - In the future we will implement Api Twitch that will allow you to interact with your followers on the blockchain.
              </p>
            </div>
            <div id="twitch">
              <h4>5. Where can I find the community?</h4>
              <p>
                - You can join the Discord server or follow us on our social medias.
              </p>
              <div>
                <ReactPlayer
                  width="640"
                  height="360"
                  url="https://www.twitch.tv/patoverde_pv"
                  controls
                />
              </div>
            </div>
          </div>
        </article>

      </div>
    );
  }
}

export default Home;