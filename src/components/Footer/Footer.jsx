import React, { Component } from 'react'

import Twitch from '../../images/Social/twitch_logo.png'
import Telegram from '../../images/Social/telegram_logo.png'
import Discord from '../../images/Social/discord_logo.png'
import Twitter from '../../images/Social/twitter_logo.png'
import YouTube from '../../images/Social/tube_logo.png'
import Instagram from '../../images/Social/instagram.png'

class Footer extends Component {

  render() {
    return (
      <footer>
        <div id="about">
          <a href="https://poocoin.app/tokens/0x63197d1294c659ddf64811a08428cf8637e55aeb" target="_blank" rel="noopener noreferrer">Chart</a>
          <a href="https://github.com/LeandroCDN/FaucetProyect" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://leandrodenos.gitbook.io/pato-verde-projects/faucet-project/detalles/" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="https://medium.com/" target="_blank" rel="noopener noreferrer">Blog</a>
        </div>
        <div id="social">
          <a href="https://www.youtube.com/channel/UCoxr0mC9BpLIpajYDepgnFQ/featured" target="_blank" rel="noopener noreferrer">
            <img src={YouTube} width="30" height="30" className="d-inline-block align-top" alt="" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={Instagram} width="25" height="25" className="d-inline-block align-top" alt="" />
          </a>
          <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">
            <img src={Telegram} width="25" height="25" className="d-inline-block align-top" alt="" />
          </a>
          <a href="https://twitter.com/PatoProjects" target="_blank" rel="noopener noreferrer">
            <img src={Twitter} width="25" height="25" className="d-inline-block align-top" alt="" />
          </a>
          <a href="https://discord.gg/whfCeyXQ" target="_blank" rel="noopener noreferrer">
            <img src={Discord} width="25" height="25" className="d-inline-block align-top" alt="" />
          </a>
          <a href="https://www.twitch.tv/patoverde_pv" target="_blank" rel="noopener noreferrer">
            <img src={Twitch} width="25" height="25" className="d-inline-block align-top" alt="" />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
