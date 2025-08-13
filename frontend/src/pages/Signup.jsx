import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Bottom } from "../components/Bottom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white shadow-lg w-80 text-center p-6">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />

          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="xyz@gmail.com"
            label={"Email"}
            type="email"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            label={"Password"}
            type="password"
          />

          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${backendUrl}/api/v1/user/signup`,
                    {
                      username,
                      firstName,
                      lastName,
                      password,
                    }
                  );
                  console.log("Backend URL:", backendUrl);
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      firstName,
                      lastName,
                      username,
                    })
                  );
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Signup failed:", error);
                }
              }}
            />
          </div>

          <Bottom
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

