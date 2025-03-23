"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const events = [
  {
    id: 1,
    title: "Tech Innovation Conference",
    organizer: "Computer Science Club",
    date: "Oct 24, 2023",
    time: "5:00 PM - 8:00 PM",
    location: "Student Center",
    image: "/placeholder.svg?height=200&width=400&text=Tech+Conference",
  },
  {
    id: 2,
    title: "Annual Music Festival",
    organizer: "Music Department",
    date: "Nov 15, 2023",
    time: "7:00 PM - 11:00 PM",
    location: "Auditorium",
    image: "/placeholder.svg?height=200&width=400&text=Music+Festival",
  },
  {
    id: 3,
    title: "Career Fair 2023",
    organizer: "Career Services",
    date: "Dec 5, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Main Hall",
    image: "/placeholder.svg?height=200&width=400&text=Career+Fair",
  },
]

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute bottom-4 right-4 z-10 flex gap-1">
        {events.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className={`h-2 w-2 rounded-full p-0 border-0 ${index === currentIndex ? "bg-accent" : "bg-white/30"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={`/events/${events[currentIndex].id}`}>
            <Card className="border-0 overflow-hidden rounded-xl">
              <div className="relative h-48 w-full event-gradient">
                <Image
                  src={events[currentIndex].image || "/placeholder.svg"}
                  alt={events[currentIndex].title}
                  fill
                  className="object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{events[currentIndex].title}</h3>
                  <p className="text-sm opacity-90">{events[currentIndex].organizer}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center text-xs">
                      <Calendar className="h-3 w-3 mr-1 text-accent" />
                      <span>{events[currentIndex].date}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1 text-accent" />
                      <span>{events[currentIndex].time}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <MapPin className="h-3 w-3 mr-1 text-accent" />
                      <span>{events[currentIndex].location}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

