"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "./AuthContext/page";
import Home from "./pages/Home/page";

export default function App() {
  return (
    <AuthProvider>
      <div style={{ marginTop: "10px" }}>
        <Home />
      </div>
    </AuthProvider>
  );
}
