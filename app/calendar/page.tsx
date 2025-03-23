"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for registered events
  const registeredEvents = [
    {
      id: 1,
      title: "Tech Innovation Conference",
      date: new Date(2023, 9, 24), // October 24, 2023
      time: "5:00 PM - 8:00 PM",
      location: "Student Center",
      image: "/placeholder.svg?height=80&width=80&text=Tech",
    },
    {
      id: 2,
      title: "Annual Music Festival",
      date: new Date(2023, 10, 15), // November 15, 2023
      time: "7:00 PM - 11:00 PM",
      location: "Auditorium",
      image: "/placeholder.svg?height=80&width=80&text=Music",
    },
  ]

  // Filter events for the selected date
  const eventsForSelectedDate = registeredEvents.filter(
    (event) =>
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) =>
    registeredEvents.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )

  return (
    <div className="container px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">My Calendar</h1>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  event: (date) => isDayWithEvent(date),
                }}
                modifiersClassNames={{
                  event: "bg-primary/20 font-bold text-primary",
                }}
              />
            </CardContent>
          </Card>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              Events on {date?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </h2>
            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-3">
                {eventsForSelectedDate.map((event) => (
                  <Link href={`/events/${event.id}`} key={event.id}>
                    <Card className="overflow-hidden event-card-hover">
                      <div className="flex items-center p-3">
                        <div className="w-16 h-16 relative rounded-md overflow-hidden mr-3 event-gradient">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover mix-blend-overlay"
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
              <p className="text-muted-foreground">No events scheduled for this day.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="list" className="space-y-4 mt-4">
          <div className="space-y-3">
            {registeredEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <Card className="overflow-hidden event-card-hover">
                  <div className="flex items-center p-3">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden mr-3 event-gradient">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover mix-blend-overlay"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarIcon className="h-3 w-3 mr-1 text-primary" />
                          <span>
                            {event.date.toLocaleDateString("en-US", {
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
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

