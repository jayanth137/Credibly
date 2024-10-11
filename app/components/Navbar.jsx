import React from 'react';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import LoginButton from '../components/Wallet/LoginButton';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 shadow-lg mx-40 my-4 p-6 h-[10vh]">
      <Link href="/">
      <div className="flex  justify-between items-center">
        <Image src={logo} width={25} height={25} alt="logo" />

        <h1 className="text-xl font-bold text-white">Credibly</h1>
      </div>
      </Link>

      <div>
        <LoginButton />
      </div>
    </div>
  );
};

export default Navbar;
