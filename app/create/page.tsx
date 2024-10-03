"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import Login from "../components/Login"

export default function CourseCreationForm() {

    const { data: session, status } = useSession();
    const [videos, setVideos] = useState<any[]>();
    const [error, setError] = useState<string>()
    const [videoLoading, setVideoLoading] = useState<boolean>(true)

    const [selectedVideo, setSelectedVideo] = useState<any>()
    const [coursePrice, setCoursePrice] = useState("")
    const [bannerUrl, setBannerUrl] = useState("/placeholder.svg?height=400&width=800")


    useEffect(() => {
        // console.log(session.accessTok)
        if (session && status === 'authenticated') {
            setVideoLoading(true)
            fetchVideos()
        }
    }, [session, status]);

    useEffect(() => {
        console.log(selectedVideo)
    }, [selectedVideo])

    async function fetchVideos() {
        console.log(session)
        const resp = await fetch('/api/youtube/getVideos', {
            headers: {
                Authorization: `Bearer ${(session as any).accessToken}`,
            },
        })
        const data = await resp.json()
        // console.log(data)
        if (data.error) {
            setError(data.error)
        }
        else {
            setVideos(data)
        }
        setVideoLoading(false)
    }


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        console.log("Form submitted", { selectedVideo, coursePrice, bannerUrl })
        // Add your API call or data submission logic here
    }

    // const videoDetails = {
    //     "video1": { title: "Introduction to React", duration: "1h 30m" },
    //     "video2": { title: "Advanced JavaScript Concepts", duration: "2h 15m" },
    //     "video3": { title: "Building RESTful APIs", duration: "1h 45m" },
    // }



    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <Login />;
    }


    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Create a New Course</h1>
            <div className="lg:flex lg:space-x-6">
                <Card className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <CardHeader>
                        <CardTitle>Course Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="video-select">Select Video</Label>
                                <Select onValueChange={setSelectedVideo} value={selectedVideo}>
                                    <SelectTrigger id="video-select">
                                        <SelectValue placeholder="Select a video">{videos[selectedVideo].snippet.title}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectItem value="video1">Introduction to React</SelectItem>
                                        <SelectItem value="video2">Advanced JavaScript Concepts</SelectItem>
                                        <SelectItem value="video3">Building RESTful APIs</SelectItem> */}
                                        {
                                            videos && videos.map((video, idx) => {
                                                return <SelectItem key={idx} value={idx}>{video.snippet.title}</SelectItem>
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="course-price">Course Price</Label>
                                <Input
                                    id="course-price"
                                    type="number"
                                    placeholder="Enter course price"
                                    value={coursePrice}
                                    onChange={(e) => setCoursePrice(e.target.value)}
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" onClick={handleSubmit}>
                            Create Course
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="w-full lg:w-1/2">
                    <CardHeader>
                        <CardTitle>Course Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Course Banner</Label>
                            <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
                                {/* {
                                    () => {
                                        console.log(selectedVideo)
                                        return <h1></h1>
                                    }
                                } */}
                                <img
                                    src={selectedVideo ? videos[selectedVideo].snippet.thumbnails.maxres.url : ""}
                                    alt="Course Banner"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        {selectedVideo && (
                            <div className="space-y-2">
                                <h3 className="font-semibold">Video Details</h3>
                                <p>Title: {videos[selectedVideo].snippet.title}</p>
                                <p>Description: {videos[selectedVideo].snippet.description}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}