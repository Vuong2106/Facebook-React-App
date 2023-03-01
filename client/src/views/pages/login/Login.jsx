import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import "./login.scss";
// import axiosClient from './../../../axiosClient';

const Login = () => {

  const [input, setInput] = useState({
    username: "",
    password: ""
  })

  const [err, setErr] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput((pre) => ({...pre, [e.target.name]: e.target.value}))
  }
  const { login, currentUser } = useContext(AuthContext);
  if(currentUser) return <Navigate to={'/'}/>

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      navigate('/')
    }
    catch (err) {
      console.log('err')
      setErr(err.response)
    }
  };
 

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
