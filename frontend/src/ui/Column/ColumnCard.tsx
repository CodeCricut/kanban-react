import React, { useRef } from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SxProps } from "@mui/system";
import { columnStyles } from "../shared/columnStyles";
import { Column as ColumnModel } from "../../domain/column";
import { AddIssueCard } from "../AddIssue/AddIssueCard";
import { useModalService } from "../../services/modalService";
import { EditColumnModal } from "../EditColumn";
import { Project } from "../../domain/project";
import { Theme } from "@mui/material";

import {
    DragSourceMonitor,
    DropTargetMonitor,
    useDrag,
    useDrop,
} from "react-dnd";
import { ItemTypes } from "../shared/itemTypes";
import { AddIssueModal } from "../AddIssue";

type StylesType = {
    container: SxProps;
    header: SxProps & {
        info: SxProps;
    };
    content: SxProps;
};

const styles: StylesType = {
    container: {
        ...columnStyles,
        display: "flex",
        flexDirection: "column",
        padding: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        info: {
            display: "flex",
            "& > *": {
                fontSize: "1.25rem",
                marginRight: 1,
            },
        },
    },
    content: {},
};

type ColumnProps = {
    column: ColumnModel;
    project: Project;
    cardStyles: SxProps;
};

export const ColumnCard = ({ column, project, cardStyles }: ColumnProps) => {
    const modalService = useModalService();

    const handleAddIssue = () => {
        modalService.setModal(<AddIssueModal column={column} />);
    };

    const handleEditIssue = () => {
        modalService.setModal(
            <EditColumnModal column={column} projectId={project.id ?? ""} />
        );
    };

    return (
        <Card
            sx={{ ...styles.container, ...cardStyles } as SxProps}
            elevation={2}
        >
            <Box sx={styles.header}>
                <Box sx={styles.header.info}>
                    <Typography>{column.issues?.length ?? 0}</Typography>
                    <Typography>{column.name}</Typography>
                </Box>
                <Box>
                    <IconButton onClick={handleAddIssue}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={handleEditIssue}>
                        <MoreHorizIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={styles.content}>
                <AddIssueCard handleAdd={handleAddIssue} />
            </Box>
        </Card>
    );
};
