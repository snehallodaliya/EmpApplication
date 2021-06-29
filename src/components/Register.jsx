import React, { Fragment } from "react";
import { useAuth } from "../lib/auth";
import { useForm } from "../hooks/useForm";
import { Login } from "./Login";

export function Register() {
  const { register } = useAuth();
  const { values, onChange } = useForm({});
  const [error, setError] = React.useState(null);

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="container-fluid">
          {/* <!-- sign up page start--> */}
          <div className="authentication-main">
            <div className="row">
              <div className="col-sm-12 p-0">
                <div className="auth-innerright">
                  <div className="authentication-box">
                    <div className="text-center">
                      <img src="" alt="" />
                    </div>
                    <div className="card mt-4 p-4">
                      <h4 className="text-center">{"NEW USER"}</h4>
                      <h6 className="text-center">
                        {"Enter your Username and Password For Signup"}
                      </h6>
                      <form
                        className="theme-form"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            await register(values);
                          } catch (err) {
                            console.log("error");
                            setError(err);
                          }
                        }}
                      >
                        <div className="form-row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="col-form-label">Name</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="John"
                                name="name"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="col-form-label">email</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Deo"
                                name="email"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">username</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="John Deo"
                            name="username"
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Password</label>
                          <input
                            className="form-control"
                            type="password"
                            placeholder="**********"
                            name="password"
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">mobileno</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="John Deo"
                            name="mobileno"
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">role</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="John Deo"
                            name="role"
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-row">
                          <div className="col-sm-4">
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              SignUp
                            </button>
                          </div>
                          <div className="col-sm-8">
                            <div className="text-left mt-2 m-l-20">
                              {"Are you already user?"}  
                              {/* <Login/> */}
                            </div>
                          </div>
                        </div>
                        <div className="form-divider"></div>
                        <div className="social mt-3">
                          <div className="form-group btn-showcase d-flex">
                            <button className="btn social-btn btn-fb d-inline-block">
                              {" "}
                              <i className="fa fa-facebook"></i>
                            </button>
                            <button className="btn social-btn btn-twitter d-inline-block">
                              <i className="fa fa-google"></i>
                            </button>
                            <button className="btn social-btn btn-google d-inline-block">
                              <i className="fa fa-twitter"></i>
                            </button>
                            <button className="btn social-btn btn-github d-inline-block">
                              <i className="fa fa-github"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {error && (
                      <div style={{ color: "tomato" }}>
                        {JSON.stringify(error, null, 2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- sign up page ends--> */}
        </div>
      </div>
    </Fragment>
  );
}
