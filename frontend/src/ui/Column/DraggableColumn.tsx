import React, { useMemo, useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { Project } from "../../domain/project";
import { ItemTypes } from "../shared/itemTypes";
import { Column } from "../../domain/column";
import { ColumnCard } from "./ColumnCard";
import { Box } from "@mui/system";
import { SxProps } from "@mui/system";

const getOutlineColor = (isOver: boolean, canDrop: boolean) => {};

type MakeOutlineStyles = {
    (isOver: boolean, canDrop: boolean): SxProps;
};

const makeCardStyles: MakeOutlineStyles = (
    isOver: boolean,
    canDrop: boolean
) => ({
    border: "2px solid red",
    borderColor: (theme) => {
        if (!isOver) return "transparent";
        if (canDrop) return "primary.main";
        return "danger.main";
    },
});

type DraggableColumnProps = {
    column: Column;
    project: Project;
    index: number;
    moveColumn: (columnId: string, toIndex: number) => void;
};

export const DraggableColumn = ({
    column,
    project,
    index,
    moveColumn,
}: DraggableColumnProps) => {
    const ref = useRef<HTMLDivElement>(null);

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
        drop: (item: any) => {
            const columnId: string = item.id;
            const hoverIndex = index;

            // TODO: technically, I think this is moving the column at the drop zone to the column from the drag start
            moveColumn(columnId, hoverIndex);
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
        <Box ref={ref}>
            <ColumnCard
                project={project}
                column={column}
                cardStyles={cardStyles}
            />
        </Box>
    );
};
