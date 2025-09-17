import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { isPast, isThisWeek } from "date-fns";
import type { AssignmentWithClass } from "@shared/schema";

export default function StatsCard() {
  const { data: assignments, isLoading } = useQuery<AssignmentWithClass[]>({
    queryKey: ["/api/assignments"],
  });

  const stats = {
    total: assignments?.length || 0,
    completed: assignments?.filter((a) => a.completed).length || 0,
    dueThisWeek: assignments?.filter(
      (a) => !a.completed && isThisWeek(new Date(a.dueDate))
    ).length || 0,
    overdue: assignments?.filter(
      (a) => !a.completed && isPast(new Date(a.dueDate)) && !isThisWeek(new Date(a.dueDate))
    ).length || 0,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 className="text-green-600 h-5 w-5" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-6" />
              </div>
            ))
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Assignments</span>
                <span className="font-semibold text-slate-900">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Completed</span>
                <span className="font-semibold text-green-600">{stats.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Due This Week</span>
                <span className="font-semibold text-yellow-600">{stats.dueThisWeek}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Overdue</span>
                <span className="font-semibold text-red-600">{stats.overdue}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
