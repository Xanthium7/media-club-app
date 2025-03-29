"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Bell, Calendar } from "lucide-react";
import Link from "next/link";

// Sample comprehensive notices data
const allNoticesData = [
  {
    id: 1,
    title: "Registration Deadline",
    summary: "Fall semester registration closes on August 15th.",
    content:
      "This is a reminder that course registration for the Fall 2023 semester will close on August 15th at 11:59 PM. After this deadline, students will need to request special permission from the Registrar's Office to make schedule changes. Please ensure all financial holds are cleared before attempting to register. Academic advisors are available for last-minute consultations through August 14th. Contact the Registration Office at ext. 2345 with any questions.",
    date: "2023-08-01",
    importance: "high",
    deadline: "2025-08-15",
  },
  {
    id: 2,
    title: "Dorm Maintenance",
    summary: "Scheduled maintenance in West Hall on July 10-12.",
    content:
      "Facilities Management will be conducting essential maintenance in West Hall from July 10-12. This will include plumbing updates, fire safety inspections, and HVAC servicing. Students currently residing in West Hall will need to vacate their rooms between 9 AM and 4 PM each day. A temporary study and relaxation space will be available in the East Hall common room during this time. Personal belongings can remain in the rooms, but should be secured. For questions or concerns, please contact Housing Services at housing@university.edu.",
    date: "2023-07-01",
    importance: "medium",
    deadline: "2025-07-10",
  },
  {
    id: 3,
    title: "Financial Aid Application Deadline",
    summary: "FAFSA submission deadline for next academic year is approaching.",
    content:
      "The priority deadline for FAFSA (Free Application for Federal Student Aid) submission for the 2023-2024 academic year is December 1st. Students who submit their FAFSA by this date will be given priority consideration for all federal, state, and institutional aid programs. The Financial Aid Office will be holding FAFSA completion workshops every Wednesday in November from 2-4 PM in the Student Services Building, Room 203. Please bring your and your parent's 2021 tax information if you are a dependent student.",
    date: "2023-11-01",
    importance: "high",
    deadline: "2025-12-01",
  },
  {
    id: 4,
    title: "Library Book Return",
    summary: "All library books must be returned before semester end.",
    content:
      "All borrowed library materials must be returned to the University Library by December 20th, the last day of the Fall semester. Unreturned items will result in holds being placed on student accounts, which may affect spring registration and transcript requests. If you need to keep materials over the break, please visit the library circulation desk to request a vacation extension. Digital resources will remain accessible throughout the winter break.",
    date: "2023-11-30",
    importance: "medium",
    deadline: "2025-12-20",
  },
  {
    id: 5,
    title: "Health Insurance Verification",
    summary: "Proof of health insurance required for all students.",
    content:
      "All students must submit proof of adequate health insurance coverage by September 15th or enroll in the University Student Health Insurance Plan. Students who do not take action by this deadline will be automatically enrolled in the University plan and charged the associated premium of $1,250 per semester. To submit your insurance information or to waive university coverage, log in to the Student Health Portal. International students are required to enroll in the University plan unless they have a U.S.-based insurance plan that meets all university requirements.",
    date: "2023-08-25",
    importance: "high",
    deadline: "2025-09-15",
  },
  {
    id: 6,
    title: "Campus Parking Permits",
    summary: "New parking permits available for purchase starting August 1st.",
    content:
      "Parking permits for the 2023-2024 academic year will be available for purchase beginning August 1st through the Transportation Services website. Prices remain unchanged from last year: $350 for academic year commuter permits, $450 for residential permits, and $200 for evening-only permits. The number of available permits is limited, particularly for premium lots, so early purchase is recommended. All permits from the previous academic year expire on August 31st. Vehicles without valid permits parked on campus after this date will be subject to citation.",
    date: "2023-07-20",
    importance: "medium",
    deadline: "2025-08-31",
  },
];

export default function NoticesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);

  // Sort notices by importance and then by deadline (closest first)
  const sortedNotices = [...allNoticesData].sort((a, b) => {
    const importanceOrder = { high: 0, medium: 1, low: 2 };
    if (
      importanceOrder[a.importance as keyof typeof importanceOrder] !==
      importanceOrder[b.importance as keyof typeof importanceOrder]
    ) {
      return (
        importanceOrder[a.importance as keyof typeof importanceOrder] -
        importanceOrder[b.importance as keyof typeof importanceOrder]
      );
    }
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  const openNoticeDialog = (notice: any) => {
    setSelectedNotice(notice);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineString: string) => {
    const deadline = new Date(deadlineString).getTime();
    const today = new Date().getTime();
    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="container px-6 py-8 max-w-5xl mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Important Notices</h1>
      </div>

      <div className="grid gap-6 mb-10">
        {sortedNotices.map((notice) => (
          <Card
            key={notice.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  {notice.importance === "high" && (
                    <Bell className="h-4 w-4 mr-2 text-accent animate-pulse" />
                  )}
                  <h2 className="text-xl font-semibold">{notice.title}</h2>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  {/* <Calendar className="h-4 w-4 mr-1" /> */}
                  <span>Posted: {formatDate(notice.date)}</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{notice.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {notice.deadline && (
                    <div className="text-sm">
                      <span className="font-medium">Deadline: </span>
                      <span
                        className={`${
                          getDaysRemaining(notice.deadline) < 7
                            ? "text-red-500 font-medium"
                            : ""
                        }`}
                      >
                        {formatDate(notice.deadline)}
                        {getDaysRemaining(notice.deadline) < 30 && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                            {getDaysRemaining(notice.deadline)} days left
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => openNoticeDialog(notice)}
                  variant="outline"
                  className="transition-all hover:bg-black hover:text-white"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl rounded-lg border-2 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedNotice?.title}
            </DialogTitle>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Posted:{" "}
                  {selectedNotice?.date && formatDate(selectedNotice.date)}
                </span>
              </div>
              {selectedNotice?.deadline && (
                <div className="flex items-center font-medium">
                  <span>Deadline: {formatDate(selectedNotice.deadline)}</span>
                  {getDaysRemaining(selectedNotice.deadline) < 30 && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                      {getDaysRemaining(selectedNotice.deadline)} days left
                    </span>
                  )}
                </div>
              )}
            </div>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="leading-relaxed">{selectedNotice?.content}</p>
            <div className="pt-4 border-t text-sm text-muted-foreground">
              <p className="font-medium">Important Notice</p>
              <p>
                Please take note of the dates and requirements mentioned above.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
