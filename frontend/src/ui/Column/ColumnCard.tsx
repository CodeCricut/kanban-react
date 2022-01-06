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
import { useColumnIssues } from "../../application/getColumnIssues/hook";
import { IssueCard } from "../Issue/IssueCard";

type StylesType = {
    container: SxProps;
    header: SxProps & {
        info: SxProps;
        numIssues: SxProps;
        colName: SxProps;
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
        alignItems: "center",
        justifyContent: "space-between",
        info: {
            display: "flex",
            alignItems: "baseline",
            height: "fit-content",
        },
        numIssues: {
            fontSize: "1rem",
            backgroundColor: "grey.300",
            borderRadius: "50%",
            marginRight: 1,
            textAlign: "center",
            width: "1.5rem",
        },
        colName: {
            fontSize: "1.25rem",
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

    const issues = useColumnIssues(column.id ?? "");

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
                    <Typography sx={styles.header.numIssues}>
                        {column.issues?.length ?? 0}
                    </Typography>
                    <Typography sx={styles.header.colName}>
                        {column.name}
                    </Typography>
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
                {issues.map((issue) => (
                    <IssueCard issue={issue} key={issue.id} />
                ))}
                <AddIssueCard handleAdd={handleAddIssue} />
            </Box>
        </Card>
    );
};
