import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'

import Erc20Abi from '../../abis/ERC20.json'
import UsdcProxyAbi from '../../abis/Usdc/UChildAdministrableERC20.json'
import UsdtProxyAbi from '../../abis/Usdt/UChildERC20.json'

import Footer from '../../components/Footer/Footer'

import './PairSwap.css'

class PairSwap extends Component {
  constructor() {
    super();
    this.state = {
      erc20token: {},
      erc20eth: {},
      erc20wbnb: {},
      erc20busd: {},
      erc20usdt: {},
      erc20matic: {},
      erc20usdtp: {},
      erc20usdc: {},
      tokenAddress: '',
      tokenAddress1: '',
      checkPairWBNB: '0x0000000000000000000000000000000000000000',
      checkPairBUSD: '0x0000000000000000000000000000000000000000',
      checkPairUSDT: '0x0000000000000000000000000000000000000000',
      checkPairMATIC: '0x0000000000000000000000000000000000000000',
      checkPairUSDC: '0x0000000000000000000000000000000000000000',
      tokenName: '',
      tokenName1: '',
      tokenSymbol: '',
      tokenSymbolWBNB: '',
      tokenSymbolBUSD: '',
      tokenSymbolUSDT: '',
      tokenSymbolMATIC: '',
      tokenSymbolUSDC: '',
      addressWBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      addressBUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      addressUSDT: '0x55d398326f99059ff775485246999027b3197955',
      addressMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      addressUSDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      tokenDecimal: '1',
      hour: 0,
      minute: 0,
      second: 0,
      unixTime: 0,
      walletBalance: 0,
      decimals: 1000000000000000000,
      decimalUSDC: 1000000,
      tokenDecimals: 0,
      tokenAllowance: 0,
      searchRequests: 1200,
      bnbAmount: 0,
      tokenAmount: 0,
      tokenBalance: 0,
      gasAmount: 0,
      checkValuePairWBNB: 0,
      checkValuePairBUSD: 0,
      checkValuePairUSDT: 0,
      checkValuePairMATIC: 0,
      checkValuePairUSDC: 0,
      checkValuePairTokenWBNB: 0,
      checkValuePairTokenBUSD: 0,
      checkValuePairTokenUSDT: 0,
      checkValuePairTokenMATIC: 0,
      checkValuePairTokenUSDC: 0,
      dayAmount: 0,
      searchOn: false,
      buyingOn: false,
      searchActive: true,
      mode: true,
      hourVerify: undefined,
      minuteVerify: undefined,
      secondVerify: undefined,
      tokenAddressVerify: undefined,
      bnbAmountVerify: undefined,
      tokenAmountVerify: undefined,
      gasAmountVerify: undefined,
      globalVerify: undefined,
    };
    this.tokenAddress = this.tokenAddress.bind(this);
    this.tokenAddress1 = this.tokenAddress1.bind(this);
    this.bnbAmount = this.bnbAmount.bind(this);
    this.tokenAmount = this.tokenAmount.bind(this);
    this.gasAmount = this.gasAmount.bind(this);
    this.hour = this.hour.bind(this);
    this.minute = this.minute.bind(this);
    this.second = this.second.bind(this);
    this.dayAmount = this.dayAmount.bind(this);
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
  hour(event) {
    this.setState({ hour: event.target.value });
  }
  minute(event) {
    this.setState({ minute: event.target.value });
  }
  second(event) {
    this.setState({ second: event.target.value });
  }
  dayAmount(event) {
    this.setState({ dayAmount: event.target.value });
  }

  startBot = async (hour, minute, second, tokenAddress, bnbAmount, tokenAmount, gasAmount) => {

    if (bnbAmount !== 0) {
      this.setState({ bnbAmountVerify: true })
    } else {
      this.setState({ bnbAmountVerify: false })
      return false
    }
    if (tokenAmount !== 0) {
      this.setState({ tokenAmountVerify: true })
    } else {
      this.setState({ tokenAmountVerify: false })
      return false
    }
    if (tokenAddress !== '') {
      this.setState({ tokenAddressVerify: true })
    } else {
      this.setState({ tokenAddressVerify: false })
      return false
    }
    if (gasAmount !== 0) {
      this.setState({ gasAmountVerify: true })
    } else {
      this.setState({ gasAmountVerify: false })
      return false
    }
    if (hour !== 0) {
      this.setState({ hourVerify: true })
    } else {
      this.setState({ hourVerify: false })
      return false
    }
    if (minute !== 0) {
      this.setState({ minuteVerify: true })
    } else {
      this.setState({ minuteVerify: false })
      return false
    }
    if (second !== 0) {
      this.setState({ secondVerify: true })
    } else {
      this.setState({ secondVerify: false })
      return false
    }

    fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=' +
      `${this.props.utcYear}` + '/' + `${this.props.utcMonth}` + '/' + `${this.props.utcDay}` + '%20' + `${hour}` + ':' + `${minute}` + ':' + `${second}`)
      .then(response =>
        response.json()
      )
      .then(data =>
        this.setState({ unixTime: data.UnixTimeStamp })
      );

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const web3 = window.web3
    const erc20token = new web3.eth.Contract(Erc20Abi.abi, tokenAddress.toString())
    this.setState({ erc20token })

    const erc20wbnb = new web3.eth.Contract(Erc20Abi.abi, this.state.addressWBNB.toString())
    this.setState({ erc20wbnb })
    const erc20busd = new web3.eth.Contract(Erc20Abi.abi, this.state.addressBUSD.toString())
    this.setState({ erc20busd })
    const erc20usdt = new web3.eth.Contract(Erc20Abi.abi, this.state.addressUSDT.toString())
    this.setState({ erc20usdt })

    const erc20matic = new web3.eth.Contract(Erc20Abi.abi, this.state.addressMATIC.toString())
    this.setState({ erc20matic })
    const erc20usdc = new web3.eth.Contract(UsdcProxyAbi.abi, this.state.addressUSDC.toString())
    this.setState({ erc20usdc })

    if (this.props.network === 'Bsc') {
      this.setState({ searchOn: true });
      while (this.state.searchRequests > 0) {
        let checkPairWBNB = await this.props.pairBsc.methods.getPair(tokenAddress.toString(), this.state.addressWBNB).call()
        this.setState({ checkPairWBNB: checkPairWBNB.toString() })
        let checkPairBUSD = await this.props.pairBsc.methods.getPair(tokenAddress.toString(), this.state.addressBUSD).call()
        this.setState({ checkPairBUSD: checkPairBUSD.toString() })
        let checkPairUSDT = await this.props.pairBsc.methods.getPair(tokenAddress.toString(), this.state.addressUSDT).call()
        this.setState({ checkPairUSDT: checkPairUSDT.toString() })
        let tokenName = await this.state.erc20token.methods.name().call()
        this.setState({ tokenName: tokenName.toString() })
        let tokenDecimals = await this.state.erc20token.methods.decimals().call()
        this.setState({ tokenDecimals: tokenDecimals.toString() })
        let tokenSymbol = await this.state.erc20token.methods.symbol().call()
        this.setState({ tokenSymbol: tokenSymbol.toString() })
        let tokenSymbolWBNB = await this.state.erc20wbnb.methods.symbol().call()
        this.setState({ tokenSymbolWBNB: tokenSymbolWBNB.toString() })
        let tokenSymbolBUSD = await this.state.erc20busd.methods.symbol().call()
        this.setState({ tokenSymbolBUSD: tokenSymbolBUSD.toString() })
        let tokenSymbolUSDT = await this.state.erc20usdt.methods.symbol().call()
        this.setState({ tokenSymbolUSDT: tokenSymbolUSDT.toString() })
        let checkValuePairTokenWBNB = await this.state.erc20token.methods.balanceOf(this.state.checkPairWBNB).call()
        this.setState({ checkValuePairTokenWBNB: checkValuePairTokenWBNB.toString() })
        let checkValuePairTokenBUSD = await this.state.erc20token.methods.balanceOf(this.state.checkPairBUSD).call()
        this.setState({ checkValuePairTokenBUSD: checkValuePairTokenBUSD.toString() })
        let checkValuePairTokenUSDT = await this.state.erc20token.methods.balanceOf(this.state.checkPairUSDT).call()
        this.setState({ checkValuePairTokenUSDT: checkValuePairTokenUSDT.toString() })
        let tokenAllowance = await this.state.erc20token.methods.allowance(this.props.account, tokenAddress.toString()).call()
        this.setState({ tokenAllowance: tokenAllowance.toString() })
        if (this.state.checkPairWBNB === '0x0000000000000000000000000000000000000000') {
          this.setState({ checkValuePairWBNB: 0 })
        } else {
          let checkValuePairWBNB = await this.state.erc20wbnb.methods.balanceOf(this.state.checkPairWBNB).call()
          this.setState({ checkValuePairWBNB: checkValuePairWBNB.toString() })
        }
        let checkValuePairBUSD = await this.state.erc20busd.methods.balanceOf(this.state.checkPairBUSD).call()
        this.setState({ checkValuePairBUSD: checkValuePairBUSD.toString() })
        let checkValuePairUSDT = await this.state.erc20usdt.methods.balanceOf(this.state.checkPairUSDT).call()
        this.setState({ checkValuePairUSDT: checkValuePairUSDT.toString() })
        if ((this.state.checkValuePairWBNB / this.state.decimals) !== 0) {
          this.props.swapBsc.methods
            .swapExactETHForTokens(0, [this.state.addressWBNB, `${tokenAddress.toString()}`], this.props.account, this.state.unixTime)
            .send({
              gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
              from: this.props.account,
              value: window.web3.utils.toWei((bnbAmount).toString(), "ether"),
            })
            .on('receipt', async (hash) => {

            })
            .on('error', function (error) {
              window.location.reload()
            });
          break;
        }
        if ((this.state.checkValuePairBUSD / this.state.decimals) !== 0) {
          this.props.swapBsc.methods
            .swapExactTokensForTokens(window.web3.utils.toWei(tokenAmount.toString(), 'Ether'), 0, [this.state.addressBUSD, `${tokenAddress.toString()}`], this.props.account, this.state.unixTime)
            .send({
              gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
              from: this.props.account
            })
            .on('receipt', async (hash) => {
              window.location.reload()
            })
            .on('error', function (error) {
              window.location.reload()
            });
          break;
        }
        if ((this.state.checkValuePairUSDT / this.state.decimals) !== 0) {
          this.props.swapBsc.methods
            .swapExactTokensForTokens(window.web3.utils.toWei(tokenAmount.toString(), 'Ether'), 0, [this.state.addressUSDT, `${tokenAddress.toString()}`], this.props.account, this.state.unixTime)
            .send({
              gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
              from: this.props.account
            })
            .on('receipt', async (hash) => {
              window.location.reload()
            })
            .on('error', function (error) {
              window.location.reload()
            });
          break;
        }
        this.setState({ searchRequests: this.state.searchRequests - 1 })
        await sleep(1000);
      }
    } else {
      this.setState({ searchOn: true });
      while (this.state.searchRequests > 0) {
        let checkPairWBNB = await this.props.pairPolygon.methods.getPair(tokenAddress.toString(), this.state.addressMATIC).call()
        this.setState({ checkPairWBNB: checkPairWBNB.toString() })
        let checkPairUSDC = await this.props.pairPolygon.methods.getPair(tokenAddress.toString(), this.state.addressUSDC).call()
        this.setState({ checkPairUSDC: checkPairUSDC.toString() })
        let tokenSymbolWBNB = await this.state.erc20matic.methods.symbol().call()
        this.setState({ tokenSymbolWBNB: tokenSymbolWBNB.toString() })
        let tokenSymbolUSDC = await this.state.erc20usdc.methods.symbol().call()
        this.setState({ tokenSymbolUSDC: tokenSymbolUSDC.toString() })
        let tokenName = await this.state.erc20token.methods.name().call()
        this.setState({ tokenName: tokenName.toString() })
        let tokenDecimals = await this.state.erc20token.methods.decimals().call()
        this.setState({ tokenDecimals: tokenDecimals.toString() })
        let tokenSymbol = await this.state.erc20token.methods.symbol().call()
        this.setState({ tokenSymbol: tokenSymbol.toString() })
        let tokenBalance = await this.state.erc20token.methods.balanceOf(this.props.account).call()
        this.setState({ tokenBalance: tokenBalance.toString() })
        let checkValuePairTokenWBNB = await this.state.erc20token.methods.balanceOf(this.state.checkPairWBNB).call()
        this.setState({ checkValuePairTokenWBNB: checkValuePairTokenWBNB.toString() })
        let checkValuePairTokenUSDC = await this.state.erc20token.methods.balanceOf(this.state.checkPairUSDC).call()
        this.setState({ checkValuePairTokenUSDC: checkValuePairTokenUSDC.toString() })
        let checkValuePairWBNB = await this.state.erc20matic.methods.balanceOf(this.state.checkPairWBNB).call()
        this.setState({ checkValuePairWBNB: checkValuePairWBNB.toString() })
        let checkValuePairUSDC = await this.state.erc20usdc.methods.balanceOf(this.state.checkPairUSDC).call()
        this.setState({ checkValuePairUSDC: checkValuePairUSDC.toString() })
        if ((this.state.checkValuePairWBNB / this.state.decimals) !== 0) {
          this.props.swapPolygon.methods
            .swapExactETHForTokens(0, [this.state.addressMATIC, `${tokenAddress.toString()}`], this.props.account, this.state.unixTime)
            .send({
              gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
              from: this.props.account,
              value: window.web3.utils.toWei((bnbAmount).toString(), "ether"),
            })
            .on('receipt', async (hash) => {

            })
            .on('error', function (error) {
              window.location.reload()
            });
          break;
        }
        if ((this.state.checkValuePairUSDC / this.state.decimals) !== 0) {
          this.props.swapPolygon.methods
            .swapExactTokensForTokens(window.web3.utils.toWei(tokenAmount.toString(), 'Ether'), 0, [this.state.addressUSDC, `${tokenAddress.toString()}`], this.props.account, this.state.unixTime)
            .send({
              gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
              from: this.props.account
            })
            .on('receipt', async (hash) => {
              window.location.reload()
            })
            .on('error', function (error) {
              window.location.reload()
            });
          break;
        }
        this.setState({ searchRequests: this.state.searchRequests - 1 })
        await sleep(1000);
      }
    }
    for (var d = 0; d < this.state.tokenDecimals; d++) {
      this.setState({ tokenDecimal: this.state.tokenDecimal.toString() + '0' })
    }
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

  manuallyBsc = async (tokenAddress1, tokenAmount, tokenAddress, gasAmount) => {
    this.props.swapBsc.methods
      .swapExactTokensForTokens(window.web3.utils.toWei(tokenAmount.toString(), 'Ether'), 0, [`${tokenAddress1.toString()}`, `${tokenAddress.toString()}`], this.props.account, this.state.unixTime)
      .send({
        gasPrice: window.web3.utils.toWei((gasAmount).toString(), "gwei"),
        from: this.props.account
      })
      .on('receipt', async (hash) => {

      })
      .on('error', function (error) {

      });
  }

  manuallyPolygon = async (tokenAmount, tokenAddress, tokenAddress1, deadLine, gasAmount) => {
    this.props.swapPolygon.methods
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
    this.state.erc20token.methods
      .approve(`${tokenAddress.toString()}`, window.web3.utils.toWei(window.web3.utils.toBN(new BigNumber(100000000000000000000000000000000000000000000000000)).toString(), 'Ether'))
      .send({ from: this.props.account })
      .on('receipt', (hash) => {

      })
      .on('error', function (error) {

      });
  }

  approveEnergy = async () => {
    this.props.patoToken.methods
      .approve('0x263a267C14b837BDb0c52d16D99df2270A2fc25F', window.web3.utils.toWei(window.web3.utils.toBN(new BigNumber(100000000000000000000000000000000000000000000000000)).toString(), 'Ether'))
      .send({ from: this.props.account })
      .on('receipt', (hash) => {
        window.location.reload()
      })
      .on('error', function (error) {

      });
  }

  buyEnergy = async (dayAmount) => {
    this.props.energySystem.methods
      .buyDay(dayAmount.toString())
      .send({ from: this.props.account })
      .on('receipt', (hash) => {
        window.location.reload()
      })
      .on('error', function (error) {

      });
  }

  selectMode = async () => {
    if (this.state.mode === true) {
      this.setState({ mode: false });

    } else {
      this.setState({ mode: true });
    }
  }


  addBscNetwork = async () => {
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

  addPolygonNetwork = async () => {
    try {
      const provider = window.web3.currentProvider
      await provider.sendAsync({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: "0x89",
          chainName: "Polygon Mainnet",
          rpcUrls: ["https://polygon-rpc.com/"],
          iconUrls: ["https://queesunbitcoin.com/wp-content/uploads/2021/05/curso-sobre-binance-online.png"],
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer.matic.network/"],
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
          chainId: "0x89",
        }],
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    var seg = this.props.checkTime
    var day = Math.floor(seg / (24 * 3600));
    var hour = Math.floor((seg - day * 24 * 3600) / 3600);
    var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);

    return (
      <div>
        <h1>SniperBot</h1>
        <h6>
          Network: {this.props.network}
          <br></br>
          {this.props.network === 'Polygon' ?
            <button
              class="btn1"
              onClick={(event) => {
                event.preventDefault()
                this.addBscNetwork()
              }}>
              ADD BSC
            </button>
            :
            <button
              class="btn1"
              onClick={(event) => {
                event.preventDefault()
                this.addPolygonNetwork()
              }}>
              ADD POLYGON
            </button>
          }
        </h6>
        <h6>Time Left: {this.props.checkTime > 0 ? day + "d " + hour + "h " + minute + "m" : this.props.checkTime + " days"}</h6>
        {this.props.checkStatus === true || this.props.checkVip === true ?
          <div class="boxModalPairs">
            <h5>MENU</h5>
            <button
              class="btn1"
              onClick={(event) => {
                event.preventDefault()
                this.selectMode()
              }}>
              {this.state.mode === true ? 'MANUALLY' : 'AUTOMATIC'}
            </button>
            <div>
              <h4>{this.state.bnbAmountVerify === false ? 'Invalid Amount' : ''}</h4>
              <h4>{this.state.tokenAmountVerify === false ? 'Invalid USD Amount' : ''}</h4>
              <h4>{this.state.tokenAddressVerify === false ? 'Invalid Token Address' : ''}</h4>
              <h4>{this.state.gasAmountVerify === false ? 'Invalid Gas Amount' : ''}</h4>
              <h4>{this.state.hourVerify === false ? 'Invalid Hour' : ''}</h4>
              <h4>{this.state.minuteVerify === false ? 'Invalid Minute' : ''}</h4>
              <h4>{this.state.secondVerify === false ? 'Invalid Second' : ''}</h4>
            </div>
            {this.state.mode === true ?
              <div class="form-group">
                <input
                  class="form-field"
                  placeholder="0.00"
                  type="number"
                  min="1"
                  onChange={this.bnbAmount}
                />
                <span>{(this.props.walletBalance / this.state.decimals).toFixed(4) + " "} {this.props.network === 'Polygon' ? ' MATIC' : ' BNB'}</span>
              </div>
              :
              <div>
                <div class="form-group">
                  <input
                    class="form-field"
                    placeholder="0x00000000..."
                    type="text"
                    onChange={this.tokenAddress1}
                  />
                  <span>Pay</span>
                </div>
              </div>
            }
            <div class="form-group">
              <input
                class="form-field"
                placeholder="0.00"
                type="number"
                min="1"
                onChange={this.tokenAmount}
              />
              <span>USD Amount</span>
            </div>
            <div class="form-group">
              <input
                class="form-field"
                placeholder="0x00000000..."
                type="text"
                onChange={this.tokenAddress}
              />
              <span>Buy</span>
            </div>
            <div class="form-group">
              <input
                class="form-field"
                placeholder="10"
                type="number"
                min="1"
                onChange={this.gasAmount}
              />
              <span>Gas Price</span>
            </div>
            <div class="form-group">
              <input
                class="form-field"
                type="number"
                min={this.props.utcHour + 1}
                max="23"
                placeholder={this.props.utcHour}
                onChange={this.hour}
              />
              <span>Hour</span>
              <input
                class="form-field"
                type="number"
                min={this.props.utcMinute}
                max="60"
                placeholder={this.props.utcMinute}
                onChange={this.minute}
              />
              <span>Minutes</span>
              <input
                class="form-field"
                type="number"
                min={this.props.utcSecond}
                max="60"
                placeholder={this.props.utcSecond}
                onChange={this.second}
              />
              <span>Seconds</span>
            </div>
            <div class="btn2">
              <table>
                <tfoot id="farmButton">
                  <tr>
                    <td>
                      {this.state.mode === true ?
                        <div>
                          {this.state.searchOn === true
                            ?
                            <button
                              className="slide_from_left"
                              type="submit"
                              onClick={(event) => {
                                event.preventDefault();
                                this.stopCheckPairToken();
                              }}>
                              STOP
                            </button>
                            :
                            <button
                              className="slide_from_left"
                              type="submit"
                              onClick={(event) => {
                                event.preventDefault();
                                this.startBot(this.state.hour, this.state.minute, this.state.second, this.state.tokenAddress, this.state.bnbAmount, this.state.tokenAmount, this.state.gasAmount, this.state.deadLine);
                              }}>
                              START
                            </button>
                          }
                        </div>
                        :
                        <div>
                          {this.props.network === 'Bsc' ?
                            <button
                              disabled={this.state.buyingOn === true}
                              className="slide_from_left"
                              type="submit"
                              onClick={(event) => {
                                event.preventDefault()
                                this.manuallyBsc(this.state.tokenAddress1, this.state.tokenAmount, this.state.tokenAddress, this.state.gasAmount)
                              }}>
                              {this.state.buyingOn === true ? "WAIT" : "BUY"}
                            </button>
                            :
                            <button
                              disabled={this.state.buyingOn === true}
                              className="slide_from_left"
                              type="submit"
                              onClick={(event) => {
                                event.preventDefault()
                                this.manuallyPolygon(this.state.tokenAmount, this.state.tokenAddress, this.state.tokenAddress1, this.state.deadLine, this.state.gasAmount)
                              }}>
                              {this.state.buyingOn === true ? "WAIT" : "BUY"}
                            </button>
                          }
                        </div>
                      }
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          :
          <div class="boxModalEnergy">
            <div class="form-group">
              <input
                class="form-field"
                placeholder="1"
                min="1"
                max="259200"
                type="number"
                onChange={this.dayAmount}
              />
              <span>Day Amount</span>
            </div>
            <div class="form-group">
              <input
                class="form-field"
                value={this.state.dayAmount * (this.props.checkPrice / this.state.decimals)}
                type="number"
                disabled="disabled"
                onChange={this.dayAmount}
              />
              <span>PVP Amount</span>
            </div>
            <div class="btn2">
              <table>
                <tr>
                  <td>
                    <button
                      disabled={this.props.energyAllowance !== '0'}
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault()
                        this.approveEnergy()
                      }}>
                      APPROVE
                    </button>
                  </td>
                  <td>
                    <button
                      disabled={this.props.energyAllowance === '0'}
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault()
                        this.buyEnergy(this.state.dayAmount)
                      }}>
                      BUY ENERGY
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        }
        {
          this.state.searchOn === true ?
            <div class="boxModalPairs">
              <h5>STATS</h5>
              <br></br>
              <p class="contrast">
                Name: {this.state.tokenName}
              </p>
              <p class="contrast">
                Decimals: {this.state.tokenDecimals}
              </p>
              <p class="contrast">
                Requests: {this.state.searchRequests}
              </p>
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
                                  {(this.state.checkValuePairTokenWBNB / this.state.tokenDecimal).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairWBNB / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolWBNB}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        )
                        :
                        (
                          <div>
                          </div>
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
                                  {(this.state.checkValuePairTokenBUSD / this.state.tokenDecimal).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairBUSD / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolBUSD}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        )
                        :
                        (
                          <div>
                          </div>
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
                                  {(this.state.checkValuePairTokenUSDT / this.state.tokenDecimal).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairUSDT / this.state.decimals).toFixed(2) + " " + this.state.tokenSymbolUSDT}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        )
                        :
                        (
                          <div>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {this.state.checkPairUSDC !== '0x0000000000000000000000000000000000000000' ?
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
                                  {(this.state.checkValuePairTokenUSDC / this.state.tokenDecimal).toFixed(2) + " " + this.state.tokenSymbol} / {(this.state.checkValuePairUSDC / this.state.decimalUSDC).toFixed(2) + " " + this.state.tokenSymbolUSDC}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        )
                        :
                        (
                          <div>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="btn2">
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
                        <button
                          className="slide_from_left"
                          type="submit"
                          onClick={(event) => {
                            event.preventDefault()
                            this.addToken(this.state.tokenAddress)
                          }}>
                          ADD TOKEN
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            :
            <div>
            </div>
        }
        <Footer />
      </div >

    );
  }
}

export default PairSwap;