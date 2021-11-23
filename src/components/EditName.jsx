import { Field, Form } from "react-final-form";
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { selectProfile } from "utils/selectors";
import { useDispatch } from "react-redux";
import { updateUserName } from "features/profile";

export default function EditName(){
    const [display, setDisplay] = useState()
    const dispatch = useDispatch()
    const profileData = useSelector(selectProfile).data

    const formData = {}

    const handleClick = () => {
        setDisplay(!display)
    }

    const onSubmit = (values) => {
        dispatch(updateUserName(values))
            .then(() => {
                setDisplay(!display)
            })
            .catch(error => {
                console.log(error) 
            })
    }
  

    return(
        <React.Fragment>
            {!display ? (
                <button className="edit-button" onClick={handleClick}>Edit Name</button>
            ) : (
                <Form 
                    onSubmit={onSubmit}
                    initialValues={formData}

                    // validate function : valid the fields before sending
                    validate={(values) => {
                        const errors = {};
                        if (!values.firstName) {
                        errors.firstName = "Required";
                        }
                        if (!values.lastName) {
                        errors.lastName = "Required";
                        }
                        return errors;    
                    }}

                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className='editNameForm'>
                            <div className="input-wrapper">
                                <Field 
                                name='firstName' 
                                type="text" 
                                id="firstName" 
                                component='input' 
                                placeholder={profileData.firstName}
                                />
                                <Field 
                                name='lastName' 
                                type="text" 
                                id="lastName" 
                                component='input'
                                placeholder={profileData.lastName}
                                />
                            </div>
                            <button 
                                className="edit-button" 
                                type='submit'>
                                Save
                            </button>
                            <button 
                                className="edit-button" 
                                type='button' 
                                onClick={handleClick}>
                                Cancel
                            </button>
                        </form>
                    )}
                />
            )}
        </React.Fragment>
    )
}