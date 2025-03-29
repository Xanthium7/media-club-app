"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EventCarousel from "@/components/event-carousel";
import { useState } from "react";
import { Anton } from "next/font/google";
import { Marquee } from "@/components/magicui/marquee";
import { SpinningText } from "@/components/magicui/spinning-text";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const important_information_for_marq =
  "Semester registration for students of S4 and S6 is currently open";

// Sample news data - adding more items for cycling
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
  {
    id: 3,
    title: "Dean's List Announced",
    summary: "Congratulations to all students who made the Fall Dean's List!",
    content:
      "The Office of Academic Affairs is pleased to announce that 342 students have been named to the Dean's List for the Fall 2023 semester. This recognition is awarded to students who have maintained a GPA of 3.5 or higher while taking at least 12 credit hours.",
  },
  {
    id: 4,
    title: "Career Fair Next Month",
    summary: "Over 50 employers will be recruiting at the Spring Career Fair.",
    content:
      "The Career Development Center is hosting the annual Spring Career Fair on February 12th from 10 AM to 3 PM in the Student Recreation Center. More than 50 employers from various industries will be present, offering full-time positions, internships, and networking opportunities.",
  },
];

// Sample notices data - adding more items for cycling
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
  {
    id: 3,
    title: "Financial Aid Application Deadline",
    summary: "FAFSA submission deadline for next academic year is approaching.",
    content:
      "The priority deadline for FAFSA submission for the next academic year is December 1st. Students who submit their FAFSA by this date will be given priority consideration for all federal, state, and institutional aid programs.",
  },
  {
    id: 4,
    title: "Health Insurance Verification",
    summary: "Proof of health insurance required for all students.",
    content:
      "All students must submit proof of adequate health insurance coverage by September 15th or enroll in the University Student Health Insurance Plan.",
  },
];

export default function Home() {
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
  const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("news");

  // Get all news and notices for cycling
  const allNews = newsData;
  const allNotices = noticesData;

  const openNewsDialog = (news: any) => {
    setSelectedItem(news);
    setIsNewsDialogOpen(true);
  };

  const openNoticeDialog = (notice: any) => {
    setSelectedItem(notice);
    setIsNoticeDialogOpen(true);
  };

  return (
    <div className="container px-6 py-8 space-y-10 pb-20 max-w-5xl mx-auto">
      {/* Header section */}
      <div className="flex items-center justify-between py-3">
        <div>
          <h1 className="text-2xl font-semibold">Hello</h1>
          <p className="text-muted-foreground  mt-1">
            Discover events at your college
          </p>
        </div>
        <div className="relative h-12 w-12 rounded-full bg-primary/10 shadow-sm hover:shadow-md transition-all duration-300">
          <span className="absolute inset-0 flex items-center justify-center text-primary font-bold text-lg">
            S
          </span>
        </div>
      </div>

      {/* Hot Events section */}
      <div className="relative mt-6">
        <h2 className="text-xl font-medium mb-5 flex items-center">
          Hot Events
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-accent pulse-accent"></span>
        </h2>
        <div className="relative w-screen left-1/2 right-1/2  transform -translate-x-1/2 overflow-hidden shadow-sm">
          <div className="rounded-lg overflow-hidden">
            <EventCarousel />
          </div>
        </div>
      </div>
      <div className="relative w-screen left-1/2 right-1/2  transform -translate-x-1/2 overflow-hidden shadow-sm">
        <Marquee className="bg-black text-white/50 py-2 shadow-md border-t-[1px] border-b-[1px] border-[#292929]">
          <div className="text-center text-sm font-medium uppercase tracking-wide">
            {important_information_for_marq}
            <span className="pl-3">∘</span>
          </div>
        </Marquee>
      </div>

      {/* Tabs section with Marquee carousels */}
      <div className="mt-8">
        <Tabs
          defaultValue="news"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex  items-center justify-between mb-5">
            <TabsList className="bg-secondary py-6 rounded-lg">
              <TabsTrigger value="news" className="px-6 py-2.5">
                News
              </TabsTrigger>
              <TabsTrigger value="notices" className="px-6 py-2.5">
                Notices
              </TabsTrigger>
            </TabsList>

            <div className="ml-auto">
              <TabsContent value="news" className="m-0 inline-flex">
                <Link href="/news">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent flex items-center font-medium hover:bg-transparent hover:text-accent/50"
                  >
                    View all
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </TabsContent>
            </div>

            <TabsContent value="notices" className="m-0 inline-flex">
              <Link href="/notices">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-accent flex items-center font-medium hover:bg-transparent hover:text-accent/50"
                >
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </TabsContent>
          </div>

          <TabsContent value="news" className="relative mt-0">
            <Marquee className="pb-4 [--duration:20s]" pauseOnHover>
              {allNews.map((news) => (
                <div key={news.id} className="mx-2">
                  <Card className="flex-shrink-0 w-[320px] h-[180px] event-card-hover shadow-sm transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-5 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="font-semibold text-base line-clamp-1">
                          {news.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {news.summary}
                        </p>
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/5"
                          onClick={() => openNewsDialog(news)}
                        >
                          Read more
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Marquee>
          </TabsContent>

          <TabsContent value="notices" className="relative mt-0">
            <Marquee className="pb-4 [--duration:20s]" pauseOnHover>
              {allNotices.map((notice) => (
                <div key={notice.id} className="mx-2">
                  <Card className="flex-shrink-0 w-[320px] h-[180px] event-card-hover shadow-sm transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-5 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="font-semibold text-base line-clamp-1">
                          {notice.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {notice.summary}
                        </p>
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/5"
                          onClick={() => openNoticeDialog(notice)}
                        >
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Marquee>
          </TabsContent>
        </Tabs>
      </div>

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

      {/* Upcoming Events section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          <Link
            href="/events"
            className="text-accent text-sm flex items-center font-medium hover:bg-transparent hover:text-accent/50 duration-100"
          >
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="space-y-5 flex flex-col">
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

      {/* FOOTER section */}
      <div className="flex justify-center items-center h-48 mt-12">
        <div className="px-8 py-10 rounded-xl w-full text-center">
          <h1
            className={`${anton.className} text-6xl text-center font-extrabold text-[#3a3a3a] opacity-80 tracking-wider`}
          >
            EPIC VIBES <br /> ZERO STRESS
          </h1>
        </div>
      </div>
    </div>
  );
}
