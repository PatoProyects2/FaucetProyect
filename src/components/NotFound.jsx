import React from 'react'
import { useParams } from "react-router-dom";

function NotFound() {
  let { notFound } = useParams();
  return <div>
    <h2 class="titles">404 ERROR</h2>
    <article>
      <div class="boxModal">
        <h3>PAGE NOT FOUND</h3>
        <p>{notFound}</p>
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
}


export default NotFound;
