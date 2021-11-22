import React from "react"
import logo from 'assets/argentBankLogo.png'
import { useSelector } from "react-redux"
import { selectLogin, selectProfile } from "utils/selectors"

export default function Header(){
    const login = useSelector(selectLogin)
    const profile = useSelector(selectProfile)

    return(
        <React.Fragment>
            <nav className="main-nav">
                <a className="main-nav-logo" href="./">
                    <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    {login.isConnected ? 
                        <a className="main-nav-item" href="./profile">
                            <i className="fa fa-user-circle"></i>
                            {profile.data.firstName} 
                        </a> :
                        <a className="main-nav-item" href="./login">
                            <i className="fa fa-user-circle"></i>
                            Sign In 
                        </a>
                    }
                    {login.isConnected === true &&
                        <a className="main-nav-item" href="./">
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </a>
                    }
                </div>
            </nav>
        </React.Fragment>
    )
}