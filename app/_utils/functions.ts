import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { signOut } from 'next-auth/react';
import Swal from 'sweetalert2';

export const displayError = (error: SerializedError | FetchBaseQueryError) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    html:
      error?.originalStatus >= 499
        ? 'There is an error in the server'
        : error.status < 500 && error.status === 401
        ? `<p>Please login again.</p>`
        : `<ul>${Object.entries(error?.data).map(
            ([key, value]) => `<li>${key}: ${value[0]}</li>`
          )}<ul>`,
  });
  console.log({ error });
  if (error.status === 401) {
    signOut();
  }
};

export const displaySuccess = (text: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Successed',
    text,
  });
};
