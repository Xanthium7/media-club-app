"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for registered events - using more realistic dates for testing
  const registeredEvents = [
    {
      id: 1,
      title: "Tech Innovation Conference",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 23), // Current month, 15th day
      time: "5:00 PM - 8:00 PM",
      location: "Student Center",
      image: "/placeholder.svg?height=80&width=80&text=Tech",
    },
    {
      id: 2,
      title: "Annual Music Festival",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20), // Current month, 20th day
      time: "7:00 PM - 11:00 PM",
      location: "Auditorium",
      image: "/placeholder.svg?height=80&width=80&text=Music",
    },
    {
      id: 3,
      title: "Career Workshop",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 28), // Current month, 28th day
      time: "2:00 PM - 4:00 PM",
      location: "Room 301",
      image: "/placeholder.svg?height=80&width=80&text=Career",
    },
    {
      id: 4,
      title: "Art Exhibition",
      date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5), // Next month, 5th day
      time: "10:00 AM - 6:00 PM",
      location: "Art Gallery",
      image: "/placeholder.svg?height=80&width=80&text=Art",
    },
  ];

  // Filter events for the selected date
  const eventsForSelectedDate = registeredEvents.filter(
    (event) =>
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  );

  // Function to check if a day has events
  const isDayWithEvent = (day: Date) => {
    return registeredEvents.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <div className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">My Calendar</h1>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-3 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
                modifiers={{
                  event: isDayWithEvent,
                }}
                modifiersStyles={{
                  event: {
                    backgroundColor: "hsl(var(--primary) / 0.15)",
                    fontWeight: "bold",
                    color: "hsl(var(--primary))",
                    position: "relative",
                  },
                }}
                components={{
                  Day: ({ date, displayMonth, ...buttonProps }) => {
                    const hasEvent = isDayWithEvent(date);
                    return (
                      <button
                        {...buttonProps}
                        className={cn(
                          // buttonProps.className,
                          "relative",
                          hasEvent && "font-extrabold "
                        )}
                      >
                        {date.getDate()}
                        {hasEvent && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                        )}
                      </button>
                    );
                  },
                }}
              />
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
              {date ? (
                <span>
                  Events on{" "}
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              ) : (
                <span>Select a date to view events</span>
              )}
            </h2>

            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-3">
                {eventsForSelectedDate.map((event) => (
                  <Link href={`/events/${event.id}`} key={event.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center p-3">
                        <div className="w-16 h-16 relative rounded-md overflow-hidden mr-3 bg-primary/10">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <div className="flex flex-col gap-1 mt-1">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1 text-primary" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1 text-primary" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center bg-muted/30">
                <p className="text-muted-foreground">
                  No events scheduled for this day.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Days with events are highlighted on the calendar.
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4 mt-4">
          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
            {registeredEvents.length > 0 ? (
              registeredEvents
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((event) => (
                  <Link href={`/events/${event.id}`} key={event.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 h-full">
                      <div className="flex items-center p-3 h-full">
                        <div className="w-16 h-16 relative rounded-md overflow-hidden mr-3 bg-primary/10">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <div className="flex flex-col gap-1 mt-1">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CalendarIcon className="h-3 w-3 mr-1 text-primary" />
                              <span>
                                {event.date.toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1 text-primary" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1 text-primary" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
            ) : (
              <Card className="p-6 text-center bg-muted/30 col-span-full">
                <p className="text-muted-foreground">
                  You don't have any registered events.
                </p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
