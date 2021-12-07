import React, { Component } from 'react'

class NotFound extends Component {

  render() {
    return (
      <div>
        <h2 class="titles">404 ERROR</h2>
        <article>
          <div class="boxModal">
            <h3>PAGE NOT FOUND</h3>
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

export default NotFound;
