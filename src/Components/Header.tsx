import React from "react";
import {useHref} from "react-router-dom";
export default function Header(){
    return(
<header className="header">
    <div className="blockfunc">

        <div className="web22">
            Web22
        </div>
        <div className="label" onClick={() => window.location.href = `/`}>Accounts</div>
        <div className="label" onClick={() => window.location.href = `/aboutus`}>About Us</div>
    </div>
</header>
    )
}
