import React, { Component } from 'react'

import Footer from '../../components/Footer/Footer'

import LoadingTransaction from '../../components/Loading/LoadingTransaction'

import './Faucet.css'

class Faucet extends Component {

  constructor() {
    super();
    this.state = {
      loading: 'WEB3',
    };
  }

  claimToken = async () => {
    this.setState({ loading: 'TRANSACTION' })
    this.props.faucet.methods
      .claim(this.props.chainInUse.patoTokenAddress)
      .send({ from: this.props.account })
      .on('receipt', (hash) => {
        window.location.reload()
      })
      .on('error', function (error) {
        window.location.reload()
      });
  }

  render() {
    var seg = this.props.patoExpiry
    var day = Math.floor(seg / (24 * 3600));
    var hour = Math.floor((seg - day * 24 * 3600) / 3600);
    var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);

    return (
      <div>
        {
          this.state.loading === 'TRANSACTION' ? (
            <LoadingTransaction />

          ) : (
            <div>
              <h1>Active Claims (1)</h1>
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
                              this.claimToken()
                            }}>
                            {this.props.patoExpiry > 0 ? hour + "h " + minute + "m" : "CLAIM FREE"}
                          </button>
                          { }
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <h4
                >Wallet Balance: &nbsp;
                  <span>
                    {Math.round(window.web3.utils.fromWei(this.props.patoTokenBalance.toString(), 'Ether') * 100) / 100 + " " + this.props.tokenSymbol.toString()}
                  </span>
                </h4>
                <div class="container">
                  <details>
                    <summary>
                      <div class="button">
                        More information
                      </div>
                      <div class="details-modal-overlay"></div>
                    </summary>
                    <div class="details-modal">
                      <div class="details-modal-close">
                        <svg
                          className="close-modal"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                        >
                          <path
                            d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                          />
                        </svg>
                      </div>
                      <div class="details-modal-title">
                        <h1>About Claim</h1>
                      </div>
                      <div class="details-modal-content">
                        <p>
                          In this section you can claim 1 free PVP token every 24 hours for each wallet.
                        </p>
                        <a
                          href="https://polygonscan.com/address/0xA0621a004BB2BDbCEEC4C1BEfAec904f66afe7b5"
                          target="_blank"
                          rel="noopener noreferrer"
                        >View Smart Contract
                        </a>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
              < Footer />
            </div>
          )
        }
      </div>
    );
  }
}

export default Faucet;