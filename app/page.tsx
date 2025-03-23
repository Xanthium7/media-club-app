import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import EventCarousel from "@/components/event-carousel"

export default function Home() {
  return (
    <div className="container px-4 py-6 space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hello, Student</h1>
          <p className="text-muted-foreground">Discover events at your college</p>
        </div>
        <div className="relative h-10 w-10 rounded-full bg-primary/10">
          <span className="absolute inset-0 flex items-center justify-center text-primary font-bold">S</span>
        </div>
      </div>

      <div className="relative">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          Hot Events
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-accent pulse-accent"></span>
        </h2>
        <EventCarousel />
      </div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>
        <TabsContent value="news" className="space-y-4 mt-4">
          <Card className="event-card-hover">
            <CardContent className="p-4">
              <h3 className="font-semibold">New Library Hours</h3>
              <p className="text-sm text-muted-foreground">
                The library will now be open until midnight during finals week.
              </p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="text-primary">
                  Read more
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="event-card-hover">
            <CardContent className="p-4">
              <h3 className="font-semibold">Campus Wi-Fi Upgrade</h3>
              <p className="text-sm text-muted-foreground">New high-speed Wi-Fi has been installed across all dorms.</p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="text-primary">
                  Read more
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4 mt-4">
          <Card className="event-card-hover">
            <CardContent className="p-4">
              <h3 className="font-semibold">Research Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Computer Science department is looking for research assistants.
              </p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="text-primary">
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="event-card-hover">
            <CardContent className="p-4">
              <h3 className="font-semibold">Campus Tour Guide</h3>
              <p className="text-sm text-muted-foreground">Admissions office is hiring part-time tour guides.</p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="text-primary">
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notices" className="space-y-4 mt-4">
          <Card className="event-card-hover">
            <CardContent className="p-4">
              <h3 className="font-semibold">Registration Deadline</h3>
              <p className="text-sm text-muted-foreground">Fall semester registration closes on August 15th.</p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="text-primary">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="event-card-hover">
            <CardContent className="p-4">
              <h3 className="font-semibold">Dorm Maintenance</h3>
              <p className="text-sm text-muted-foreground">Scheduled maintenance in West Hall on July 10-12.</p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="text-primary">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          <Link href="/events" className="text-accent text-sm flex items-center font-medium">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
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
                      <h3 className="font-semibold line-clamp-1">Tech Innovation Conference</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">Hosted by Computer Science Club</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-xs">
                        <Calendar className="h-3 w-3 mr-1 text-primary" />
                        <span>Oct 24, 2023</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Clock className="h-3 w-3 mr-1 text-primary" />
                        <span>5:00 PM - 8:00 PM</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <MapPin className="h-3 w-3 mr-1 text-primary" />
                        <span>Student Center</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

