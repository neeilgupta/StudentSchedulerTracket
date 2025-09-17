import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, getDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { getAssignmentUrgency } from "@/lib/utils";
import type { AssignmentWithClass } from "@shared/schema";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: assignments = [] } = useQuery<AssignmentWithClass[]>({
    queryKey: ["/api/assignments"],
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get all assignments for a specific day
  const getAssignmentsForDay = (day: Date) => {
    return assignments.filter((assignment) =>
      isSameDay(new Date(assignment.dueDate), day)
    );
  };

  // Navigate to previous/next month
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Create calendar grid with proper padding for first day of month
  const createCalendarGrid = () => {
    const firstDayOfWeek = getDay(monthStart); // 0 = Sunday, 1 = Monday, etc.
    const paddingDays = Array(firstDayOfWeek).fill(null);
    return [...paddingDays, ...days];
  };

  const calendarDays = createCalendarGrid();

  const getUrgencyDotColor = (urgency: string) => {
    switch (urgency) {
      case "overdue":
        return "bg-red-500";
      case "due-soon":
        return "bg-yellow-500";
      case "upcoming":
        return "bg-blue-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="border-b border-slate-200">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold text-slate-900">
                Calendar View
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 text-sm font-medium text-slate-900 min-w-[140px] text-center">
                  {format(currentDate, "MMMM yyyy")}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium text-slate-600">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  // Empty padding cell
                  return <div key={index} className="p-3 bg-slate-50 rounded"></div>;
                }
                
                const dayAssignments = getAssignmentsForDay(day);
                const isCurrentDay = isToday(day);
                
                return (
                  <div
                    key={day.toISOString()}
                    className={`p-3 text-center hover:bg-slate-50 rounded cursor-pointer relative min-h-[60px] ${
                      isCurrentDay
                        ? "bg-primary text-white"
                        : "text-slate-900"
                    }`}
                  >
                    <span className="text-sm">
                      {format(day, "d")}
                    </span>
                    
                    {/* Assignment indicators */}
                    {dayAssignments.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {dayAssignments.slice(0, 3).map((assignment, idx) => {
                          const urgency = getAssignmentUrgency(new Date(assignment.dueDate));
                          return (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full ${getUrgencyDotColor(urgency)}`}
                              title={assignment.title}
                            />
                          );
                        })}
                        {dayAssignments.length > 3 && (
                          <div className="text-xs text-slate-500">
                            +{dayAssignments.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-slate-600">Overdue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-600">Due Soon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-600">Upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                <span className="text-slate-600">Other</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
