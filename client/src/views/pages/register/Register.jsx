import { Link } from "react-router-dom";
import "./register.scss";
import { useRef, useState } from 'react';
import {makeRequest} from "../../../axiosClient";
import axios from "axios";

const Register = () => {


  const [input, setInput] = useState({
    username: "",
    email: "",
    name: "",
    password: ""
  })

  const [err, setErr] = useState(null);
  const [data, setData] = useState({})

  const usernameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  const handleChange = (e) => {
    // setInput(pre => ({...pre, [e.target.name]: e.target.value}))
    
    
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    console.log(payload);

    try{
      await makeRequest.post('auth/register', payload)
    }
    catch(e){
      console.log(e);
      setErr(e.response.data);
    }}

    console.log(err);
  
  // axiosClient.post('auth/register', payload)
  // .then(({data}) => {
  //   setData({data})
  //   console.log({data})
  // })
  // .catch(error => {
  //   console.log(error)
  //   setErr(error.response.data)
  // })}


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Facebook Test.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          
          <form onSubmit={onSubmit}>
          {err && err}
            <input type="text" ref={usernameRef} placeholder="Username" name="username" onChange={handleChange}/>
            <input type="email" ref={emailRef} placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" ref={passwordRef} placeholder="Password" name="password" onChange={handleChange}/>
            <input type="text" ref={nameRef} placeholder="Name" name="name" onChange={handleChange}/>
            <button>Register</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
