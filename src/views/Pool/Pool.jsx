import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'

import Footer from '../../components/Footer/Footer'

import LoadingTransaction from '../../components/Loading/LoadingTransaction'

import './Pool.css'

class Pool extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      loading: 'WEB3',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  approveToken = async () => {
    this.setState({ loading: 'TRANSACTION' })
    this.props.patoToken.methods
      .approve(this.props.chainInUse.stakingAddress, window.web3.utils.toWei(window.web3.utils.toBN(new BigNumber(100000000000000000000000000000000000000000000000000)).toString(), 'Ether'))
      .send({ from: this.props.account })
      .on('receipt', (hash) => {
        window.location.reload()
      })
      .on('error', function (error) {
        window.location.reload()
      });
  }

  depositToken = async (value) => {
    this.setState({ loading: 'TRANSACTION' })
    this.props.staking.methods
      .deposit(0, window.web3.utils.toWei(value.toString(), 'Ether'))
      .send({ from: this.props.account })
      .on('receipt', (hash) => {
        window.location.reload()
      })
      .on('error', function (error) {
        window.location.reload()
      });
  }

  harvestToken = async () => {
    this.setState({ loading: 'TRANSACTION' })
    this.props.staking.methods
      .brrr(0)
      .send({ from: this.props.account })
      .on('receipt', async (hash) => {
        window.location.reload()
      })
      .on('error', function (error) {
        window.location.reload()
      });
  }

  withdrawToken = async (value) => {
    this.setState({ loading: 'TRANSACTION' })
    this.props.staking.methods
      .withdraw(0, window.web3.utils.toWei(value.toString(), 'Ether'))
      .send({ from: this.props.account })
      .on('receipt', async (hash) => {
        window.location.reload()
      })
      .on('error', function (error) {
        window.location.reload()
      });
  }

  render() {
    return (
      <div>
        {
          this.state.loading === 'TRANSACTION' ? (
            <LoadingTransaction />

          ) : (
            <div>
              <h1>Active Pools (1)</h1>
              <div class="boxModal">
                <h3>PVP</h3>
                {this.props.patoAllowance === '0' ? (
                  <div class="btn2" id="approveModal">
                    <button
                      className="slide_from_left"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault()
                        this.approveToken()
                      }}>
                      APPROVE
                    </button>
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
                            <h1>About Pool</h1>
                          </div>
                          <div class="details-modal-content">
                            <p>
                              In this section you can stake your PVP tokens to earn more PVP tokens.
                            </p>
                            <p>
                              Profit (Rewards) will be available 31/12/2021.
                            </p>
                            <p>
                              A total of 1964 PVP are distributed per day among all depositors.
                            </p>
                            <p>
                              2% fee in withdrawals.
                            </p>
                            <a
                              href="https://polygonscan.com/address/0x4657550f34855342D4b21F1F6182CA8C2c0ec8c3"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Smart Contract
                            </a>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                ) : (
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Deposit</th>
                          <th scope="col">Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {Math.round(window.web3.utils.fromWei(this.props.stakingStaked.toString(), 'Ether') * 100) / 100}
                          </td>
                          <td>
                            {Math.round(window.web3.utils.fromWei(this.props.stakingPending.toString(), 'Ether') * 100) / 100}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>
                            <div class="btn2" id="approveModal">
                              <button
                                disabled={this.props.patoAllowance !== 0}
                                className="slide_from_left"
                                type="submit"
                                onClick={(event) => {
                                  event.preventDefault()
                                  this.approveToken()
                                }}>
                                APPROVED
                              </button>
                            </div>
                          </td>
                          <td>
                            <div class="btn2" id="claimModal">
                              <button
                                disabled={this.props.rewardsActive !== true}
                                className="slide_from_left"
                                type="submit"
                                onClick={(event) => {
                                  event.preventDefault()
                                  this.harvestToken()
                                }}>
                                CLAIM
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div>
                      <label class="field field_v1">
                        <input
                          class="field__input"
                          placeholder="Minimum amount: 1"
                          type="number"
                          min="1"
                          onChange={this.handleChange}
                        />
                        <span class="field__label-wrap">
                          <span class="field__label">PVP Amount</span>
                        </span>
                      </label>
                    </div>
                    <div class="btn2">
                      <table>
                        <tfoot id="farmButton">
                          <tr>
                            <td>
                              <button
                                disabled={this.state.value <= 0}
                                className="slide_from_left"
                                type="submit"
                                onClick={(event) => {
                                  event.preventDefault()
                                  this.depositToken(this.state.value)
                                }}>
                                DEPOSIT
                              </button>
                            </td>
                            <td>
                              <button
                                disabled={this.state.value <= 0}
                                className="slide_from_left"
                                type="submit"
                                onClick={(event) => {
                                  event.preventDefault()
                                  this.withdrawToken(this.state.value)
                                }}>
                                WITHDRAW
                              </button>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
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
                            <h1>About Pool</h1>
                          </div>
                          <div class="details-modal-content">
                            <p>
                              In this section you can stake your PVP tokens to earn more PVP tokens.
                            </p>
                            <p>
                              Profit (Rewards) will be available 31/12/2021.
                            </p>
                            <p>
                              A total of 1964 PVP are distributed per day among all depositors.
                            </p>
                            <p>
                              2% fee in withdrawals.
                            </p>
                            <a
                              href="https://polygonscan.com/address/0x4657550f34855342D4b21F1F6182CA8C2c0ec8c3"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Smart Contract
                            </a>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                )
                }
              </div>
              <Footer />
            </div >
          )
        }
      </div>
    );
  }
}

export default Pool;