"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
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
    image:
      "https://i.pinimg.com/736x/35/dc/0e/35dc0e5598759bafa3da64d6675ffb63.jpg",
  },
  {
    id: 2,
    title: "Annual Music Festival",
    organizer: "Music Department",
    date: "Nov 15, 2023",
    time: "7:00 PM - 11:00 PM",
    location: "Auditorium",
    image:
      "https://i.pinimg.com/736x/7b/83/48/7b83481a4cf0c574be1e71dd0294121e.jpg",
  },
  {
    id: 3,
    title: "End-of-Semester Art Exhibition",
    organizer: "Art Club",
    date: "Dec 10, 2023",
    time: "2:00 PM - 6:00 PM",
    location: "Art Gallery",
    image:
      "https://i.pinimg.com/736x/71/c5/ff/71c5ff07af70b970331bc1a75430c280.jpg",
  },
];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle automatic slide change
  useEffect(() => {
    if (isPaused || isTransitioning) return;

    const interval = setInterval(() => {
      setDirection(1); // Set direction to forward
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);

      // Reset transitioning state after animation completes
      setTimeout(() => setIsTransitioning(false), 600);
    }, 4000); // Longer interval for better user experience

    return () => clearInterval(interval);
  }, [isPaused, isTransitioning]);

  // Improved animation variants for seamless transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0.5,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30, duration: 0.6 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0.5,
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30, duration: 0.6 },
        opacity: { duration: 0.4 },
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
        delay: 0.1,
        duration: 0.4,
        staggerChildren: 0.08,
        delayChildren: 0.1,
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

  const handleSlideChange = (index: number) => {
    if (isTransitioning) return;

    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setIsTransitioning(true);
    setCurrentIndex(index);

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl border-transparent"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Indicators - repositioned lower */}
      <div className="absolute -bottom-6 left-0 right-0 z-10 flex justify-center gap-2 pb-6">
        {events.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`h-1 w-10 p-0 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-accent scale-100"
                : "bg-white/30 scale-75 hover:scale-90"
            }`}
            onClick={() => handleSlideChange(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>

      {/* Main carousel - Changed AnimatePresence mode for seamless transition */}
      <div className="relative h-52 sm:h-64 w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 right-0 w-full"
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
                      className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pb-3"
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
    </div>
  );
}
