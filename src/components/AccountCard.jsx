import React from 'react'

export default function AccountCard(props){

    return(
        <React.Fragment>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">{props.title}</h3>
                <p className="account-amount">{props.amount}</p>
                <p className="account-amount-description">{props.amountDescription}</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </React.Fragment>
    )
}