import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const submit = async () => {
    try {
      setStatus("");
      setMsg("");
      document.getElementById("email-error").innerHTML = "";
      document.getElementById("password-error").innerHTML = "";
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email !== "") {
        if (email.match(mailformat)) {
          if (password.length < 8) {
            document.getElementById("password-error").innerHTML =
              "Password must be 8 characters long";
          } else {
            const res = await axios.post("https://dummyjson.com/users/add", {
              email,
              password,
            });
            console.log(res)
            setStatus("Success");
            setMsg("Login Successful");
            setShowModal(true);
            clear();
          }
        } else {
          document.getElementById("email-error").innerHTML = "Invalid Email";
        }
      } else {
        document.getElementById("email-error").innerHTML =
          "Email Can not be empty";
      }
    } catch (error) {
      console.log(error);
      setStatus("Error");
      setMsg("Something Went Wrong");
      setShowModal(true);
      clear();
    }
  };
  const clear = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <div className="container">
      {showModal && (
        <div
          id="error-msg"
          style={
            status === "Error"
              ? { backgroundColor: "#f44336" }
              : { backgroundColor: "rgb(52, 209, 52)" }
          }
        >
          <span
            className="closebtn"
            onClick={() => {
              setShowModal(false);
            }}
          >
            &times;
          </span>
          <strong>{status}!</strong> {msg}
        </div>
      )}

      {/* <div id="success-msg">
        <span
          class="closebtn"
          onclick="this.parentElement.style.display='none';"
          >&times;</span
        >
        <strong>Success!</strong> Login Successfull
      </div> */}
      <h2>
        Moon<span>Tech</span>
      </h2>
      <p class="welcome-text">Welcome Back !</p>
      <div>
        <label class="inputContainer" for="email">
          <input
            id="email"
            class="signInput"
            autoFocus={true}
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
          <i class="fa-solid fa-user signIcon"></i>
          <p id="email-error" class="error-text"></p>
        </label>
      </div>
      <div>
        <label class="inputContainer" for="password">
          <input
            id="password"
            class="signInput"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <i class="signIcon fa-solid fa-lock"></i>
          <p id="password-error" class="error-text"></p>
        </label>
      </div>
      <button class="signupButton" onClick={submit}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
