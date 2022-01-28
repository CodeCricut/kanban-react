import { Box, IconButton, Typography, Grid, Paper } from "@mui/material";
import { SxProps } from "@mui/system";
import { Project } from "../../domain/project";
import { useModalService } from "../../services/modalService";
import { AddColumnModal } from "../AddColumn";
import { AddColumnCard } from "../AddColumn/AddColumnCard";
import { EditProject } from "../EditProject";
import { DraggableColumn } from "../Column/DraggableColumn";
import EditIcon from "@mui/icons-material/Edit";

type StylesType = {
    container: SxProps;
    header: SxProps;
    headerInfo: SxProps;
    content: SxProps;
};
const styles: StylesType = {
    container: {
        width: 1,
        height: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        padding: 2,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 1,
    },
    headerInfo: {},
    content: {
        height: 0.75,
        display: "flex",
        flexDirection: {
            xs: "column",
            sm: "row",
        },
        overflowX: {
            xs: "hidden",
            sm: "scroll",
        },
        overflowY: {
            xs: "scroll",
            sm: "hidden",
        },
        padding: 1,
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
                    <IconButton
                        onClick={() =>
                            setModal(<EditProject project={project} />)
                        }
                    >
                        <EditIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={styles.content}>
                {project.columns?.map((col, index) => (
                    <DraggableColumn
                        key={index}
                        column={col}
                        project={project}
                        index={index}
                    />
                ))}
                <AddColumnCard handleAdd={handleAdd} />
            </Box>
        </Box>
    );
};
