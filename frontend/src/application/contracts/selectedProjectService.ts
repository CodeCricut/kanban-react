import { Project } from "../../domain/project";

export interface ISelectedProjectService {
    selectedProject: Project | null;
    setSelectedProject: (project: Project) => void;
    unselectProject: () => void;
}
