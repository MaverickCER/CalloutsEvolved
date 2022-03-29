import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const DisplayData = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState(currentUser);

  const router = useRouter();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      setError("Failed to Logout");
      console.error(error.message);
    }
  };

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  return (
    <div>
      {error && (
        <div style={{ padding: "5px", background: "rgba(255,0,0,0.2)" }}>
          <p>{error}</p>
        </div>
      )}
      <h4>Profile</h4>
      <p>
        <strong> displayName :</strong> {user && user.displayName}
      </p>
      <p>
        <strong> Email :</strong> {user && user.email}
      </p>
      <p>
        <strong> photoURL :</strong> {user && user.photoURL}
      </p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default DisplayData;
