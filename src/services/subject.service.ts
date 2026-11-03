import { CreateSubjectDto } from "../interfaces/subject.interface";
import { Subject } from "../models";
import subjectRepository from "../repositories/subject.repository";

class SubjectService {
    getAll = (): Promise<Subject[]> => subjectRepository.findAll();

    getById = (id: number): Promise<Subject | null> => subjectRepository.findById(id);

    create = (data: CreateSubjectDto): Promise<Subject> => subjectRepository.create(data);
}

export default new SubjectService();
