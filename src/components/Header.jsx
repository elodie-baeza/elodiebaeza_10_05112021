import React from "react"
import logo from 'assets/argentBankLogo.png'

export default function Header(){
    return(
        <React.Fragment>
            <nav class="main-nav">
                <a class="main-nav-logo" href="./">
                    <img
                    class="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                    />
                    <h1 class="sr-only">Argent Bank</h1>
                </a>
                <div>
                    <a class="main-nav-item" href="./login">
                        <i class="fa fa-user-circle"></i>
                        Sign In
                    </a>
                    <a class="main-nav-item" href="./">
                        <i class="fa fa-sign-out"></i>
                        Sign Out
                    </a>
                </div>
            </nav>
        </React.Fragment>
    )
}