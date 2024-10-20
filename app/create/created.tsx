'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

interface CreatedProps {
    setCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Created({ setCreated }: CreatedProps) {
    const data = useAppSelector((state) => state.data);
    const [origin, setOrigin] = useState('');
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        handleGetDomain();
    }, []);

    const handleGetDomain = () => {
        setOrigin(window.location.origin);
    };

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
                </div>
                <h3 className="text-xl font-semibold mb-4">{data.title}</h3>
                <div className="flex items-center space-x-2 bg-[#3a3b6b]/50 rounded-md p-2">
                    <Input
                        value={`${origin}/certify/${data.link}`}
                        readOnly
                        className="flex-grow bg-transparent border-none text-white"
                    />
                    <CopyToClipboard text={`${origin}/certify/${data.link}`}>
                        <Button
                            onClick={() => setCopied(true)}
                            variant="outline"
                            size="icon"
                            className="bg-[#4a4b7b]/50 hover:bg-[#5a5b8b]/50"
                        >
                            {!copied ? <Copy className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                    </CopyToClipboard>
                </div>
                <Button
                    onClick={() => setCreated(false)} // To go back to the Create component
                    className="mt-4 bg-white text-[#1a1b3b] hover:bg-gray-200"
                >
                    Create Another Course
                </Button>
            </div>
        </main>
    );
}
