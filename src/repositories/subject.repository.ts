import { CreateSubjectDto } from "../interfaces/subject.interface";
import { Subject } from "../models";

class SubjectRepository {
    findAll = async (): Promise<Subject[]> => {
        return Subject.findAll();
    };

    findById = async (id: number): Promise<Subject | null> => {
        return Subject.findByPk(id);
    };

    create = async (data: CreateSubjectDto): Promise<Subject> => {
        const {name, classroom, floor, teacher1, teacher2, dayOfWeek, startTime } = data;
        return Subject.create({
            name,
            classroom,
            floor,
            teacher1,
            teacher2,
            dayOfWeek,
            startTime,
        });
    };
}

export default new SubjectRepository();
