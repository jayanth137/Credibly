import * as React from "react"
import Image from "next/image"
import { ChevronDown, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { PrismaClient } from "@prisma/client"

export default async function CoursePage() {
    // const courses = [
    //     {
    //         id: 1,
    //         title: "MERN Stack E-commerce App UI, Reactjs, Nodejs, Express, Mongodb, Redux Toolkit, RTK Query, TypeScript",
    //         enrolled: 15000,
    //         rating: 4.5,
    //         image: "/placeholder.svg?height=200&width=400",
    //     },
    //     {
    //         id: 2,
    //         title: "Advanced React Patterns, Performance Optimization, and Modern Best Practices",
    //         enrolled: 12000,
    //         rating: 4.8,
    //         image: "/placeholder.svg?height=200&width=400",
    //     },
    //     {
    //         id: 3,
    //         title: "Full Stack Development with Next.js 13, Prisma, and PostgreSQL",
    //         enrolled: 10000,
    //         rating: 4.7,
    //         image: "/placeholder.svg?height=200&width=400",
    //     },
    //     {
    //         id: 4,
    //         title: "Machine Learning and AI: From Basics to Advanced Techniques",
    //         enrolled: 8000,
    //         rating: 4.6,
    //         image: "/placeholder.svg?height=200&width=400",
    //     },
    //     {
    //         id: 5,
    //         title: "iOS App Development with Swift and SwiftUI",
    //         enrolled: 9000,
    //         rating: 4.5,
    //         image: "/placeholder.svg?height=200&width=400",
    //     },
    //     {
    //         id: 6,
    //         title: "Blockchain Development and Smart Contracts with Solidity",
    //         enrolled: 7000,
    //         rating: 4.4,
    //         image: "/placeholder.svg?height=200&width=400",
    //     },
    // ]
    const prisma = new PrismaClient()
    const courses = await prisma.videos.findMany()
    return (
        <div className="min-h-screen text-white">
            <main className="p-4 md:p-6 space-y-6">
                <h1 className="text-3xl font-bold">All Courses</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.videoId} className="bg-[#2D2A77] rounded-lg overflow-hidden">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                width={400}
                                height={200}
                                className="w-full object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="font-semibold line-clamp-2">{course.description.slice(0, 20) + '...'}</h3>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`w-4 h-4 ${index < Math.floor(4.5)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-sm">4.5</span>
                                    </div>
                                    {/* <span className="text-sm">+{course.enrolled.toLocaleString()} Enrolled</span> */}
                                </div>
                                <Button className="w-full bg-[#1E1B4B] hover:bg-[#2D2A77]">Enroll Now</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}