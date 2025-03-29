"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  BookOpen,
  Calendar,
  LogOut,
  Settings,
  Ticket,
  User,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function ProfilePage() {
  // Mock user data
  const user = {
    username: "Alex",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@college.edu",
    college: "Engineering",
    clubs: ["Computer Science Club", "Robotics Temagcam", "Chess Club"],
    avatar: "",
  };
  user.avatar = `https://robohash.org/${user.username}`;

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 border-4 border-accent/50">
          <AvatarImage
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="text-muted-foreground">@{user.username}</p>
      </div>

      <Card className="event-card-hover">
        <CardHeader className="bg-secondary/50 rounded-t-lg">
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Your account details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                First Name
              </p>
              <p>{user.firstName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Name
              </p>
              <p>{user.lastName}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">
                College
              </p>
              <p>{user.college}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        variant="outline"
        className="w-full flex items-center gap-2 border-accent text-accent hover:bg-accent/50 hover:text-white/80"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
