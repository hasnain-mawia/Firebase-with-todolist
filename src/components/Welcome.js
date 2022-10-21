 import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import { TextField , Box, Button } from "@mui/material";


export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="welcome">
      <div className="login-register-container">
        {isRegistering ? (
          <Box>
          <Box sx={{mt:5}}>
            <TextField
              type="email"
              style={{width:300}}
              label="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value
                })
              }
            />
            </Box>
            <Box sx ={{mt:2}}>
            <TextField
              type="email"
              label="Confirm Email"
              style={{width:300}}
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value
                })
              }
            />
            </Box>
            
            <Box sx={{mt:2}}>
            <TextField
              type="password"
              label="Password"
              style={{width:300}}
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value
                })
              }
            />
            </Box>
            
            <Box sx={{mt:2}}>
            <TextField
              type="password"
              style={{width:300}}
              label="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value
                })
              }
            />
            </Box>
            
            <Button  sx={{mt:3}} variant="contained" onClick={handleRegister}>Register</Button>
            <Button sx={{mt:3}} onClick={() => setIsRegistering(false)}>Go back</Button>
          </Box>
        ) : (
          <>
            <TextField  style={{width:300}} type="email" label="Email" onChange={handleEmailChange} value={email} />
            <TextField sx={{mt:3}}
              type="password"
              style={{width:300}}
              onChange={handlePasswordChange}
              value={password}
              label="Password"
            />
            <Button  sx={{mt:2}} variant="contained"  onClick={handleSignIn}>
              Sign In
            </Button>
            <Button
              className="create-account-button"
              onClick={() => setIsRegistering(true)}
            >
              Create an account
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
