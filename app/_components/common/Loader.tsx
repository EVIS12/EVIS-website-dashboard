import React from 'react';
import { BeatLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <BeatLoader color="#2EBDB9" size={20} />
    </div>
  );
}
