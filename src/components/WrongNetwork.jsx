import React, { Component } from 'react'

class WrongNetwork extends Component {

  addNetwork = async () => {
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

    return (
      <div>
        <h2 class="titles">INVALID NETWORK</h2>
        <article>
          <div class="boxModal">
            <h3>Polygon Mainnet</h3>
            <h4>https://polygon-rpc.com/</h4>
            <h4>137</h4 >
            <h4>MATIC</h4>
            <h4>https://explorer.matic.network/</h4>
            <button
              class="btn1"
              onClick={(event) => {
                event.preventDefault()
                this.addNetwork()
              }}>
              ADD POLYGON
            </button>
            <form action="/">
              <button 
                class="btn1" 
                type="submit"
              >
                BACK HOME
              </button>
            </form>
          </div>
        </article>
      </div>
    );
  }
}

export default WrongNetwork;
