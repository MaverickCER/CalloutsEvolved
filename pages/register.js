import Head from "next/head";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const photoUrlRef = useRef();
  const router = useRouter();

  const { register, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current.value === "") {
      return setError("Please insert email");
    } else if (passwordRef.current.value === "") {
      return setError("Please insert password");
    }
    if (usernameRef.current.value === "") {
      return setError("Please insert a username");
    } else if (photoUrlRef.current.value === "") {
      return setError("Please upload a photo");
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("password do not match");
    }

    try {
      setError("");
      setLoading(true);
      const res = await register(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value,
        photoUrlRef.current.value
      );
      if (res) {
        router.push("/session");
      }
    } catch (error) {
      alert(error.message);

      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("Wrong password");
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        setError("User not found");
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("invalid email");
      } else if (error.message === "Firebase: Error (auth/internal-error).") {
        setError("internal error");
      } else if (
        error.message === "Firebase: Error (auth/email-already-exists)."
      ) {
        setError("email already exists. Please try a different email address");
      } else {
        setError("Failed to create an account");
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Callouts Evolved | Register</title>
        <meta
          name="description"
          content="Join groups focused on efficiently completing any video game activity."
        />
      </Head>
      <h1>Register</h1>
      {currentUser && currentUser.email}
      {error && (
        <div style={{ padding: "5px", background: "rgba(255,0,0,0.2)" }}>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Username</label>
          </div>
          <input type="text" required ref={usernameRef} />
        </div>
        <div>
          <div>
            <label>Email</label>
          </div>
          <input type="email" required ref={emailRef} />
        </div>
        <div>
          <div>
            <label>password</label>
          </div>
          <input type="password" required ref={passwordRef} />
        </div>
        <div>
          <div>
            <label>confirm password</label>
          </div>
          <input type="password" required ref={confirmPasswordRef} />
        </div>
        <div>
          <div>
            <label>photoURL</label>
          </div>
          <input type="text" ref={photoUrlRef} />
        </div>
        <button disabled={loading} type="submit">
          register
        </button>
      </form>
      <div>
        <Link href="/login">
          <a>Go to Login</a>
        </Link>
      </div>
    </div>
  );
};

export default Register;
