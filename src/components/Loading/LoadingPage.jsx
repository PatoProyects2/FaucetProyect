import React, { Component } from 'react'
import { Spinner } from 'reactstrap'

import './Loading.css'

class LoadingPage extends Component {

  render() {
    return ( 
      <div>
        <article>
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

export default LoadingPage;