'use client'
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Login from "../components/Login"
import Logo from "@/components/logo"

export default function LoginPage() {
    return (
        <div className="min-h-screen text-white flex flex-col">
            <main className="flex-grow flex items-center justify-center p-4 md:p-8">
                <div className="bg-[#2a2b5b] rounded-lg overflow-hidden max-w-4xl w-full shadow-xl h-[70vh]">
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-1/2 bg-black p-8 text-white">
                            <div className="mb-6">
                                <Image src={require('../assets/logo.svg')} alt="logo" />

                            </div>
                            <h2 className="text-3xl font-bold mb-4">Join with us</h2>
                            <p className="mb-4">
                                Easily tokenize your content and connect with a global audience. Create NFTs or offer
                                exclusive access to your work for your community.
                            </p>
                            <p>
                                At Credibily, you can easily upload your videos or playlists from YouTube. Once your content
                                is completed, learners earn verifiable certificates, ensuring authenticity and
                                security. Join a growing community of creators, where your contributions empower
                                education and open new opportunities for learners around the globe.
                            </p>
                        </div>
                        <div className="md:w-1/2 bg-gray-100 p-8 text-gray-800">
                            <div className="flex justify-center">
                                <img
                                    src="https://logosmarcas.net/wp-content/uploads/2020/09/Google-Emblema.png"
                                    alt="Credibily logo"
                                    className="scale-[70%]"
                                // width={64}
                                // height={64}
                                // className="w-16 h-16"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-center mb-4">Sign in as a Creator</h2>
                            <p className="text-center mb-6 text-sm">
                                "Unlock the Future of Learning & Creation. Upload, Earn, and Empower."
                            </p>
                            <Login />
                            <p className="text-center text-xs text-gray-500">
                                <a href="#" className="hover:underline">Terms and Conditions</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}