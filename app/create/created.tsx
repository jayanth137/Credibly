'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/redux/hooks/hooks"
import { Wallet, Play, Check, Copy } from "lucide-react"

export default function Created() {
    const data = useAppSelector(state => state.data)
    return (
        <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
            <div className="bg-[#2a2b5b]/30 backdrop-blur-sm p-6 rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-center space-x-2 mb-6">
                    <h2 className="text-2xl font-bold">Course Created Successfully</h2>
                    <Check className="w-6 h-6 text-green-400" />
                </div>
                <div className="relative aspect-video bg-[#3a3b6b] rounded-lg overflow-hidden mb-6">
                    <img
                        src={data.thumbnail}
                        alt="Course thumbnail"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                            <Play className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Title of the video</h3>
                <div className="flex items-center space-x-2 bg-[#3a3b6b]/50 rounded-md p-2">
                    <Input
                        value={`https://credibly.com/${data.link}`}
                        readOnly
                        className="flex-grow bg-transparent border-none text-white"
                    />
                    <Button variant="outline" size="icon" className="bg-[#4a4b7b]/50 hover:bg-[#5a5b8b]/50">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </main>
    )
}