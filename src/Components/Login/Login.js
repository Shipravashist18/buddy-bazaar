import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Logo from "../../BuddyBazaar.jpg";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]=useState(false)
  const history = useHistory()
 const handleSubmit = async (e) => {

  e.preventDefault();

  setLoading(true);

  try {

    const response = await axios.post(

      "http://localhost:5000/api/auth/login",

      {
        email,
        password
      }

    );

    // save token

    localStorage.setItem("token", response.data.token);

    // save user

    localStorage.setItem(

      "user",

      JSON.stringify(response.data.user)

    );

    alert("Login successful");

    history.push("/");

  } catch (error) {

    alert(error.response.data.message);

  }

  setLoading(false);

};
  return (<>
    {loading && <RoundLoading/> }
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            placeholder="user@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div> 
    </div>
    </>
  );
}

export default Login;
