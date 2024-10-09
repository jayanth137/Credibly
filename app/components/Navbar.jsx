import React from 'react';
import Image from 'next/image';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 shadow-lg mx-40 my-4 p-6">
      <div className="flex  items-center">
        <Image src={logo} width={25} height={25} alt="logo" />

        <h1 className="text-xl font-bold text-white">Credibly</h1>
      </div>
    </div>
  );
};

export default Navbar;
