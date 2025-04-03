"use client";
import {CloseEyeIcon,EmailIcon,OpenEyeIcon,PasswordIcon} from "@/utils/icons";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import React, { useState, useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const formValues = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(formValues);
  const [error, setError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(true);

    if (formData.email === "" || formData.password === "") {
      setError(true);
    } else if (!emailRegex.test(formData.email)) {
      setError(true);
    } else if (formData.password.length < 6) {
      setError(true);
    } else {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("isLogin", "true");
      setFormData(formValues);
      setError(false);
      alert("Login Successful!");
      router.push("/home");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true") {
      router.push("/home");
    }
  }, [router]);

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="relative w-[360px] mx-auto">
      <Image
        src="/assets/images/webp/vector-top-img.webp"
        alt="top-vector"
        width={360}
        height={367}
        className="absolute z-[-10] -top-14 -left-0 w-[315px] h-[375px] pointer-events-none"
      />
      <Image
        src="/assets/images/webp/vector-bottom-img.webp"
        alt="bottom-vector"
        width={394}
        height={296}
        className="absolute z-[-10] -bottom-0 -right-0 pointer-events-none"
      />
      <div className="w-[360px] px-5 mx-auto pt-[106px] pb-[154px]">
        <Image
          src="/assets/images/webp/login-img.webp"
          alt="login-img"
          width={167.29}
          height={152}
          className="mx-auto pointer-events-none"
        />
        <h3 className="text-[28px] leading-[120%] text-center pt-1">
          Welcome Back!
        </h3>
        <p className="text-sm text-black/70 text-center pt-2">
          Log in to your existence account
        </p>
        <form noValidate className="w-full pt-10" onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50">
                <EmailIcon />
              </span>
              <input type="email" id="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-[0.5px] border-solid border-black/12 rounded py-3 pl-10 pr-3 text-sm leading-[160%] outline-none text-black/50"
              />
            </div>
            {error && formData.email.length === 0 ? ( <p className="text-red-500 text-xs pt-1 pl-2"> Email address is required </p> ) : (
              error &&
              !emailRegex.test(formData.email) && (
                <p className="text-red-500 text-xs pt-1 pl-2">
                  Enter a valid email address
                </p>
              )
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50">
              <PasswordIcon />
            </span>
            <input type={passwordVisible ? "text" : "password"} id="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border-[0.5px] border-solid border-black/12 rounded py-3 pl-10 pr-10 text-sm leading-[160%] outline-none text-black/50" />
            <button type="button"  onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black/50 cursor-pointer" >
              {passwordVisible ? <CloseEyeIcon /> : <OpenEyeIcon />}
            </button>
          </div>
          {error && formData.password.length === 0 ? (
            <p className="text-red-500 text-xs pt-1 pl-2">
              Password is required
            </p>
          ) : (
            error &&
            formData.password.length > 0 &&
            formData.password.length < 6 && (
              <p className="text-red-500 text-xs pt-1 pl-2">
                Password must be at least 6 characters
              </p>
            )
          )}
          <p className="text-xs text-black/70 leading-[170%] pt-3 text-right">
            Forgot password?
          </p>
          <button
            type="submit"
            className="w-full cursor-pointer h-[48px] font-medium text-sm leading-[160%] text-custom-white bg-custom-green rounded hover:bg-transparent border-2 border-transparent hover:border-custom-green hover:text-custom-green transition-all duration-300 mt-10"
          >
            Log In
          </button>
        </form>
        <button type="button" onClick={handleSignUp} className="w-full cursor-pointer h-[48px] font-medium text-sm leading-[160%] text-custom-green bg-transparent border-2 border-custom-green rounded hover:bg-custom-green hover:text-custom-white transition-all duration-300 mt-4">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
