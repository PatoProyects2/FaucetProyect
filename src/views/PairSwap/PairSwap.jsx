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
      erc20wbnb: {},
      erc20busd: {},
      erc20usdt: {},
      tokenAddress: '0x0',
      tokenAddress1: '0x0',
      checkPairWBNB: '0x0',
      checkPairBUSD: '0x0',
      checkPairUSDT: '0x0',
      addressWBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      addressBUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      addressUSDT: '0x55d398326f99059ff775485246999027b3197955',
      tokenName: 'Token 1',
      tokenName1: 'Token 2',
      tokenSymbol: 'Symbol',
      tokenSymbolWBNB: 'Symbol',
      tokenSymbolBUSD: 'Symbol',
      tokenSymbolUSDT: 'Symbol',
      decimals: 1000000000000000000,
      tokenAllowance: 0,
      searchRequests: 1200,
      bnbAmount: 0,
      tokenAmount: 0,
      tokenBalance: 0,
      deadLine: 0,
      gasAmount: 0,
      checkValuePairWBNB: 0,
      checkValuePairBUSD: 0,
      checkValuePairUSDT: 0,
      checkValuePairTokenWBNB: 0,
      checkValuePairTokenBUSD: 0,
      checkValuePairTokenUSDT: 0,
      searchOn: false,
      buyingOn: false,
      searchActive: true,
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

    for (var i = 0; i < 1200; i++) {
      let checkPairWBNB = await this.props.pair.methods.getPair(tokenAddress.toString(), this.state.addressWBNB).call()
      this.setState({ checkPairWBNB: checkPairWBNB.toString() })
      let checkPairBUSD = await this.props.pair.methods.getPair(tokenAddress.toString(), this.state.addressBUSD).call()
      this.setState({ checkPairBUSD: checkPairBUSD.toString() })
      let checkPairUSDT = await this.props.pair.methods.getPair(tokenAddress.toString(), this.state.addressUSDT).call()
      this.setState({ checkPairUSDT: checkPairUSDT.toString() })

      const web3 = window.web3
      const erc20token = new web3.eth.Contract(Erc20Abi.abi, tokenAddress.toString())
      this.setState({ erc20token })
      let tokenName = await this.state.erc20token.methods.name().call()
      this.setState({ tokenName: tokenName.toString() })
      let tokenSymbol = await this.state.erc20token.methods.symbol().call()
      this.setState({ tokenSymbol: tokenSymbol.toString() })
      let tokenBalance = await this.state.erc20token.methods.balanceOf(this.props.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })
      let checkValuePairTokenWBNB = await this.state.erc20token.methods.balanceOf(this.state.checkPairWBNB).call()
      this.setState({ checkValuePairTokenWBNB: checkValuePairTokenWBNB.toString() })
      let checkValuePairTokenBUSD = await this.state.erc20token.methods.balanceOf(this.state.checkPairBUSD).call()
      this.setState({ checkValuePairTokenBUSD: checkValuePairTokenBUSD.toString() })
      let checkValuePairTokenUSDT = await this.state.erc20token.methods.balanceOf(this.state.checkPairUSDT).call()
      this.setState({ checkValuePairTokenUSDT: checkValuePairTokenUSDT.toString() })
      let tokenAllowance = await this.state.erc20token.methods.allowance(this.props.account, tokenAddress.toString()).call()
      this.setState({ tokenAllowance: tokenAllowance.toString() })

      const erc20wbnb = new web3.eth.Contract(Erc20Abi.abi, this.state.addressWBNB.toString())
      this.setState({ erc20wbnb })
      if (this.state.checkPairWBNB !== '0x0000000000000000000000000000000000000000') {
        let checkValuePairWBNB = await this.state.erc20wbnb.methods.balanceOf(this.state.checkPairWBNB).call()
        this.setState({ checkValuePairWBNB: checkValuePairWBNB.toString() })
      }
      let tokenSymbolWBNB = await this.state.erc20wbnb.methods.symbol().call()
      this.setState({ tokenSymbolWBNB: tokenSymbolWBNB.toString() })

      const erc20busd = new web3.eth.Contract(Erc20Abi.abi, this.state.addressBUSD.toString())
      this.setState({ erc20busd })
      if (this.state.checkPairBUSD !== '0x0000000000000000000000000000000000000000') {
        let checkValuePairBUSD = await this.state.erc20busd.methods.balanceOf(this.state.checkPairBUSD).call()
        this.setState({ checkValuePairBUSD: checkValuePairBUSD.toString() })
      }
      let tokenSymbolBUSD = await this.state.erc20busd.methods.symbol().call()
      this.setState({ tokenSymbolBUSD: tokenSymbolBUSD.toString() })

      const erc20usdt = new web3.eth.Contract(Erc20Abi.abi, this.state.addressUSDT.toString())
      this.setState({ erc20usdt })
      if (this.state.checkPairUSDT !== '0x0000000000000000000000000000000000000000') {
        let checkValuePairUSDT = await this.state.erc20usdt.methods.balanceOf(this.state.checkPairUSDT).call()
        this.setState({ checkValuePairUSDT: checkValuePairUSDT.toString() })
      }
      let tokenSymbolUSDT = await this.state.erc20usdt.methods.symbol().call()
      this.setState({ tokenSymbolUSDT: tokenSymbolUSDT.toString() })

      if ((this.state.checkValuePairWBNB / this.state.decimals) !== 0) {
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

      if ((this.state.checkValuePairBUSD / this.state.decimals) !== 0) {
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

      if ((this.state.checkValuePairUSDT / this.state.decimals) !== 0) {
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

  stopCheckPairToken = async () => {
    window.location.reload()
  }

  addToken = async (tokenAddress) => {
    try {
      const provider = window.web3.currentProvider
      await provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress.toString(), // The address that the token is at.
            symbol: this.state.tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image: ""
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
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
              Balance: {(this.state.tokenBalance / this.state.decimals).toFixed(4)}
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
                  <td>
                    <button
                      disabled={this.state.searchOn === false}
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault();
                        this.stopCheckPairToken();
                      }}>
                      STOP
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
                  <td>
                    <button
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault()
                        this.addToken(this.state.tokenAddress)
                      }}>
                      ADD TOKEN
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <br></br>
          <br></br>
          <table>
            <tfoot>
              <tr>
                <td>
                  {this.state.checkPairWBNB !== '0x0000000000000000000000000000000000000000' ?
                    (
                      <table>
                        <tfoot id="farmButton">
                          <tr>
                            <td>
                              <span class="green">
                                Found! &nbsp;
                              </span>
                            </td>
                            <td>
                              {(this.state.checkValuePairTokenWBNB / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairWBNB / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolWBNB} &nbsp;
                            </td>
                            <td>
                              <a
                                class="contrast"
                                href={'https://bscscan.com/address/' + `${this.state.checkPairWBNB}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                View LP
                              </a>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    )
                    :
                    (
                      <table>
                        <tfoot id="farmButton">
                          <tr>
                            <td>
                              <span class="green">
                                Not Found! &nbsp;
                              </span>
                            </td>
                            <td>
                              {(this.state.checkValuePairTokenWBNB / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairWBNB / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolWBNB} &nbsp;
                            </td>
                            <td>
                              <a
                                class="contrast"
                                href={'https://bscscan.com/address/' + `${this.state.checkPairWBNB}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                View LP
                              </a>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    )
                  }
                </td>
              </tr>
              <tr>
                <td>
                  {this.state.checkPairBUSD !== '0x0000000000000000000000000000000000000000' ?
                    (
                      <table>
                        <tfoot id="farmButton">
                          <tr>
                            <td>
                              <span class="green">
                                Found! &nbsp;
                              </span>
                            </td>
                            <td>
                              {(this.state.checkValuePairTokenBUSD / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairBUSD / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolBUSD} &nbsp;
                            </td>
                            <td>
                              <a
                                class="contrast"
                                href={'https://bscscan.com/address/' + `${this.state.checkPairBUSD}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                View LP
                              </a>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    )
                    :
                    (
                      <table>
                        <tfoot id="farmButton">
                          <tr>
                            <td>
                              <span class="green">
                                Not Found! &nbsp;
                              </span>
                            </td>
                            <td>
                              {(this.state.checkValuePairTokenBUSD / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairBUSD / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolBUSD} &nbsp;
                            </td>
                            <td>
                              <a
                                class="contrast"
                                href={'https://bscscan.com/address/' + `${this.state.checkPairBUSD}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                View LP
                              </a>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    )
                  }
                </td>
              </tr>
              <tr>
                <td>
                  {this.state.checkPairUSDT !== '0x0000000000000000000000000000000000000000' ?
                    (
                      <table>
                        <tfoot id="farmButton">
                          <tr>
                            <td>
                              <span class="green">
                                Found! &nbsp;
                              </span>
                            </td>
                            <td>
                              {(this.state.checkValuePairTokenUSDT / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairUSDT / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolUSDT} &nbsp;
                            </td>
                            <td>
                              <a
                                class="contrast"
                                href={'https://bscscan.com/address/' + `${this.state.checkPairUSDT}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                View LP
                              </a>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    )
                    :
                    (
                      <table>
                        <tfoot id="farmButton">
                          <tr>
                            <td>
                              <span class="green">
                                Not Found! &nbsp;
                              </span>
                            </td>
                            <td>
                              {(this.state.checkValuePairTokenUSDT / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairUSDT / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolUSDT} &nbsp;
                            </td>
                            <td>
                              <a
                                class="contrast"
                                href={'https://bscscan.com/address/' + `${this.state.checkPairUSDT}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                View LP
                              </a>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    )
                  }
                </td>
              </tr>
            </tfoot>
          </table>
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