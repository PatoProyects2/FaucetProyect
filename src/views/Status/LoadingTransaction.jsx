import React, { Component } from 'react'
import { Spinner } from 'reactstrap'

class LoadingTransaction extends Component {

  render() {
    return ( 
      <div>
        <article>
          <h1>Metamask</h1>
          <div class="loader">
            <div class="spinner">
              <Spinner class="circle"/>
            </div>
          </div>
        </article>
      </div>
    ); 
  }
}

export default LoadingTransaction;