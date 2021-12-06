import React, { Component } from 'react'

class Faucet extends Component {

  render() {
    var seg = this.props.patoExpiry
    var day = Math.floor(seg / (24 * 3600));
    var hour = Math.floor((seg - day * 24 * 3600) / 3600);
    var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);

    return (
      <div>
        <div class="boxModal">
          <h3>PVP</h3>
          <table>
            <tfoot>
              <tr>
                <td>
                  <div class="btn2">
                    <button
                      disabled={this.props.patoExpiry > 0}
                      className="slide_from_left"
                      onClick={(event) => {
                        event.preventDefault()
                        this.props.claimToken()
                      }}>
                      {this.props.patoExpiry > 0 ? hour + "H " + minute + "M" : "CLAIM FREE"}
                    </button>
                    { }
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          <h4>Wallet Balance: &nbsp;<span>{Math.round(window.web3.utils.fromWei(this.props.patoTokenBalance.toString(), 'Ether') * 100) / 100 + " " + this.props.tokenSymbol.toString()}</span></h4>
          <div class="footerModal">
            <h3>About</h3>
            <p>
              In this section you can claim 1 free PVP token every 24 hours for each wallet.
            </p>
            <a href="https://polygonscan.com/address/0x5399FE0286202D0d1B736343344529Da00f9D22E" target="_blank" rel="noopener noreferrer">View Smart Contract</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Faucet;