import { useState } from "react";
import { Plus, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import AddAssignmentModal from "@/components/add-assignment-modal";
import AddClassModal from "@/components/add-class-modal";
import UpcomingAssignments from "@/components/upcoming-assignments";
import ClassesList from "@/components/classes-list";
import StatsCard from "@/components/stats-card";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-3 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setIsAddAssignmentOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Assignment
                  </Button>
                  <Button
                    onClick={() => setIsAddClassOpen(true)}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Add Class
                  </Button>
                  <Button
                    onClick={() => setLocation("/calendar")}
                    variant="secondary"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Calendar View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Assignments */}
          <UpcomingAssignments />

          {/* Sidebar */}
          <div className="space-y-6">
            <ClassesList onAddClass={() => setIsAddClassOpen(true)} />
            <StatsCard />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddAssignmentModal
        open={isAddAssignmentOpen}
        onOpenChange={setIsAddAssignmentOpen}
      />
      <AddClassModal
        open={isAddClassOpen}
        onOpenChange={setIsAddClassOpen}
      />
    </div>
  );
}
