import { Box, SxProps } from "@mui/material";
import React, { useMemo, useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { Column } from "../../domain/column";
import { Issue } from "../../domain/issue";
import { ItemTypes } from "../shared/itemTypes";
import { IssueCard } from "./IssueCard";

type DraggableIssueProps = {
    issue: Issue;
    column: Column;
    index: number;
};

type IssueItemType = {
    id: string;
    index: number;
    oldColumnId: string;
};

export const DraggableIssue = (props: DraggableIssueProps) => {
    const { issue, column, index } = props;
    const ref = useRef<HTMLDivElement>(null);

    const [, drag] = useDrag(
        () => ({
            type: ItemTypes.ISSUE,
            item: { id: issue.id, index, oldColumnId: column.id },
        }),
        [issue, index]
    );

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.ISSUE,
        canDrop: (item: IssueItemType, monitor: DropTargetMonitor) => {
            if (!ref.current) return false;
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replate items with themselves
            if (item.oldColumnId === column.id && dragIndex === hoverIndex)
                return false;

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
        drop: (item: IssueItemType) => {
            const { id, oldColumnId } = item;
            const newColumnId = column.id ?? "";
            const hoverIndex = index;
            moveIssue(id, oldColumnId, newColumnId, hoverIndex);
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
            <IssueCard issue={issue} column={column} cardStyles={cardStyles} />
        </Box>
    );

    function moveIssue(
        issueId: string,
        oldColumnId: string,
        newColumnId: string,
        toIndex: number
    ) {
        console.log(
            `move issue=${issueId} from column=${oldColumnId} to column=${newColumnId} at index=${toIndex}`
        );
    }
};

function makeCardStyles(isOver: boolean, canDrop: boolean): SxProps {
    return {
        border: (theme) => {
            if (!isOver) return "1px solid"; // default
            return "2px solid"; // if hovering drop target
        },
        borderColor: (theme) => {
            if (!isOver) return "grey.300";
            if (canDrop) return "primary.light";
            return "error.light";
        },
    };
}
