import React, { useMemo, useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { Project } from "../../domain/project";
import { ItemTypes } from "../shared/itemTypes";
import { Column } from "../../domain/column";
import { ColumnCard } from "./ColumnCard";
import { Box, Card } from "@mui/material";
import { SxProps } from "@mui/system";
import { useRelocateColumn } from "../../application/relocateColumn/hook";

type MakeOutlineStyles = {
    (isOver: boolean, canDrop: boolean): SxProps;
};

const makeCardStyles: MakeOutlineStyles = (
    isOver: boolean,
    canDrop: boolean
) => ({
    border: (theme) => {
        if (!isOver) return "1px solid"; // default
        return "2px solid"; // if hovering drop target
    },
    borderColor: (theme) => {
        if (!isOver) return "grey.300";
        if (canDrop) return "primary.light";
        return "error.light";
    },
});

type DraggableColumnProps = {
    column: Column;
    project: Project;
    index: number;
};

export const DraggableColumn = ({
    column,
    project,
    index,
}: DraggableColumnProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const relocateColumn = useRelocateColumn();

    const [, drag] = useDrag(
        () => ({
            type: ItemTypes.COLUMN,
            item: { id: column.id, index },
        }),
        [column, index]
    );

    const [{ isOver, canDrop }, drop] = useDrop({
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
        drop: async (item: any) => {
            const columnId: string = item.id;
            const hoverIndex = index;

            // TODO: technically, I think this is moving the column at the drop zone to the column from the drag start
            await relocateColumn(columnId, project.id ?? "", hoverIndex);
        },
        collect: (monitor: DropTargetMonitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    drag(drop(ref));

    const cardStyles = useMemo(
        () => makeCardStyles(isOver, canDrop),
        [isOver, canDrop]
    );

    return (
        <Box ref={ref} sx={{ display: "inline", width: "fit-content" }}>
            <ColumnCard
                project={project}
                column={column}
                cardStyles={cardStyles}
            />
        </Box>
    );
};
