import { useState } from "react";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const passwordValidation = (val) => {
    if (val === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    setPassword(val);
  };

  const regExEmail = (val) => {
    var res = val.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return res;
  };

  const emailValidation = (val) => {
    if (val === "") {
      setEmailError(true);
    }
    if (regExEmail(val) === null) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(val);
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-12 justify-content-center">
          <div className="card">
            <div className="form-group justify-content-center mt-5 mb-5">
              <div className="row justify-content-center">
                <div className="col-md-6 col-6">
                  <h2>Yoga App</h2>

                  <label>Email: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    onChange={(e) => {
                      emailValidation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6 col-6">
                  <label>Password: </label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6 col-6">
                  <label>Confirm Password: </label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                  />{" "}
                </div>
              </div>{" "}
              <div className="row justify-content-center">
                <div className="col-md-6 col-6">
                  <label>Name: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                  />{" "}
                </div>
              </div>{" "}
              <div className="row justify-content-center">
                <div className="col-md-6 col-6">
                  <label>Age: </label>
                  <input className="form-control" type="text" name="age" />
                </div>
              </div>{" "}
              <div className="row justify-content-center mt-4">
                <div className="col-md-6 col-6">
                  {" "}
                  <select className="form-select" defaultValue={1}>
                    <option value={1}>6:00 AM - 7:00 AM</option>
                    <option value={2}>7:00 AM - 8:00 AM</option>
                    <option value={3}>8:00 AM - 9:00 AM</option>
                    <option value={4}>5:00 PM - 6:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
