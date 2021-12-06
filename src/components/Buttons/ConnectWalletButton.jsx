import React from 'react'
import { useWeb3React } from "@web3-react/core"

import { injected } from "../Blockchain/Connectors"

export default function ConnectWalletButton() {
  const { active, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
        console.log(ex)
      }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
        console.log(ex)
      }  
  }

  return (
    <div>
      {active ? <button type="submit" class="btn1" onClick={disconnect}>DISCONNECT</button> : <button type="submit" class="btn1" onClick={connect}>CONNECT WALLET</button>}
    </div>
  )
}
