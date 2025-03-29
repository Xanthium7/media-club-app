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
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

// Sample comprehensive news data
const allNewsData = [
  {
    id: 1,
    title: "New Library Hours",
    summary: "The library will now be open until midnight during finals week.",
    content:
      "To support student success during the finals period, the University Library has extended its operating hours. From December 5th to December 19th, the library will remain open until midnight on weekdays and until 10 PM on weekends. Additional study spaces will be available on the second floor, and the quiet study area will be expanded to accommodate more students. Librarians will also offer extended research help hours during this period.",
    date: "2023-12-01",
    importance: "high",
  },
  {
    id: 2,
    title: "Campus Wi-Fi Upgrade",
    summary: "New high-speed Wi-Fi has been installed across all dorms.",
    content:
      "The IT Department has completed the campus-wide Wi-Fi upgrade project. All dormitories, academic buildings, and common areas now feature high-speed 6E Wi-Fi technology, providing speeds up to 2.5 Gbps. The new system includes improved security features and expanded coverage to eliminate dead zones. Students experiencing connectivity issues should contact the IT helpdesk at extension 3456 or submit a ticket through the student portal.",
    date: "2023-11-15",
    importance: "medium",
  },
  {
    id: 3,
    title: "Dean's List Announced",
    summary: "Congratulations to all students who made the Fall Dean's List!",
    content:
      "The Office of Academic Affairs is pleased to announce that 342 students have been named to the Dean's List for the Fall 2023 semester. This recognition is awarded to students who have maintained a GPA of 3.5 or higher while taking at least 12 credit hours. A celebration ceremony will be held on January 15th in the Student Union Ballroom. Family members are invited to attend, and refreshments will be served. The complete list of Dean's List recipients can be found on the university website.",
    date: "2023-12-10",
    importance: "high",
  },
  {
    id: 4,
    title: "New Psychology Course Offerings",
    summary:
      "The Psychology Department is adding five new courses next semester.",
    content:
      "The Department of Psychology has announced five new courses for the Spring 2024 semester. These include Cognitive Neuroscience, Health Psychology, Psychology of Human Sexuality, Advanced Research Methods, and Environmental Psychology. These additions reflect the department's commitment to expanding its curriculum to cover emerging fields within psychology. Prerequisites vary by course, and interested students should consult with their academic advisors during the pre-registration period. Some courses may have limited enrollment, so early registration is encouraged.",
    date: "2023-11-05",
    importance: "medium",
  },
  {
    id: 5,
    title: "Campus Sustainability Initiative",
    summary: "New recycling and composting stations installed across campus.",
    content:
      "As part of our commitment to carbon neutrality by 2030, Facilities Management has installed 25 new three-stream waste stations across campus. These stations separate recyclables, compostables, and landfill waste. Additionally, water bottle refill stations have been added to all academic buildings. The Sustainability Office is seeking student volunteers to serve as Eco-Ambassadors, helping to educate the campus community about these new resources. Interested students can apply through the Sustainability Office website by October 30th.",
    date: "2023-10-20",
    importance: "low",
  },
  {
    id: 6,
    title: "Career Fair Next Month",
    summary: "Over 50 employers will be recruiting at the Spring Career Fair.",
    content:
      "The Career Development Center is hosting the annual Spring Career Fair on February 12th from 10 AM to 3 PM in the Student Recreation Center. More than 50 employers from various industries will be present, offering full-time positions, internships, and networking opportunities. Students should dress professionally and bring multiple copies of their resumes. Resume review workshops will be held during the week prior to the event. For a complete list of participating employers and positions, visit the Career Development Center website.",
    date: "2023-12-15",
    importance: "high",
  },
];

export default function NewsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);

  // Sort news by importance and then by date
  const sortedNews = [...allNewsData].sort((a, b) => {
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
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const openNewsDialog = (news: any) => {
    setSelectedNews(news);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // Specify 'en-US' locale to ensure consistent formatting between server and client
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container px-6 py-8 max-w-5xl mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Campus News</h1>
      </div>

      <div className="grid gap-6 mb-10">
        {sortedNews.map((news) => (
          <Card
            key={news.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold">{news.title}</h2>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(news.date)}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-base mb-4">
                {news.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {news.importance === "high" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent font-medium">
                      Important
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => openNewsDialog(news)}
                  variant="outline"
                  className="transition-all hover:bg-black hover:text-white"
                >
                  Read Full Article
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl rounded-lg border-2 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedNews?.title}</DialogTitle>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1 " />
              <span>{selectedNews?.date && formatDate(selectedNews.date)}</span>
            </div>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="leading-relaxed">{selectedNews?.content}</p>
            <div className="pt-4 border-t text-sm text-muted-foreground">
              <p>
                For more information, contact the Office of Communications at
                communications@university.edu
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
