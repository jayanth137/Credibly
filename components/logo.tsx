'use client'
import React from 'react'
import { motion } from "framer-motion"
import { Crown } from 'lucide-react'


function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
        >
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Credibily
            </span>
        </motion.div>
    )
}

export default Logo