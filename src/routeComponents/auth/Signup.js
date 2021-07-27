import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";

function Signup(props) {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    profilePictureUrl: "",
    country: "",
    city: "",
  });
  const [errors, setErrors] = useState(null);

  function handleChange(event) {
    if(event.target.files){
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleFileUpload(file) {
    const uploadData = new FormData();

    uploadData.append("profilePictureUrl", file);

    const response = await api.post("/upload", uploadData);
  
    return response.data.url;
  }


  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);
      const profilePicture = await handleFileUpload(state.profilePictureUrl)
      setErrors(null);
      props.history.push("/auth/login");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup!</h1>

      <div>
        <label htmlFor="signupFormName">Name</label>
        <input
          type="text"
          name="name"
          id="signupFormName"
          value={state.name}
          error={errors.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="signupFormEmail">E-mail Address</label>
        <input
          type="email"
          name="email"
          id="signupFormEmail"
          value={state.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="signupFormPassword">Password</label>
        <input
          type="password"
          name="password"
          id="signupFormPassword"
          value={state.password}
          error={errors.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <button type="submit">Signup!</button>

        <Link to="/auth/login">
          Already have an account? Click here to login.
        </Link>
      </div>
    </form>
  );
}

export default Signup;
