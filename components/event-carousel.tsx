"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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
];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Handle automatic slide change
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1); // Set direction to forward
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle manual navigation
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation buttons */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center">
        <Button
          onClick={handlePrevious}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm -ml-4 hover:ml-0 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 z-10 flex items-center">
        <Button
          onClick={handleNext}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm -mr-4 hover:mr-0 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {events.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`h-2 w-10 p-0 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-accent scale-100"
                : "bg-white/30 scale-75 hover:scale-90"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>

      {/* Main carousel */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          <Link href={`/events/${events[currentIndex].id}`}>
            <Card className="border-0 overflow-hidden rounded-xl shadow-md">
              <div className="relative h-52 sm:h-64 w-full event-gradient">
                <Image
                  src={events[currentIndex].image || "/placeholder.svg"}
                  alt={events[currentIndex].title}
                  fill
                  className="object-cover mix-blend-overlay transition-transform duration-5000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 text-white"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h3
                    className="font-bold text-lg md:text-xl"
                    variants={itemVariants}
                  >
                    {events[currentIndex].title}
                  </motion.h3>
                  <motion.p
                    className="text-sm opacity-90"
                    variants={itemVariants}
                  >
                    {events[currentIndex].organizer}
                  </motion.p>
                  <motion.div
                    className="flex flex-wrap gap-x-4 gap-y-1 mt-3"
                    variants={contentVariants}
                  >
                    <motion.div
                      className="flex items-center text-xs"
                      variants={itemVariants}
                    >
                      <Calendar className="h-3.5 w-3.5 mr-2 text-accent" />
                      <span>{events[currentIndex].date}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center text-xs"
                      variants={itemVariants}
                    >
                      <Clock className="h-3.5 w-3.5 mr-2 text-accent" />
                      <span>{events[currentIndex].time}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center text-xs"
                      variants={itemVariants}
                    >
                      <MapPin className="h-3.5 w-3.5 mr-2 text-accent" />
                      <span>{events[currentIndex].location}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
