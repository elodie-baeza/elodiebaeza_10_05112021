import AccountCard from "components/AccountCard";
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
                <AccountCard title='Argent Bank Checking (x8349)' amount='$2,082.79' amountDescription='Available Balance' />
                <AccountCard title='Argent Bank Savings (x6712)' amount='$10,928.42' amountDescription='Available Balance' />
                <AccountCard title='Argent Bank Credit Card (x8349)' amount='$184.30' amountDescription='Current Balance' />
            </main>
        </React.Fragment>
  );
}
