'use client'
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Wallet, Plus, Play } from "lucide-react"
import Create from "./create"
import Created from "./created"
import { useState } from "react"

export default function CourseCreation() {
    const [created, setCreated] = useState<boolean>(false)
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1b3b] to-[#2a2b5b] text-white">
            <header className="flex justify-between items-center p-4 md:p-6 bg-[#2a2b5b]/50 backdrop-blur-sm">
                <Logo />
                <Button variant="outline" className="bg-[#3a3b6b]/50 text-white hover:bg-[#4a4b7b]/50 backdrop-blur-sm">
                    <Wallet className="w-4 h-4 mr-2" />
                    Wallet Name
                </Button>
            </header>
            {
                !created &&
                <Create setCreated={setCreated} />
            }
            {
                created &&
                <Created />
            }
        </div>
    )
}