'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { FormEvent } from 'react';

export default function Login() {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen w-screen flex justify-center items-center">
      <div className="container">
        <section className="section-pad w-full md:w-2/3 mx-auto">
          <h2 className="page-title text-center">Sign In</h2>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col bg-white lg:w-2/3 mx-auto rounded-xl w-full py-5 px-5 md:py-10 md:px-10 3xl:py-12 3xl:px-12 my-4 md:my-6 shadow-sm drop-shadow-md ">
              <div className="input-container my-4">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className=" w-full py-2 px-3 md:py-3 md:px-4 text-sm md:text-base border-2 border-[#D3D3D3] rounded-md outline-none !bg-transparent"
                  required
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="input-container my-4">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className=" w-full py-2 px-3 md:py-3 md:px-4 text-sm md:text-base border-2 border-[#D3D3D3] rounded-md outline-none !bg-transparent"
                  required
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <Link
                href={'/forget-password'}
                className="font-semibold text-main-dark text-end text-sm md:text-base"
              >
                Forget Password?
              </Link>
              <button
                className="main-btn w-full !rounded-md mt-6 md:mt-8"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
