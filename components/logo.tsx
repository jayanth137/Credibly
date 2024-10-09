'use client'
import React from 'react'
import { motion } from "framer-motion"
import { Crown } from 'lucide-react'
import logo from '../app/assets/logo.svg'
import Image from 'next/image'


function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
        >
            <Image src={logo} width={25} height={25} alt="logo" />
            <span className="text-xl font-bold text-white">
                Credibly
            </span>
        </motion.div>
    )
}

export default Logo