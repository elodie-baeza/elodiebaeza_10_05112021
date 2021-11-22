import apiProvider from "data/apiProvider";
import React, { useEffect, useState } from "react"
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router";

export default function Profile({token, updateToken}) {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const onSubmit = (values) => {
        setFormData(values)
    }

    useEffect(() => {
        apiProvider.login(formData)
            .then((response) => {
                updateToken(response.data.body.token)
                navigate('/profile')
                console.log(token)
            })
            .catch(error => {
                console.log(error)
                throw error
            })
      },[formData, navigate, token, updateToken])

    return (
        <React.Fragment>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <Form 
                    onSubmit={onSubmit}
                    initialValues={formData}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                        errors.email = "Required";
                        }
                        if (!values.password) {
                        errors.password = "Required";
                        }
                        return errors;    
                    }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="input-wrapper">
                                <Field name="email">
                                  {({ input, meta }) => (
                                    <div>
                                      <label htmlFor="username">Username</label>
                                      <input {...input} type="text" id='username' />
                                      {(meta.error || meta.submitError) && meta.touched && (
                                        <span>{meta.error || meta.submitError}</span>
                                      )}
                                    </div>
                                  )}
                                </Field>
                            </div>
                            <div className="input-wrapper">
                                <Field name="password">
                                  {({ input, meta }) => (
                                    <div>
                                      <label htmlFor="username">Password</label>
                                      <input {...input} type="password" id='password' />
                                      {(meta.error || meta.submitError) && meta.touched && (
                                        <span>{meta.error || meta.submitError}</span>
                                      )}
                                    </div>
                                  )}
                                </Field>
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="rememberMe">Remember-me</label>
                                <Field 
                                name="rememberMe" 
                                type="checkbox" 
                                component='input'
                                />
                            </div>
                            <button 
                            className="sign-in-button" 
                            type='submit' 
                            disabled={submitting}>Sign In</button>
                        </form>
                    )}
                    />
                </section>
            </main>                    
        </React.Fragment>
    );
}