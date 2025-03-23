import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, LogOut, Settings, Ticket, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  // Mock user data
  const user = {
    username: "student123",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@college.edu",
    college: "Engineering",
    clubs: ["Computer Science Club", "Robotics Team", "Chess Club"],
    avatar: "/placeholder.svg?height=100&width=100&text=AJ",
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 border-4 border-primary">
          <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
          <AvatarFallback className="bg-primary text-primary-foreground">{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="text-muted-foreground">@{user.username}</p>
      </div>

      <Card className="event-card-hover">
        <CardHeader className="bg-secondary/50 rounded-t-lg">
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">First Name</p>
              <p>{user.firstName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Name</p>
              <p>{user.lastName}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">College</p>
              <p>{user.college}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="event-card-hover">
        <CardHeader className="bg-secondary/50 rounded-t-lg">
          <CardTitle>Club Memberships</CardTitle>
          <CardDescription>Clubs you are currently a member of</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-2">
            {user.clubs.map((club, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>{club}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg event-card-hover">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Registered for Tech Innovation Conference</p>
                <p className="text-sm text-muted-foreground">October 24, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg event-card-hover">
              <User className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Updated profile information</p>
                <p className="text-sm text-muted-foreground">October 15, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg event-card-hover">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Joined Computer Science Club</p>
                <p className="text-sm text-muted-foreground">September 5, 2023</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tickets" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg event-card-hover">
              <Ticket className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Tech Innovation Conference</p>
                <p className="text-sm text-muted-foreground">October 24, 2023 • 5:00 PM</p>
              </div>
              <Button variant="outline" size="sm" className="border-primary text-primary" asChild>
                <Link href="/events/1">View</Link>
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg event-card-hover">
              <Ticket className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Annual Music Festival</p>
                <p className="text-sm text-muted-foreground">November 15, 2023 • 7:00 PM</p>
              </div>
              <Button variant="outline" size="sm" className="border-primary text-primary" asChild>
                <Link href="/events/2">View</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg event-card-hover">
              <Ticket className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Career Fair 2023</p>
                <p className="text-sm text-muted-foreground">December 5, 2023 • 10:00 AM</p>
              </div>
              <Button variant="outline" size="sm" className="border-primary text-primary" asChild>
                <Link href="/events/3">View</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button variant="outline" className="w-full flex items-center gap-2 border-primary text-primary">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  )
}

