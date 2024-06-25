'use client';
import { Loader } from '@/app/_components';
import { useResetMyPasswordMutation } from '@/app/_redux/apiService/mainApi';
import { displaySuccess } from '@/app/_utils/functions';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useMemo } from 'react';

export default function ForgetPassword() {
  const router = useRouter();

  const [
    resetPass,
    { error: resetError, isLoading: reseting, isSuccess: reseted },
  ] = useResetMyPasswordMutation();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPass({ email: e.currentTarget.email.value });
  };

  useMemo(() => {
    if (reseted) {
      displaySuccess('Check your email to reset the password!');
      router.push('/login');
    }
  }, [reseted]);

  if (reseting) return <Loader />;

  return (
    <main className="min-h-screen w-screen flex justify-center items-center">
      <div className="container">
        <section className="section-pad w-full md:w-2/3 mx-auto">
          <h2 className="page-title text-center">Forget password</h2>
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

              <button
                className="main-btn w-full !rounded-md mt-6 md:mt-8"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
