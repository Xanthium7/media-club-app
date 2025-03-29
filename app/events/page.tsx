"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Filter, MapPin, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Tech Innovation Conference",
    organizer: "Computer Science Club",
    date: "Oct 24, 2023",
    time: "5:00 PM - 8:00 PM",
    location: "Student Center",
    club: "cs",
    duration: "medium",
  },
  {
    id: 2,
    title: "Annual Music Festival",
    organizer: "Music Department",
    date: "Nov 15, 2023",
    time: "7:00 PM - 11:00 PM",
    location: "Auditorium",
    club: "music",
    duration: "long",
  },
  {
    id: 3,
    title: "Career Fair 2023",
    organizer: "Career Services",
    date: "Dec 5, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Main Hall",
    club: "all",
    duration: "long",
  },
  {
    id: 4,
    title: "Art Exhibition",
    organizer: "Art Department",
    date: "Oct 30, 2023",
    time: "1:00 PM - 5:00 PM",
    location: "Gallery",
    club: "art",
    duration: "medium",
  },
  {
    id: 5,
    title: "Sports Tournament",
    organizer: "Sports Club",
    date: "Nov 20, 2023",
    time: "9:00 AM - 11:00 AM",
    location: "Stadium",
    club: "sports",
    duration: "short",
  },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clubFilter, setClubFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  // Apply filters whenever search term or filters change
  useEffect(() => {
    const filtered = eventsData.filter((event) => {
      // Search term filter
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Club filter
      const matchesClub = clubFilter === "all" || event.club === clubFilter;

      // Duration filter
      const matchesDuration =
        durationFilter === "all" || event.duration === durationFilter;

      return matchesSearch && matchesClub && matchesDuration;
    });

    setFilteredEvents(filtered);
  }, [searchTerm, clubFilter, durationFilter]);

  // Reset all filters
  const resetFilters = () => {
    setClubFilter("all");
    setDurationFilter("all");
  };

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Events</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2 ">
                <label className="text-sm font-medium">Club</label>
                <Select value={clubFilter} onValueChange={setClubFilter}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="All Clubs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clubs</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select
                  value={durationFilter}
                  onValueChange={setDurationFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="short">1-2 Hours</SelectItem>
                    <SelectItem value="medium">Half Day</SelectItem>
                    <SelectItem value="long">Full Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  className="hover:bg-black hover:text-white"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <DialogClose asChild>
                  <Button className="bg-accent/80 hover:bg-accent/60">
                    Apply Filters
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-9 rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 pt-2 -mx-4 px-4">
        <Select value={clubFilter} onValueChange={setClubFilter}>
          <SelectTrigger className="w-[140px] rounded-full  bg-secondary border-0">
            <SelectValue placeholder="All Clubs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clubs</SelectItem>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="art">Art</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
          </SelectContent>
        </Select>
        <Select value={durationFilter} onValueChange={setDurationFilter}>
          <SelectTrigger className="w-[140px] rounded-full bg-secondary border-0">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Durations</SelectItem>
            <SelectItem value="short">1-2 Hours</SelectItem>
            <SelectItem value="medium">Half Day</SelectItem>
            <SelectItem value="long">Full Day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link
              className="flex flex-col gap-10"
              href={`/events/${event.id}`}
              key={event.id}
            >
              <Card className="overflow-hidden event-card-hover">
                <div className="flex h-32">
                  <div className="w-1/3 relative event-gradient">
                    <Image
                      src={`/placeholder.svg?height=128&width=128&text=Event+${event.id}`}
                      alt={event.title}
                      fill
                      className="object-cover mix-blend-overlay"
                    />
                  </div>
                  <CardContent className="w-2/3 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {event.organizer}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-xs">
                        <Calendar className="h-3 w-3 mr-1 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Clock className="h-3 w-3 mr-1 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <MapPin className="h-3 w-3 mr-1 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No events match your search criteria
            </p>
            <Button variant="link" onClick={resetFilters} className="mt-2">
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
