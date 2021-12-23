import React, { Component } from 'react'

import Footer from '../../components/Footer/Footer'

import './PairSwap.css'

class PairSwap extends Component {
  constructor() {
    super();
    this.state = {
      tokenAddress: '',
      tokenAddress2: '',
      checkPairWBNB: '0x0',
      checkPairBUSD: '0x0',
      checkPairUSDT: '0x0',
      checkPairUSDC: '0x0',
      checkPairDAI: '0x0',
      checkPairBTCB: '0x0',
      checkPairETH: '0x0',
      checkPairCAKE: '0x0',
      searchTime: 600,
      tokenAmount: 0,
      deadLine: 0,
      gasAmount: 0,
      searchOn: false,
      buyingOn: false,
    };
    this.tokenAddress = this.tokenAddress.bind(this);
    this.tokenAddress2 = this.tokenAddress2.bind(this);
    this.tokenAmount = this.tokenAmount.bind(this);
    this.gasAmount = this.gasAmount.bind(this);
    this.deadLine = this.deadLine.bind(this);
  }

  tokenAddress(event) {
    this.setState({ tokenAddress: event.target.value });
  }
  tokenAddress2(event) {
    this.setState({ tokenAddress2: event.target.value });
  }
  tokenAmount(event) {
    this.setState({ tokenAmount: event.target.value });
  }
  gasAmount(event) {
    this.setState({ gasAmount: event.target.value });
  }
  deadLine(event) {
    this.setState({ deadLine: event.target.value });
  }
  

  checkPairToken = async (tokenAddress) => {
    this.setState({ searchOn: true });

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    for (var i = 0; i < 600; i++) {
      let checkPairWBNB = await this.props.pair.methods.getPair(tokenAddress.toString(), '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c').call()
      this.setState({ checkPairWBNB: checkPairWBNB.toString() })
      let checkPairBUSD = await this.props.pair.methods.getPair(tokenAddress.toString(), '0xe9e7cea3dedca5984780bafc599bd69add087d56').call()
      this.setState({ checkPairBUSD: checkPairBUSD.toString() })
      let checkPairUSDT = await this.props.pair.methods.getPair(tokenAddress.toString(), '0x55d398326f99059ff775485246999027b3197955').call()
      this.setState({ checkPairUSDT: checkPairUSDT.toString() })
      let checkPairUSDC = await this.props.pair.methods.getPair(tokenAddress.toString(), '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d').call()
      this.setState({ checkPairUSDC: checkPairUSDC.toString() })
      let checkPairDAI = await this.props.pair.methods.getPair(tokenAddress.toString(), '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3').call()
      this.setState({ checkPairDAI: checkPairDAI.toString() })

      this.setState({ searchTime: this.state.searchTime - 1 });

      console.log(i);

      await sleep(1000);
    }
  }

  buyBnbToken = async (tokenAmount, tokenAddress, gasAmount, deadLine) => {
    this.props.swap.methods
      .swapExactETHForTokens(0, ['0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', `${tokenAddress.toString()}`], this.props.account, deadLine)
      .send({
        gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
        from: this.props.account,
        value: window.web3.utils.toWei((tokenAmount).toString(), "ether"),
      })
      .on('receipt', async (hash) => {

      })
      .on('error', function (error) {
       
      });
  }

  buyToken = async (tokenAmount, tokenAddress, tokenAddress2, gasAmount, deadLine) => {
    this.props.swap.methods
      .swapExactTokensForTokens(window.web3.utils.toWei(tokenAmount.toString(), 'Ether'), 0, [`${tokenAddress.toString()}`, `${tokenAddress2.toString()}`], this.props.account, deadLine)
      .send({
        gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
        from: this.props.account
      })
      .on('receipt', async (hash) => {

      })
      .on('error', function (error) {
       
      });
  }

  addNetwork = async () => {
    try {
      const provider = window.web3.currentProvider
      await provider.sendAsync({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: "0x38",
          chainName: "BSC Mainnet",
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

  switchNetwork = async () => {
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
  render() {

    return (
      <div>
        <h1>BOT</h1>
        <div class="boxModalPairs">
          <h5>CAKE-LP PAIR</h5>
          <button
            class="btn1"
            onClick={(event) => {
              event.preventDefault()
              this.addNetwork()
            }}>
            ADD BSC
          </button>
          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="0x00000000..."
                type="text"
                onChange={this.tokenAddress}
              />
              <span class="field__label-wrap">
                <span class="field__label">Token Address</span>
              </span>
            </label>
          </div>
          <div class="btn2">
            <table>
              <tfoot id="farmButton">
                <tr>
                  <td>
                    <button
                      disabled={this.state.searchOn === true}
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault()
                        this.checkPairToken(this.state.tokenAddress)
                      }}>
                      {this.state.searchOn === true ? "SEARCHING" : "CHECK PAIR"}
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
            <span>
              {this.state.searchTime} requests
            </span>
          </div>
          <br></br>
          <p>
            {this.state.checkPairWBNB !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  WBNB: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                </span>
              )
              :
              (
                <span>
                  WBNB: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p>
          <p>
            {this.state.checkPairBUSD !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  BUSD: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                </span>
              )
              :
              (
                <span>
                  BUSD: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p>
          <p>
            {this.state.checkPairUSDT !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  USDT: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                </span>
              )
              :
              (
                <span>
                  USDT: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p>
          <p>
            {this.state.checkPairUSDC !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  USDC: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                </span>
              )
              :
              (
                <span>
                  USDC: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p>
          <p>
            {this.state.checkPairDAI !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  DAI: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                </span>
              )
              :
              (
                <span>
                  DAI: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p >
        </div >

        <div class="boxModalPairs">
          <h5>SWAP BNB FOR TOKEN</h5>
          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="0.00"
                type="number"
                min="1"
                onChange={this.bnbAmount}
              />
              <span class="field__label-wrap">
                <span class="field__label">BNB Amount</span>
              </span>
            </label>
          </div>

          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="0x00000000..."
                type="text"
                onChange={this.tokenAddress}
              />
              <span class="field__label-wrap">
                <span class="field__label">Token Address</span>
              </span>
            </label>
          </div>

          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="10"
                type="number"
                min="1"
                onChange={this.gasAmount}
              />
              <span class="field__label-wrap">
                <span class="field__label">Gas Price</span>
              </span>
            </label>
          </div>

          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="1640906725"
                type="number"
                min="1"
                onChange={this.deadLine}
              />
              <span class="field__label-wrap">
                <span class="field__label">Dead Line</span>
              </span>
            </label>
          </div>

          <div class="btn2">
            <table>
              <tfoot id="farmButton">
                <tr>
                  <td>
                    <button
                      disabled={this.state.buyingOn === true}
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault()
                        this.buyBnbToken(this.state.tokenAmount, this.state.tokenAddress, this.state.gasAmount, this.state.deadLine)
                      }}>
                      {this.state.buyingOn === true ? "WAIT" : "SWAP"}
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div >

        <div class="boxModalPairs">
          <h5>SWAP TOKEN FOR TOKEN</h5>
          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="0.00"
                type="number"
                min="1"
                onChange={this.tokenAmount}
              />
              <span class="field__label-wrap">
                <span class="field__label">Token1 Amount</span>
              </span>
            </label>
          </div>

          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="0x00000000..."
                type="text"
                onChange={this.tokenAddress}
              />
              <span class="field__label-wrap">
                <span class="field__label">Token1 Address</span>
              </span>
            </label>
          </div>

          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="0x00000000..."
                type="text"
                onChange={this.tokenAddress2}
              />
              <span class="field__label-wrap">
                <span class="field__label">Token2 Address</span>
              </span>
            </label>
          </div>

          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="10"
                type="number"
                min="1"
                onChange={this.gasAmount}
              />
              <span class="field__label-wrap">
                <span class="field__label">Gas Price</span>
              </span>
            </label>
          </div>

          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="1640906725"
                type="number"
                min="1"
                onChange={this.deadLine}
              />
              <span class="field__label-wrap">
                <span class="field__label">Dead Line</span>
              </span>
            </label>
          </div>

          <div class="btn2">
            <table>
              <tfoot id="farmButton">
                <tr>
                  <td>
                    <button
                      disabled={this.state.buyingOn === true}
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault()
                        this.buyToken(this.state.tokenAmount, this.state.tokenAddress, this.state.tokenAddress2, this.state.gasAmount, this.state.deadLine)
                      }}>
                      {this.state.buyingOn === true ? "WAIT" : "SWAP"}
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div >
        <Footer />
      </div >
    );
  }
}

export default PairSwap;