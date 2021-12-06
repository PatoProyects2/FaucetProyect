import React, { Component } from 'react'

class WrongNetwork extends Component {

  render() {

    return (
      <div>
        <h2 class="titles">INVALID NETWORK</h2>
        <article>
          <div class="boxModal">
            <h3>Polygon Mainnet</h3>
            <h4>https://rpc-mainnet.maticvigil.com/</h4>
            <h4>137</h4 >
            <h4>MATIC</h4>
            <h4>https://explorer.matic.network/</h4>
            <button
              class="btn1"
              onClick={(event) => {
                event.preventDefault()
                this.props.addNetwork()
              }}>
              ADD NETWORK
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
