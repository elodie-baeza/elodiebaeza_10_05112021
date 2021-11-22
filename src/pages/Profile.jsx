import EditName from "components/EditName";
import { fetchOrUpdateProfile } from "features/profile";
import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectLogin, selectProfile } from "utils/selectors";

export default function Profile() {
    const dispatch = useDispatch()

    const token = useSelector(selectLogin).data.token

    const user = useSelector(selectProfile).data
    
    useEffect(() => {
        dispatch(fetchOrUpdateProfile(token))
        .catch((error) => {
            console.log('error')
        })
    },[dispatch, token])

    return (
        <React.Fragment>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
                    <EditName />
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
        </React.Fragment>
  );
}
