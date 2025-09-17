import { classes, assignments, type Class, type Assignment, type InsertClass, type InsertAssignment, type AssignmentWithClass } from "@shared/schema";

export interface IStorage {
  // Classes
  getClasses(): Promise<Class[]>;
  getClass(id: number): Promise<Class | undefined>;
  createClass(classData: InsertClass): Promise<Class>;
  updateClass(id: number, classData: Partial<InsertClass>): Promise<Class | undefined>;
  deleteClass(id: number): Promise<boolean>;

  // Assignments
  getAssignments(): Promise<Assignment[]>;
  getAssignmentsWithClasses(): Promise<AssignmentWithClass[]>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  createAssignment(assignmentData: InsertAssignment): Promise<Assignment>;
  updateAssignment(id: number, assignmentData: Partial<InsertAssignment>): Promise<Assignment | undefined>;
  deleteAssignment(id: number): Promise<boolean>;
  getAssignmentsByClass(classId: number): Promise<Assignment[]>;
}

export class MemStorage implements IStorage {
  private classes: Map<number, Class>;
  private assignments: Map<number, Assignment>;
  private currentClassId: number;
  private currentAssignmentId: number;

  constructor() {
    this.classes = new Map();
    this.assignments = new Map();
    this.currentClassId = 1;
    this.currentAssignmentId = 1;
  }

  // Classes
  async getClasses(): Promise<Class[]> {
    return Array.from(this.classes.values());
  }

  async getClass(id: number): Promise<Class | undefined> {
    return this.classes.get(id);
  }

  async createClass(classData: InsertClass): Promise<Class> {
    const id = this.currentClassId++;
    const newClass: Class = { ...classData, id };
    this.classes.set(id, newClass);
    return newClass;
  }

  async updateClass(id: number, classData: Partial<InsertClass>): Promise<Class | undefined> {
    const existingClass = this.classes.get(id);
    if (!existingClass) return undefined;
    
    const updatedClass: Class = { ...existingClass, ...classData };
    this.classes.set(id, updatedClass);
    return updatedClass;
  }

  async deleteClass(id: number): Promise<boolean> {
    return this.classes.delete(id);
  }

  // Assignments
  async getAssignments(): Promise<Assignment[]> {
    return Array.from(this.assignments.values());
  }

  async getAssignmentsWithClasses(): Promise<AssignmentWithClass[]> {
    const assignments = Array.from(this.assignments.values());
    const result: AssignmentWithClass[] = [];

    for (const assignment of assignments) {
      const classData = this.classes.get(assignment.classId);
      if (classData) {
        result.push({
          ...assignment,
          class: classData,
        });
      }
    }

    return result;
  }

  async getAssignment(id: number): Promise<Assignment | undefined> {
    return this.assignments.get(id);
  }

  async createAssignment(assignmentData: InsertAssignment): Promise<Assignment> {
    const id = this.currentAssignmentId++;
    const newAssignment: Assignment = { ...assignmentData, id };
    this.assignments.set(id, newAssignment);
    return newAssignment;
  }

  async updateAssignment(id: number, assignmentData: Partial<InsertAssignment>): Promise<Assignment | undefined> {
    const existingAssignment = this.assignments.get(id);
    if (!existingAssignment) return undefined;
    
    const updatedAssignment: Assignment = { ...existingAssignment, ...assignmentData };
    this.assignments.set(id, updatedAssignment);
    return updatedAssignment;
  }

  async deleteAssignment(id: number): Promise<boolean> {
    return this.assignments.delete(id);
  }

  async getAssignmentsByClass(classId: number): Promise<Assignment[]> {
    return Array.from(this.assignments.values()).filter(
      (assignment) => assignment.classId === classId
    );
  }
}

export const storage = new MemStorage();
