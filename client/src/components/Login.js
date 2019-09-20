import React, {useState} from "react";
import { axiosWithAuth } from "./axiosWithAuth";


const Login = (props) => {
  const [inputValue, setInputValue] = useState({ username: "", password: "" })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', inputValue)
      .then(res => {
        localStorage.setItem("token", res.data.payload)
        props.history.push('/bubbles')})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={inputValue.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={inputValue.password}
          onChange={handleChange}
        />
        <button>Log In!</button>
      </form>
    </>
  );
};

export default Login;
