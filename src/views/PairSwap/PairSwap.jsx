import React, { Component } from 'react'

import Footer from '../../components/Footer/Footer'

import './PairSwap.css'

class PairSwap extends Component {
  constructor() {
    super();
    this.state = {
      pairValue: '0x0',
      checkPairWBNB: '0x0',
      checkPairBUSD: '0x0',
      checkPairUSDT: '0x0',
      checkPairUSDC: '0x0',
      checkPairDAI: '0x0',
      checkPairBTCB: '0x0',
      checkPairETH: '0x0',
      checkPairCAKE: '0x0',
      tokenAddress: '0x0',
      searchTime: 600,
      bnbAmount: 0,
      deadLine: 0,
      searchOn: false,
      buyingOn: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ pairValue: event.target.value });
    this.setState({ bnbAmount: event.target.value });
    this.setState({ tokenAddress: event.target.value });
    this.setState({ deadLine: event.target.value });
  }

  checkPairToken = async (pairValue) => {
    this.setState({ searchOn: true });

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    for (var i = 0; i < 600; i++) {
      let checkPairWBNB = await this.props.pair.methods.getPair(pairValue.toString(), '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c').call()
      this.setState({ checkPairWBNB: checkPairWBNB.toString() })
      let checkPairBUSD = await this.props.pair.methods.getPair(pairValue.toString(), '0xe9e7cea3dedca5984780bafc599bd69add087d56').call()
      this.setState({ checkPairBUSD: checkPairBUSD.toString() })
      let checkPairUSDT = await this.props.pair.methods.getPair(pairValue.toString(), '0x55d398326f99059ff775485246999027b3197955').call()
      this.setState({ checkPairUSDT: checkPairUSDT.toString() })
      let checkPairUSDC = await this.props.pair.methods.getPair(pairValue.toString(), '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d').call()
      this.setState({ checkPairUSDC: checkPairUSDC.toString() })
      let checkPairDAI = await this.props.pair.methods.getPair(pairValue.toString(), '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3').call()
      this.setState({ checkPairDAI: checkPairDAI.toString() })
      let checkPairBTCB = await this.props.pair.methods.getPair(pairValue.toString(), '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c').call()
      this.setState({ checkPairBTCB: checkPairBTCB.toString() })
      let checkPairETH = await this.props.pair.methods.getPair(pairValue.toString(), '0x2170ed0880ac9a755fd29b2688956bd959f933f8').call()
      this.setState({ checkPairETH: checkPairETH.toString() })
      let checkPairCAKE = await this.props.pair.methods.getPair(pairValue.toString(), '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82').call()
      this.setState({ checkPairCAKE: checkPairCAKE.toString() })

      this.setState({ searchTime: this.state.searchTime - 1 });

      console.log(i);

      await sleep(1000);
    }
  }

  buyBnbToken = async (bnbAmount, tokenAddress, deadLine) => {
    this.setState({ buyingOn: true });
    this.props.swap.methods
      .swapExactETHForTokens(window.web3.utils.toWei(bnbAmount.toString(), 'Ether'), ['0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', tokenAddress.toString()], this.props.account, window.web3.utils.toWei(deadLine.toString(), 'Ether'))
      .send({ from: this.props.account })
      .on('receipt', async (hash) => {
        window.location.reload()
      })
      .on('error', function (error) {
        window.location.reload()
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
                onChange={this.handleChange}
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
                        this.checkPairToken(this.state.pairValue)
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
                  {this.state.checkPairWBNB}
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
                  {this.state.checkPairBUSD}
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
                  {this.state.checkPairUSDT}
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
                  {this.state.checkPairUSDC}
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
                  {this.state.checkPairDAI}
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
          <p>
            {this.state.checkPairBTCB !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  BTCB: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                  {this.state.checkPairBTCB}
                </span>
              )
              :
              (
                <span>
                  BTCB: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p >
          <p>
            {this.state.checkPairETH !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  ETH: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                  {this.state.checkPairETH}
                </span>
              )
              :
              (
                <span>
                  ETH: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p >
          <p>
            {this.state.checkPairCAKE !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  CAKE: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                  {this.state.checkPairCAKE}
                </span>
              )
              :
              (
                <span>
                  CAKE: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p >
        </div >

        <div class="boxModalPairs">
          <h5>BNB SWAP</h5>
          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="0.00"
                type="number"
                min="1"
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                placeholder="1234322"
                type="number"
                min="1"
                onChange={this.handleChange}
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
                        this.buyBnbToken(this.state.bnbAmount, this.state.tokenAddress, this.state.deadLine)
                      }}>
                      {this.state.buyingOn === true ? "WAIT" : "BUY TOKEN"}
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