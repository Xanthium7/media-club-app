import { Button } from "@/components/ui/button"
import { Calendar, Clock, Heart, MapPin, Share2, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch event data based on the ID
  const eventId = params.id

  return (
    <div className="pb-20">
      <div className="relative h-64 w-full event-gradient">
        <Image
          src={`/placeholder.svg?height=400&width=800&text=Event+${eventId}`}
          alt={`Event ${eventId}`}
          fill
          className="object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Link
          href="/events"
          className="absolute top-4 left-4 h-8 w-8 rounded-full bg-black/30 flex items-center justify-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/30 text-white hover:text-accent"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="container px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            {eventId === "1"
              ? "Tech Innovation Conference"
              : eventId === "2"
                ? "Annual Music Festival"
                : "Career Fair 2023"}
          </h1>
          <p className="text-muted-foreground">
            {eventId === "1" ? "Computer Science Club" : eventId === "2" ? "Music Department" : "Career Services"}
          </p>
        </div>

        <div className="flex flex-col gap-3 bg-secondary rounded-lg p-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {eventId === "1" ? "October 24, 2023" : eventId === "2" ? "November 15, 2023" : "December 5, 2023"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-muted-foreground">
                {eventId === "1" ? "5:00 PM - 8:00 PM" : eventId === "2" ? "7:00 PM - 11:00 PM" : "10:00 AM - 4:00 PM"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm text-muted-foreground">
                {eventId === "1"
                  ? "Student Center, Room 302"
                  : eventId === "2"
                    ? "Main Auditorium"
                    : "Main Hall, Building A"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="font-medium">Attendees</p>
              <p className="text-sm text-muted-foreground">
                {eventId === "1" ? "42" : eventId === "2" ? "156" : "89"} going
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">About this event</h2>
          <p className="text-muted-foreground">
            {eventId === "1"
              ? "Join us for a day of innovation and technology. The Tech Innovation Conference brings together industry leaders, researchers, and students to discuss the latest trends and advancements in technology. Network with professionals, attend workshops, and learn about cutting-edge research."
              : eventId === "2"
                ? "The Annual Music Festival is back! Featuring performances from student bands, the college orchestra, and special guest artists. Come enjoy a night of music across various genres, from classical to contemporary. Food and refreshments will be available."
                : "The Career Fair 2023 is your opportunity to connect with potential employers from various industries. Bring your resume, dress professionally, and be ready to network. Companies will be conducting on-site interviews for internships and full-time positions."}
          </p>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-accent text-black hover:bg-accent/90">Register</Button>
          <Button variant="outline" size="icon" className="border-primary text-primary">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

