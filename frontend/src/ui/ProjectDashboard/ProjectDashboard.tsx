import { Box, Button, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Project } from "../../domain/project";
import { useModalService } from "../../services/modalService";
import { AddColumnModal } from "../AddColumn";
import { AddColumnCard } from "../AddColumn/AddColumnCard";
import { EditProject } from "../EditProject";

type StylesType = {
    container: SxProps;
    header: SxProps;
    headerInfo: SxProps;
    content: SxProps;
};
const styles: StylesType = {
    container: {
        display: "flex",
        flexDirection: "column",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "30 0",
    },
    headerInfo: {},
    content: {
        backgroundColor: "red",
        minHeight: 200,
    },
};

export const ProjectDashboard = ({ project }: { project: Project }) => {
    const { setModal } = useModalService();

    const handleAdd = () => {
        setModal(<AddColumnModal project={project} />);
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.header}>
                <Box sx={styles.headerInfo}>
                    <Typography variant="h5">{project.name}</Typography>
                    <Typography variant="subtitle2">
                        {project.description}
                    </Typography>
                </Box>
                <Box>
                    <Button
                        onClick={() =>
                            setModal(<EditProject project={project} />)
                        }
                    >
                        More info...
                    </Button>
                </Box>
            </Box>
            <Box sx={styles.content}>
                <AddColumnCard handleAdd={handleAdd} />
            </Box>
        </Box>
    );
};
