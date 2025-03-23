"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EventCarousel from "@/components/event-carousel";
import { useState } from "react";

// Sample news data
const newsData = [
  {
    id: 1,
    title: "New Library Hours",
    summary: "The library will now be open until midnight during finals week.",
    content:
      "To support student success during the finals period, the University Library has extended its operating hours. From December 5th to December 19th, the library will remain open until midnight on weekdays and until 10 PM on weekends. Additional study spaces will be available on the second floor, and the quiet study area will be expanded to accommodate more students. Librarians will also offer extended research help hours during this period.",
  },
  {
    id: 2,
    title: "Campus Wi-Fi Upgrade",
    summary: "New high-speed Wi-Fi has been installed across all dorms.",
    content:
      "The IT Department has completed the campus-wide Wi-Fi upgrade project. All dormitories, academic buildings, and common areas now feature high-speed 6E Wi-Fi technology, providing speeds up to 2.5 Gbps. The new system includes improved security features and expanded coverage to eliminate dead zones. Students experiencing connectivity issues should contact the IT helpdesk at extension 3456 or submit a ticket through the student portal.",
  },
];

// Sample notices data
const noticesData = [
  {
    id: 1,
    title: "Registration Deadline",
    summary: "Fall semester registration closes on August 15th.",
    content:
      "This is a reminder that course registration for the Fall 2023 semester will close on August 15th at 11:59 PM. After this deadline, students will need to request special permission from the Registrar's Office to make schedule changes. Please ensure all financial holds are cleared before attempting to register. Academic advisors are available for last-minute consultations through August 14th. Contact the Registration Office at ext. 2345 with any questions.",
  },
  {
    id: 2,
    title: "Dorm Maintenance",
    summary: "Scheduled maintenance in West Hall on July 10-12.",
    content:
      "Facilities Management will be conducting essential maintenance in West Hall from July 10-12. This will include plumbing updates, fire safety inspections, and HVAC servicing. Students currently residing in West Hall will need to vacate their rooms between 9 AM and 4 PM each day. A temporary study and relaxation space will be available in the East Hall common room during this time. Personal belongings can remain in the rooms, but should be secured. For questions or concerns, please contact Housing Services at housing@university.edu.",
  },
];

export default function Home() {
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
  const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openNewsDialog = (news: any) => {
    setSelectedItem(news);
    setIsNewsDialogOpen(true);
  };

  const openNoticeDialog = (notice: any) => {
    setSelectedItem(notice);
    setIsNoticeDialogOpen(true);
  };

  return (
    <div className="container px-4 py-6 space-y-6 pb-20">
      {/* Existing code for header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hello, Mr Potato</h1>
          <p className="text-muted-foreground">
            Discover events at your college
          </p>
        </div>
        <div className="relative h-10 w-10 rounded-full bg-primary/10">
          <span className="absolute inset-0 flex items-center justify-center text-primary font-bold">
            S
          </span>
        </div>
      </div>

      {/* Existing code for Hot Events */}
      <div className="relative">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          Hot Events
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-accent pulse-accent"></span>
        </h2>
        <EventCarousel />
      </div>

      {/* Modified Tabs - removed Jobs tab */}
      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>
        <TabsContent value="news" className="space-y-4 mt-4">
          {newsData.map((news) => (
            <Card key={news.id} className="event-card-hover">
              <CardContent className="p-4">
                <h3 className="font-semibold">{news.title}</h3>
                <p className="text-sm text-muted-foreground">{news.summary}</p>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    onClick={() => openNewsDialog(news)}
                  >
                    Read more
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="notices" className="space-y-4 mt-4">
          {noticesData.map((notice) => (
            <Card key={notice.id} className="event-card-hover">
              <CardContent className="p-4">
                <h3 className="font-semibold">{notice.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {notice.summary}
                </p>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    onClick={() => openNoticeDialog(notice)}
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* News Dialog */}
      <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
        <DialogContent className="max-w-md rounded-md border-2">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-2">
            <p>{selectedItem?.content}</p>
            <p className="text-xs text-muted-foreground italic mt-4">
              Published: {new Date().toLocaleDateString()}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notice Dialog */}
      <Dialog open={isNoticeDialogOpen} onOpenChange={setIsNoticeDialogOpen}>
        <DialogContent className="max-w-md rounded-md border-2">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-2">
            <p>{selectedItem?.content}</p>
            <div className="text-xs text-muted-foreground mt-4 flex flex-col gap-1">
              <p className="font-medium">Important Notice</p>
              <p>
                Please take note of the dates and requirements mentioned above.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing code for Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          <Link
            href="/events"
            className="text-accent text-sm flex items-center font-medium"
          >
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="space-y-4 flex flex-col ">
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
                      <h3 className="font-semibold line-clamp-1">
                        Tech Innovation Conference
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        Hosted by Computer Science Club
                      </p>
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
  );
}
