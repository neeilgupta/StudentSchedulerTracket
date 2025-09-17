import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AssignmentCard from "./assignment-card";
import type { AssignmentWithClass } from "@shared/schema";

export default function UpcomingAssignments() {
  const { data: assignments, isLoading } = useQuery<AssignmentWithClass[]>({
    queryKey: ["/api/assignments"],
  });

  const upcomingAssignments = assignments
    ?.filter((assignment) => !assignment.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) || [];

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Clock className="text-primary h-5 w-5" />
          Upcoming Assignments
        </CardTitle>
        <p className="text-sm text-slate-600 mt-1">Sorted by due date</p>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border-l-4 border-slate-200 bg-slate-50 rounded-r-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : upcomingAssignments.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No upcoming assignments</h3>
            <p className="text-slate-600">You're all caught up! Add some assignments to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
            {upcomingAssignments.length > 4 && (
              <div className="text-center pt-4">
                <Button variant="link" className="text-primary hover:text-blue-700">
                  View All Assignments
                  <i className="fas fa-arrow-right ml-1"></i>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
