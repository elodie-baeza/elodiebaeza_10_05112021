import { submitForm } from "features/login";
import React from "react"
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Login(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const formData = {}
  
  const onSubmit = (values) => {
      dispatch(submitForm(values))
        .then(() => {
            navigate('/profile')
        })
        .catch(error => {
            navigate('/error')
            console.log(error) 
        })
  }
  
  return (
    <React.Fragment>
      <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <Form 
              onSubmit={onSubmit}
              initialValues={formData}
              // validate function : valid the fields before sending
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
