import axios from "axios";
import { useState } from "react";

export default function FormInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <p className="my-4 user-select-none">
        <span role="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login to your account" : "Create a new account"}
        </span>
      </p>
    </form>
  );
}
