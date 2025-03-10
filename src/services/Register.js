import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    try {
      await axios.post("http://localhost:4000/send-code", { email });
      setStep(2);
    } catch (error) {
      console.error("Failed to send verification code", error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post("http://localhost:4000/verify-code", { email, code });
      if (res.data.message === "Verification successful") {
        handleRegister();
      }
    } catch (error) {
      console.error("Invalid verification code");
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", { email, password });
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Register</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleSendCode}>Send Verification Code</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Enter Verification Code</h2>
          <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
          <button onClick={handleVerifyCode}>Verify & Register</button>
        </div>
      )}
    </div>
  );
};

export default Register;
