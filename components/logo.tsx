'use client'
import React from 'react'
import { Crown } from 'lucide-react'
import logo from '../app/assets/logo.svg'
import Image from 'next/image'

function Logo() {
    return (
        <div className="flex items-center space-x-2 opacity-0 animate-fadeInUp">
            <Image src={logo} width={25} height={25} alt="logo" />
            <span className="text-xl font-bold text-white">
                Credibly
            </span>
        </div>
    )
}

export default Logo
