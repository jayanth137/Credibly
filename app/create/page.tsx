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
        <div className="min-h-screen text-white">
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