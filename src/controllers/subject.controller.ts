import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import subjectService from "../services/subject.service";
import { CreateSubjectDto } from "../interfaces/subject.interface";

class SubjectController {
      getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
          const subjects = await subjectService.getAll();
          res.json(subjects);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Unknown error";
          res.status(500).json({ error: message });
        }
      };

      getById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
          const id = Number(req.params.id);
        //   if (!Number.isInteger(id) || id <= 0) {
        //     res.status(400).json({ error: "invalid id" });
        //     return;
        //   } TODO: revisar

          const subject = await subjectService.getById(id);
          if (!subject) {
            res.status(404).json({ error: "Subject not found" });
            return;
          }
          res.json(subject);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Unknown error";
          res.status(500).json({ error: message });
        }
      };

    createSubject = async (
        req: Request<Record<string, string>, unknown, CreateSubjectDto>,
        res: Response
    ): Promise<void> => {
        try {
            const subject = await subjectService.create(req.body);
            res.status(201).json(subject);
        } catch (err: unknown) {
            if (err instanceof ValidationError) {
                res.status(400).json({ error: err.errors.map((e) => e.message) });
                return;
            }
            const message = err instanceof Error ? err.message : "Unknown error";
            res.status(500).json({ error: message });
        }
    };
}

export default new SubjectController();