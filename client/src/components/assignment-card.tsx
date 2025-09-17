import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, CheckCircle, TriangleAlert, Clock, Calendar } from "lucide-react";
import {
  formatDueDate,
  getAssignmentUrgency,
  getUrgencyColor,
  getUrgencyTextColor,
  getUrgencyBadgeColor,
  getUrgencyLabel,
} from "@/lib/utils";
import type { AssignmentWithClass } from "@shared/schema";

interface AssignmentCardProps {
  assignment: AssignmentWithClass;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const urgency = getAssignmentUrgency(new Date(assignment.dueDate));

  const toggleCompleteMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("PUT", `/api/assignments/${assignment.id}`, {
        completed: !assignment.completed,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: assignment.completed ? "Assignment marked as incomplete" : "Assignment completed",
        description: assignment.completed
          ? "Assignment has been marked as incomplete."
          : "Great job! Assignment marked as complete.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/assignments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update assignment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteAssignmentMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/assignments/${assignment.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Assignment deleted",
        description: "The assignment has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/assignments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete assignment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getUrgencyIcon = () => {
    switch (urgency) {
      case "overdue":
        return <TriangleAlert className="mr-1 h-3 w-3" />;
      case "due-soon":
        return <Clock className="mr-1 h-3 w-3" />;
      default:
        return <Calendar className="mr-1 h-3 w-3" />;
    }
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-r-lg ${getUrgencyColor(urgency)} ${
        assignment.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="secondary"
              className={`text-xs font-medium ${getUrgencyBadgeColor(urgency)}`}
            >
              {getUrgencyLabel(urgency)}
            </Badge>
            <span className="text-xs text-slate-500">{assignment.class.code}</span>
          </div>
          <h3
            className={`font-medium text-slate-900 ${
              assignment.completed ? "line-through" : ""
            }`}
          >
            {assignment.title}
          </h3>
          {assignment.description && (
            <p className="text-sm text-slate-600 mt-1">{assignment.description}</p>
          )}
          <p className={`text-sm font-medium mt-2 flex items-center ${getUrgencyTextColor(urgency)}`}>
            {getUrgencyIcon()}
            Due: {formatDueDate(new Date(assignment.dueDate))}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-slate-600 p-1"
            onClick={() => {
              // TODO: Implement edit functionality
              toast({
                title: "Edit functionality",
                description: "Edit functionality coming soon!",
              });
            }}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 ${
              assignment.completed
                ? "text-slate-400 hover:text-slate-600"
                : "text-green-600 hover:text-green-700"
            }`}
            onClick={() => toggleCompleteMutation.mutate()}
            disabled={toggleCompleteMutation.isPending}
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
