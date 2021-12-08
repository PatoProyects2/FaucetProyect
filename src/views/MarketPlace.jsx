import React from 'react'
import {
    useLocation,
    useHistory
} from "react-router-dom";

function MarketPlace() {
    let { search } = useLocation();
    let query = new URLSearchParams(search);

    const LIMIT = 20;

    let start = parseInt(query.get("inicio")) || 1;
    let end = parseInt(query.get("fin")) || LIMIT;

    let history = useHistory();
    const handlePrev = (e) => {
        history.push({ search: `?inicio=${start - LIMIT}&fin=${end - LIMIT}` });
    };
    const handleNext = (e) => {
        history.push({ search: `?inicio=${start + LIMIT}&fin=${end + LIMIT}` });
    };

    return <div className="page">
        <article>
            <h1>NFT Marketplace</h1>
            <p>Mostrando NFT del <b>{start}</b> al <b>{end}</b></p>
            {start > LIMIT && <button onClick={handlePrev}>Back</button>}
            <button onClick={handleNext}>Next</button>
        </article>
    </div>
}


export default MarketPlace;
