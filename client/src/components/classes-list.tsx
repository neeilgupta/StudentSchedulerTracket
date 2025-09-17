import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Class, AssignmentWithClass } from "@shared/schema";

interface ClassesListProps {
  onAddClass: () => void;
}

export default function ClassesList({ onAddClass }: ClassesListProps) {
  const { data: classes, isLoading: classesLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const { data: assignments } = useQuery<AssignmentWithClass[]>({
    queryKey: ["/api/assignments"],
  });

  const getAssignmentCount = (classId: number) => {
    return assignments?.filter(
      (assignment) => assignment.classId === classId && !assignment.completed
    ).length || 0;
  };

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <GraduationCap className="text-purple-600 h-5 w-5" />
          Your Classes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {classesLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-4 ml-auto" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))
          ) : classes?.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No classes yet</h3>
              <p className="text-slate-600 mb-4">Add your first class to get started with assignments.</p>
            </div>
          ) : (
            classes?.map((cls) => {
              const assignmentCount = getAssignmentCount(cls.id);
              return (
                <div
                  key={cls.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-slate-900">{cls.name}</h4>
                    <p className="text-sm text-slate-600">{cls.code}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-primary">{assignmentCount}</span>
                    <p className="text-xs text-slate-500">
                      {assignmentCount === 1 ? "assignment" : "assignments"}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <Button
            onClick={onAddClass}
            variant="outline"
            className="w-full mt-4 text-purple-600 hover:text-purple-700 border-2 border-dashed border-purple-600 hover:border-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Class
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
