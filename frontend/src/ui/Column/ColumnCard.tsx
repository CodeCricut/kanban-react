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
import {
    DragSourceMonitor,
    DropTargetMonitor,
    useDrag,
    useDrop,
} from "react-dnd";
import { ItemTypes } from "../shared/itemTypes";

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
    index: number;
    moveColumn: (columnId: string, toIndex: number) => void;
};

export const ColumnCard = ({
    column,
    project,
    index,
    moveColumn,
}: ColumnProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.COLUMN,
        item: { id: column.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        canDrop: (item: any, monitor: DropTargetMonitor) => {
            if (!ref.current) return false;
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replate items with themselves
            if (dragIndex === hoverIndex) return false;

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // Get horizontal middle
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the left
            const hoverClientX = clientOffset?.x ?? 0 - hoverBoundingRect.left;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX)
                return false;

            return true;
        },
        drop: (item: any) => {
            const columnId: string = item.id;
            const hoverIndex = index;
            // Perform the action
            moveColumn(columnId, hoverIndex);
        },
    });

    drag(drop(ref));

    const modalService = useModalService();

    const handleAddIssue = () => {
        console.log("add issue");
    };

    const handleEditIssue = () => {
        modalService.setModal(
            <EditColumnModal column={column} projectId={project.id ?? ""} />
        );
    };

    return (
        <div style={{ opacity: isDragging ? 0.5 : 1 }} ref={ref}>
            <div role="handle" ref={drag}>
                <Card sx={styles.container} elevation={2}>
                    <Box sx={styles.header}>
                        <Box sx={styles.header.info}>
                            <Typography>
                                {column.issues?.length ?? 0}
                            </Typography>
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
                        <AddIssueCard
                            handleAdd={() => console.log("add issue")}
                        />
                    </Box>
                </Card>
            </div>
        </div>
    );
};
