import { Request, Response } from "express";
import studentService from "../services/student.service";
import { CreateStudentDto } from "../interfaces/student.interface";
import { UniqueConstraintError, ValidationError } from "sequelize";

class StudentController {

  createStudent = async (
    req: Request<Record<string, string>, unknown, CreateStudentDto>,
    res: Response
  ): Promise<void> => {
    try {
      const student = await studentService.create(req.body);
      res.status(201).json(student); //TODO: pasar a DTO
    } catch (err: unknown) {
      if (err instanceof UniqueConstraintError) {
        res.status(409).json({ error: "uid or email already exists" });
        return;
      }
      if (err instanceof ValidationError) {
        res.status(400).json({ error: err.errors.map((e) => e.message) });
        return;
      }
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ error: message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const students = await studentService.getAll();
      res.json(students);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ error: message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Id must be a positive integer" });
        return;
      }
      const student = await studentService.getById(id);
      if (!student) {
        res.status(404).json({ error: "student not found" });
        return;
      }
      res.json(student);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ error: message });
    }
  };

  getByUid = async (req: Request, res: Response): Promise<void> => {
    try {
      const uid = req.params.uid as string;
      const student = await studentService.getByUid(uid);
      if (!student) {
        res.status(404).json({ error: "student not found" });
        return;
      }
      res.json(student);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ error: message });
    }
  };

  getDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const { uid } = req.params;
      const dashboard = await studentService.getDashboard(uid as string);
      if (!dashboard) {
        res.status(404).json({ error: "Student not found" });
        return;
      }
      res.json(dashboard);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}

export default new StudentController();