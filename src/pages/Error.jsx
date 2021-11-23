import React from "react";
import { useSelector } from "react-redux";
import { selectLogin } from "utils/selectors";

export default function Error(){
    const error = useSelector(selectLogin).error

    return(
        <React.Fragment>
            <main className="main bg-dark error">
                <p>{error}</p>
            </main>
        </React.Fragment>
    )
}