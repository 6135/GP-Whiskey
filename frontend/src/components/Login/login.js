import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentRole, login_api } from "../../services/AuthService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [validPass, setValidPass] = useState(false);
  const [message, setMessage] = useState("");
  //to check if the employees password meets certain criterias
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  //state to store the outcome of our regex test

  // useEffect(() => {
  //   // check if the password is valid
  //   setValidPass(PWD_REGEX.test(password));
  // }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      const { success, err } = await login_api(email, password);
      if (success === "") {
        setMessage(err);
      }
      else {
        setMessage("");
        navigate("/");
      }
    }
    else {
      setMessage("Preencha todos os campos!");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "auto",
        marginTop: "200px",
        boxShadow: "5px 5px 20px #cccccccc",
        padding: "1em",
      }}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            autoFocus
            type="text"
            className="form-control"
            id="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
        <div style={{ margin: "1em", color: "red" }}>{message}</div>
      </form>
    </div>
  );
}

export default LoginPage;
