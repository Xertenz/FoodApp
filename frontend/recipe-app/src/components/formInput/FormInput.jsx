import axios from "axios";
import { useState } from "react";

export default function FormInput() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endPoint = isSignUp ? "register" : "signin";

    await axios
      .post(`http://127.0.0.1:3000/users/${endPoint}`, { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
				setSuccess(response.data.message)
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.error);
				setSuccess("")
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label
          htmlFor="exampleInputEmail1"
          className="form-label"
          role="button"
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control rounded-0"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="exampleInputPassword1"
          className="form-label"
          role="button"
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control rounded-0"
          id="exampleInputPassword1"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-submit w-100 rounded-0"
      >
        {isSignUp ? "Sign up" : "Login"}
      </button>
			{(error != "") && <p className="text-danger">{error}</p>}
			{(success != "") && <p className="text-success">{success}</p>}
      <p className="my-4 user-select-none">
        <span role="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login to your account" : "Create a new account"}
        </span>
      </p>
    </form>
  );
}
