import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Filter, MapPin, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EventsPage() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Button variant="outline" size="icon" className="border-primary text-primary">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search events..." className="pl-9 rounded-full" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        <Select>
          <SelectTrigger className="w-[140px] rounded-full bg-secondary border-0">
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
        <Select>
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
        {[1, 2, 3, 4, 5].map((i) => (
          <Link href={`/events/${i}`} key={i}>
            <Card className="overflow-hidden event-card-hover">
              <div className="flex h-32">
                <div className="w-1/3 relative event-gradient">
                  <Image
                    src={`/placeholder.svg?height=128&width=128&text=Event+${i}`}
                    alt={`Event ${i}`}
                    fill
                    className="object-cover mix-blend-overlay"
                  />
                </div>
                <CardContent className="w-2/3 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold line-clamp-1">
                      {i % 3 === 0
                        ? "Tech Innovation Conference"
                        : i % 3 === 1
                          ? "Annual Music Festival"
                          : "Career Fair 2023"}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {i % 3 === 0 ? "Computer Science Club" : i % 3 === 1 ? "Music Department" : "Career Services"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-xs">
                      <Calendar className="h-3 w-3 mr-1 text-primary" />
                      <span>{i % 3 === 0 ? "Oct 24" : i % 3 === 1 ? "Nov 15" : "Dec 5"}, 2023</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1 text-primary" />
                      <span>
                        {i % 3 === 0 ? "5:00 PM - 8:00 PM" : i % 3 === 1 ? "7:00 PM - 11:00 PM" : "10:00 AM - 4:00 PM"}
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <MapPin className="h-3 w-3 mr-1 text-primary" />
                      <span>{i % 3 === 0 ? "Student Center" : i % 3 === 1 ? "Auditorium" : "Main Hall"}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

