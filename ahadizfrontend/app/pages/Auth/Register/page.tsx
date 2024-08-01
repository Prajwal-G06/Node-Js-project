"use client";

import React, { useState } from "react";
import InputBox from "@/components/InputBox/page";
import { Button, Card, CardContent, Link } from "@mui/material";
import {
  AccountCircleSharp,
  EmailSharp,
  LockSharp,
  VerifiedSharp,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";

function RegistrationForm() {
  const router = useRouter();
  const initialFormData = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // repeatPassword: "",
  });
  const [error, setError] = useState("");

  const handleLoginAccount = () => {
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field === "")) {
      setError("Please fill in all required fields.");
    } else {
      setError("");
      try {
        const response = await axios.post(
          "http://localhost:3001/users",
          formData
        );

        if (response.status == 201) {
          console.log("Registering with:", formData);
          alert("Registered Successfully");
          setFormData(initialFormData);
          const ask = confirm("do you want to login now");
          if (ask) {
            router.push("/");
          }
        }
      } catch (err) {
        alert("Some problem in registration");
      }

      // Perform registration logic here
    }
  };

  return (
    <div className="h-screen w-screen overflow-scroll flex items-center justify-center">
      <Card sx={{ minWidth: 500 }}>
        <CardContent className="flex flex-col items-center justify-center">
          <h1>Register</h1>
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center justify-center"
          >
            <InputBox
              icon={VerifiedSharp}
              required
              label="Username"
              name="userName"
              onChange={handleChange}
              value={formData.userName} // Add this line
            />
            <InputBox
              icon={AccountCircleSharp}
              required
              label="First Name"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
            />
            <InputBox
              icon={AccountCircleSharp}
              required
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
            <InputBox
              icon={EmailSharp}
              required
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <InputBox
              icon={LockSharp}
              required
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            {/* <InputBox
              icon={LockSharp}
              required
              label="Repeat Password"
              type="password"
              name="repeatPassword"
              onChange={handleChange}
            /> */}

            {error && <p className="text-red-500">{error}</p>}

            <Button
              type="submit"
              variant="contained"
              color="success"
              className="last:mt-5"
            >
              Register
            </Button>
          </form>

          <p>
            Already have account &nbsp;
            <Link
              component="button"
              variant="body2"
              onClick={handleLoginAccount}
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegistrationForm;
