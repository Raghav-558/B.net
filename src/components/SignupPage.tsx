"use client";
import React, { useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignInPage = () => {
  const formValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [formDatas, setFormDatas] = useState(formValue);
  const [error, setError] = useState(false);
  const router = useRouter();
  const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(true);

    if (
      formDatas.firstName === "" ||
      formDatas.lastName === "" ||
      formDatas.email === "" ||
      formDatas.password === ""
    ) {
      setError(true);
    } else if (!emailRegex.test(formDatas.email)) {
      setError(true);
    } else if (formDatas.password.length < 6) {
      setError(true);
    } else {
      localStorage.setItem("user", JSON.stringify(formDatas));
      localStorage.setItem("isLoggedIn", "true");
      alert("Sign In Successful!");
      setFormDatas(formValue);
      setError(false);
      router.push("/login");
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="relative w-[360px] mx-auto min-h-sceen">
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
        <h3 className="text-[28px] leading-[120%] text-center pt-1">
          Create an Account!
        </h3>
        <p className="text-sm text-black/70 text-center pt-2">
          Please sign in to continue
        </p>
        <form noValidate className="w-full pt-10" onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input onChange={(e) => setFormDatas({ ...formDatas, firstName: e.target.value })}
              type="text"
              id="firstName"
              placeholder="First Name"
              className="w-full border-[0.5px] border-solid border-black/12 rounded py-3 px-3 text-sm leading-[160%] outline-none text-black/50"
            />
            {error && formDatas.firstName === "" && (
              <p className="text-red-500 text-xs pt-1 pl-2">
                First name is required
              </p>
            )}
          </div>
          <div className="relative mb-4">
            <input onChange={(e) => setFormDatas({ ...formDatas, lastName: e.target.value })}
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="w-full border-[0.5px] border-solid border-black/12 rounded py-3 px-3 text-sm leading-[160%] outline-none text-black/50"
            />
            {error && formDatas.lastName === "" && (
              <p className="text-red-500 text-xs pt-1 pl-2">
                Last name is required
              </p>
            )}
          </div>
          <div className="relative mb-4">
            <input onChange={(e) => setFormDatas({ ...formDatas, email: e.target.value })}
              type="email"
              id="email"
              placeholder="Email"
              className="w-full border-[0.5px] border-solid border-black/12 rounded py-3 px-3 text-sm leading-[160%] outline-none text-black/50"
            />
            {error && formDatas.email.length === 0 ? (
              <p className="text-red-500 text-xs pt-1 pl-2">
                Email address is required
              </p>
            ) : (
              error &&
              !emailRegex.test(formDatas.email) && (
                <p className="text-red-500 text-xs pt-1 pl-2">
                  Enter a valid email address
                </p>
              )
            )}
          </div>
          <div className="relative mb-4">
            <input onChange={(e) => setFormDatas({ ...formDatas, password: e.target.value }) }
              type="password"
              id="password"
              placeholder="Password"
              className="w-full border-[0.5px] border-solid border-black/12 rounded py-3 px-3 text-sm leading-[160%] outline-none text-black/50"
            />
            {error && formDatas.password.length === 0 ? (
              <p className="text-red-500 text-xs pt-1 pl-2">
                Password is required
              </p>
            ) : (
              error &&
              formDatas.password.length > 0 &&
              formDatas.password.length < 6 && (
                <p className="text-red-500 text-xs pt-1 pl-2">
                  Password must be at least 6 characters
                </p>
              )
            )}
          </div>
          <button type="submit" className="w-full cursor-pointer h-[48px] font-medium text-sm leading-[160%] text-custom-white bg-custom-green rounded hover:bg-black hover:text-custom-green transition-all duration-300 mt-10"
          >
            Sign In
          </button>
        </form>
        <button type="button" onClick={handleLoginClick} className="w-full cursor-pointer h-[48px] font-medium text-sm leading-[160%] text-custom-green bg-transparent border-2 border-custom-green rounded hover:bg-custom-green hover:text-custom-white transition-all duration-300 mt-4" >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
