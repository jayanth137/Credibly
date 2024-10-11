'use client'
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Login from "../components/Login"
import Logo from "@/components/logo"
import Lottie from "react-lottie"

export default function LoginPage() {
    return (
        <div className="h-full text-white flex flex-col my-10">
            <main className="flex-grow flex items-center justify-center p-4 md:p-8">
                <div className=" rounded-lg overflow-hidden w-9/12  h-[70vh] flex justify-center items-center mx-auto">
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-2/3  p-8 pr-20 text-white">
                            {/* <div className="mb-6">
                                <Image src={require('../assets/logo.svg')} alt="logo" />
                            </div> */}
                            <h2 className="text-5xl font-mono font-bold mb-4">Monetize Your Knowledge with On-Chain Certificates</h2>
                            <p className="mb-4 text-2xl font-bold italic">
                                {"\""} Turn knowledge into revenue with Soulbound NFT based course certificates{"\""}
                            </p>
                            <p className="pr-4">
                                At Credibily, you can easily upload your videos or playlists from YouTube. Once your content
                                is completed, learners earn verifiable certificates, ensuring authenticity and
                                security. Join a growing community of creators, where your contributions empower
                                education and open new opportunities for learners around the globe.
                            </p>

                        </div>
                        <div className="md:w-1/3 backdrop-blur-lg bg-black/20  p-8 text-white ">
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
                            <Lottie options={{
                                animationData: require('@/public/Money.json'),
                                loop: true,
                                autoplay: true,
                            }}
                                height={200}
                                width={200}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}