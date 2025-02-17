import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const [credentials, setCredentials] = useState({email: " ",password: " "});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the authtoken and redirect
      localStorage.setItem("token", json.authToken)
      props.showAlert("Logged in Sucessfully", "success")
      navigate("/");
    }
    else{
      props.showAlert("Invalid credentials", "danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className = "mt-3">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
