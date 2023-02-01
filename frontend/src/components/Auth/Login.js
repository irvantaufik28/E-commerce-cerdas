import React from "react";

const Login = () => {
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="coloumn is-centered">
            <div className="column is-4">
              <form className="box">
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input type="text" className="input" placeholder="Email" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input type="text" className="input" placeholder="******" />
                  </div>
                </div>
                <div className="field">
                    <button className="button is-success is-fullwidth">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
