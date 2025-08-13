import "../App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bottom } from "../components/Bottom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import {jwtDecode} from "jwt-decode";
export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
const handleSignin = async () => {
  setLoading(true);
  setError("");

  try {
    const response = await axios.post(`${backendUrl}/api/v1/user/signin`, {
      username: email,
      password,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);

    const decoded = jwtDecode(token);
    const user = {
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.username
    };

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400">
      <div className="flex flex-col justify-center">
        <div className="rounded-2xl bg-white shadow-lg w-80 text-center p-6">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <div className="space-y-4 mt-4">
            <InputBox
              placeholder="xyz@gmail.com"
              label={"Email"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBox
              placeholder="••••••"
              label={"Password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="pt-6">
            <Button
              label={loading ? "Signing in..." : "Sign in"}
              onClick={handleSignin}
              disabled={loading}
            />
          </div>

          <Bottom
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

