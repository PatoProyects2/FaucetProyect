import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'

import Erc20Abi from '../../abis/ERC20.json'

import Footer from '../../components/Footer/Footer'

import './PairSwap.css'

class PairSwap extends Component {
  constructor() {
    super();
    this.state = {
      erc20token: {},
      erc20token1: {},
      erc20wbnb: {},
      erc20busd: {},
      erc20usdt: {},
      erc20dai: {},
      tokenAddress: '0x0',
      tokenAddress1: '0x0',
      checkPairWBNB: '0x0',
      checkPairBUSD: '0x0',
      checkPairUSDT: '0x0',
      checkPairDAI: '0x0',
      addressWBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      addressBUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      addressUSDT: '0x55d398326f99059ff775485246999027b3197955',
      addressDAI: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
      tokenName: 'Token 1',
      tokenName1: 'Token 2',
      tokenSymbol: 'Symbol',
      tokenAllowance: 0,
      searchRequests: 600,
      bnbAmount: 0,
      tokenAmount: 0,
      tokenBalance: 0,
      tokenBalance1: 0,
      deadLine: 0,
      gasAmount: 0,
      checkValuePairWBNB: 0,
      checkValuePairBUSD: 0,
      checkValuePairUSDT: 0,
      checkValuePairDAI: 0,
      searchOn: false,
      buyingOn: false,
    };
    this.tokenAddress = this.tokenAddress.bind(this);
    this.tokenAddress1 = this.tokenAddress1.bind(this);
    this.bnbAmount = this.bnbAmount.bind(this);
    this.tokenAmount = this.tokenAmount.bind(this);
    this.gasAmount = this.gasAmount.bind(this);
    this.deadLine = this.deadLine.bind(this);
  }

  tokenAddress(event) {
    this.setState({ tokenAddress: event.target.value });
  }
  tokenAddress1(event) {
    this.setState({ tokenAddress1: event.target.value });
  }
  tokenAmount(event) {
    this.setState({ tokenAmount: event.target.value });
  }
  bnbAmount(event) {
    this.setState({ bnbAmount: event.target.value });
  }
  gasAmount(event) {
    this.setState({ gasAmount: event.target.value });
  }
  deadLine(event) {
    this.setState({ deadLine: event.target.value });
  }

  checkPairToken = async (tokenAddress, bnbAmount, tokenAmount, gasAmount, deadLine) => {
    this.setState({ searchOn: true });

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    for (var i = 0; i < 600; i++) {
      let checkPairWBNB = await this.props.pair.methods.getPair(tokenAddress.toString(), this.state.addressWBNB).call()
      this.setState({ checkPairWBNB: checkPairWBNB.toString() })
      let checkPairBUSD = await this.props.pair.methods.getPair(tokenAddress.toString(), this.state.addressBUSD).call()
      this.setState({ checkPairBUSD: checkPairBUSD.toString() })
      let checkPairUSDT = await this.props.pair.methods.getPair(tokenAddress.toString(), this.state.addressUSDT).call()
      this.setState({ checkPairUSDT: checkPairUSDT.toString() })
      let checkPairDAI = await this.props.pair.methods.getPair(tokenAddress.toString(), this.state.addressDAI).call()
      this.setState({ checkPairDAI: checkPairDAI.toString() })

      const web3 = window.web3
      const erc20token = new web3.eth.Contract(Erc20Abi.abi, tokenAddress.toString())
      this.setState({ erc20token })
      let tokenName = await this.state.erc20token.methods.name().call()
      this.setState({ tokenName: tokenName.toString() })
      let tokenSymbol = await this.state.erc20token.methods.symbol().call()
      this.setState({ tokenSymbol: tokenSymbol.toString() })
      let tokenBalance = await this.state.erc20token.methods.balanceOf(this.props.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })
      let tokenAllowance = await this.state.erc20token.methods.allowance(this.props.account, tokenAddress.toString()).call()
      this.setState({ tokenAllowance: tokenAllowance.toString() })

      const erc20wbnb = new web3.eth.Contract(Erc20Abi.abi, this.state.addressWBNB.toString())
      this.setState({ erc20wbnb })
      let checkValuePairWBNB = await this.state.erc20wbnb.methods.balanceOf(this.state.checkPairWBNB).call()
      this.setState({ checkValuePairWBNB: checkValuePairWBNB.toString() })

      const erc20busd = new web3.eth.Contract(Erc20Abi.abi, this.state.addressBUSD)
      this.setState({ erc20busd })
      let checkValuePairBUSD = await this.state.erc20busd.methods.balanceOf(this.state.checkPairBUSD).call()
      this.setState({ checkValuePairBUSD: checkValuePairBUSD.toString() })

      const erc20usdt = new web3.eth.Contract(Erc20Abi.abi, this.state.addressUSDT)
      this.setState({ erc20usdt })
      let checkValuePairUSDT = await this.state.erc20usdt.methods.balanceOf(this.state.checkPairUSDT).call()
      this.setState({ checkValuePairUSDT: checkValuePairUSDT.toString() })

      if (this.state.checkValuePairWBNB > 0) {
        this.props.swap.methods
          .swapExactETHForTokens(0, [this.state.addressWBNB, `${tokenAddress.toString()}`], this.props.account, deadLine)
          .send({
            gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
            from: this.props.account,
            value: window.web3.utils.toWei((bnbAmount).toString(), "ether"),
          })
          .on('receipt', async (hash) => {

          })
          .on('error', function (error) {

          });
        break;
      }

      if (this.state.checkValuePairBUSD > 0) {
        this.props.swap.methods
          .swapExactTokensForTokens(window.web3.utils.toWei(tokenAmount.toString(), 'Ether'), 0, [this.state.addressBUSD, `${tokenAddress.toString()}`], this.props.account, deadLine)
          .send({
            gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
            from: this.props.account
          })
          .on('receipt', async (hash) => {

          })
          .on('error', function (error) {

          });
        break;
      }

      if (this.state.checkValuePairUSDT > 0) {
        this.props.swap.methods
          .swapExactTokensForTokens(window.web3.utils.toWei(tokenAmount.toString(), 'Ether'), 0, [this.state.addressUSDT, `${tokenAddress.toString()}`], this.props.account, deadLine)
          .send({
            gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
            from: this.props.account
          })
          .on('receipt', async (hash) => {

          })
          .on('error', function (error) {

          });
        break;
      }

      this.setState({ searchRequests: this.state.searchRequests - 1 })

      console.log(i);

      await sleep(1000);
    }
    this.setState({ searchOn: false });
  }

  buyTokenToken1 = async (tokenAmount, tokenAddress, tokenAddress1, deadLine, gasAmount) => {
    this.props.swap.methods
      .swapExactTokensForTokens(window.web3.utils.toWei(tokenAmount.toString(), 'Ether'), 0, [`${tokenAddress1.toString()}`, `${tokenAddress.toString()}`], this.props.account, deadLine)
      .send({
        gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
        from: this.props.account
      })
      .on('receipt', async (hash) => {

      })
      .on('error', function (error) {

      });
  }

  approveToken = async (tokenAddress) => {
    this.state.erc20.methods
      .approve(`${tokenAddress.toString()}`, window.web3.utils.toWei(window.web3.utils.toBN(new BigNumber(100000000000000000000000000000000000000000000000000)).toString(), 'Ether'))
      .send({ from: this.props.account })
      .on('receipt', (hash) => {

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
    let decimals = 1000000000000000000;

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
                <span class="field__label">{this.state.tokenName}</span>
              </span>
            </label>
            <span>
              Balance: {(this.state.tokenBalance / decimals).toFixed(4)}
            </span>
          </div>
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
                placeholder="0.00"
                type="number"
                min="1"
                onChange={this.tokenAmount}
              />
              <span class="field__label-wrap">
                <span class="field__label">USD Amount</span>
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
                      disabled={this.state.searchOn === true}
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault();
                        this.checkPairToken(this.state.tokenAddress, this.state.bnbAmount, this.state.tokenAmount, this.state.gasAmount, this.state.deadLine,);
                      }}>
                      {this.state.searchOn === true ? "SEARCHING" : "CHECK PAIR"}
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="boxModalPairs">
          <br></br>
          <span>
            Requests: {this.state.searchRequests}
          </span>
          <br></br>
          <div class="btn2">
            <table>
              <tfoot id="farmButton">
                <tr>
                  <td>
                    <button
                      disabled={this.state.tokenAllowance > 0}
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault()
                        this.approveToken(this.state.tokenAddress)
                      }}>
                      {this.state.tokenAllowance > 0 ? "APPROVED" : "APPROVE"}
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <br></br>
          <br></br>
          <p>
            {this.state.checkPairWBNB !== '0x0000000000000000000000000000000000000000' ?
              (
                <span>
                  {this.state.tokenSymbol} / WBNB: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                  {(this.state.checkValuePairWBNB / decimals).toFixed(2)}
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
                                this.buyWbnbToken(this.state.tokenAddress, this.state.deadLine, this.state.gasAmount, this.state.bnbAmount)
                              }}>
                              {this.state.buyingOn === true ? "WAIT" : "SWAP"}
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </span>
              )
              :
              (
                <span>
                  {this.state.tokenSymbol} / WBNB: &nbsp;
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
                  {this.state.tokenSymbol} / BUSD: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                  {(this.state.checkValuePairBUSD / decimals).toFixed(2)}
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
                                this.buyBusdToken(this.state.tokenAmount, this.state.tokenAddress, this.state.deadLine, this.state.gasAmount)
                              }}>
                              {this.state.buyingOn === true ? "WAIT" : "SWAP"}
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </span>
              )
              :
              (
                <span>
                  {this.state.tokenSymbol} / BUSD: &nbsp;
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
                  {this.state.tokenSymbol} / USDT: &nbsp;
                  <span class="green">
                    Found! &nbsp;
                  </span>
                  {(this.state.checkValuePairUSDT / decimals).toFixed(2)}
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
                                this.buyUsdtToken()
                              }}>
                              {this.state.buyingOn === true ? "WAIT" : "SWAP"}
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </span>
              )
              :
              (
                <span>
                  {this.state.tokenSymbol} / USDT: &nbsp;
                  <span class="red">
                    Not Found!
                  </span>
                </span>
              )
            }
          </p>
          <div>
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="0x00000000..."
                type="text"
                onChange={this.tokenAddress1}
              />
              <span class="field__label-wrap">
                <span class="field__label">{this.state.tokenName1}</span>
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
                        this.buyTokenToken1(this.state.tokenAmount, this.state.tokenAddress, this.state.tokenAddress1, this.state.deadLine, this.state.gasAmount)
                      }}>
                      {this.state.buyingOn === true ? "WAIT" : "MANUALLY"}
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <Footer />
      </div >

    );
  }
}

export default PairSwap;