import React, { Component } from 'react'
import Footer from '../../components/Footer/Footer'

class Pool extends Component {
  constructor() {
    super();
    this.state = {
      poolHelp: 'OFF'
    };
  }

  PoolHelpOn = async () => {
    this.setState({ poolHelp: 'ON' });
  }

  PoolHelpOff = async () => {
    this.setState({ poolHelp: 'OFF' });
  }

  render() {
    let decimals = 1000000000000000000;
    return (
      <div className="page">
        <h1 class="titles">Active Pools (1)</h1>
        {this.state.poolHelp == 'ON' ? (
          <div class="boxModal">
            <div class="footerModal">
              <h3>About</h3>
              <button class="btn1_small" onClick={this.PoolHelpOff}>X</button>
              <p>
                In this section you can stake your PVP tokens to earn more PVP tokens.
              </p>
              <p>
                You have to approve it once to be able to use the pool. (Don't use the approve button more than once)
              </p>
              <p>
                A total of 1440 PVP are distributed per day among all depositors.
              </p>
              <p>
                2% fee in withdrawals.
              </p>
              <a href="https://polygonscan.com/address/0xD350b27B3e98DB4a4Cb6436Caa8Deb5a3c79De84" target="_blank" rel="noopener noreferrer">View Smart Contract</a>
            </div>
          </div>
        ) : (
          <div class="boxModal">
            <h3>PVP</h3>
            <button class="btn1_small" onClick={this.PoolHelpOn}>?</button>
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
                        disabled={this.props.stakingStaked > 0}
                        className="slide_from_left"
                        type="submit"
                        onClick={(event) => {
                          event.preventDefault()
                          this.props.approveToken()
                        }}>
                        APPROVE
                      </button>
                    </div>
                  </td>
                  <td>
                    <div class="btn2" id="claimModal">
                      <button
                        disabled={this.props.stakingPending <= 0}
                        className="slide_from_left"
                        type="submit"
                        onClick={(event) => {
                          event.preventDefault()
                          this.props.harvestToken()
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
                  max={Math.round(this.props.patoTokenBalance) / decimals}
                  onChange={this.props.handleChange}
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
                        disabled={this.props.value <= 0}
                        className="slide_from_left"
                        type="submit"
                        onClick={(event) => {
                          event.preventDefault()
                          this.props.depositToken(this.props.value)
                        }}>
                        DEPOSIT
                      </button>
                    </td>
                    <td>
                      <button
                        disabled={this.props.value <= 0}
                        className="slide_from_left"
                        type="submit"
                        onClick={(event) => {
                          event.preventDefault()
                          this.props.withdrawToken(this.props.value)
                        }}>
                        WITHDRAW
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <h4>Wallet Balance: &nbsp;<span>{Math.round(window.web3.utils.fromWei(this.props.patoTokenBalance.toString(), 'Ether') * 100) / 100 + " " + this.props.tokenSymbol.toString()}</span></h4>
          </div>

        )}
        <Footer />
      </div >
    );
  }
}

export default Pool;