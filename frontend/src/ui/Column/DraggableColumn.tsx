import React, { useMemo, useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { Project } from "../../domain/project";
import { ItemTypes, ItemType } from "../shared/itemTypes";
import { Column } from "../../domain/column";
import { ColumnCard } from "./ColumnCard";
import { Box, Card } from "@mui/material";
import { SxProps } from "@mui/system";
import { useRelocateColumn } from "../../application/relocateColumn/hook";

type MakeOutlineStyles = {
    (isOver: boolean, canDrop: boolean, itemType: ItemType): SxProps;
};

const makeCardStyles: MakeOutlineStyles = (
    isOver: boolean,
    canDrop: boolean,
    itemType: ItemType
) => ({
    border: () => {
        if (!isOver) return "1px solid"; // default
        return "2px solid"; // if hovering drop target
    },
    borderColor: () => {
        if (!isOver) return "grey.300";
        if (canDrop) return "primary.light";
        else return itemType === ItemTypes.COLUMN ? "error.light" : "grey.300";
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
            item: { id: column.id, index, type: ItemTypes.COLUMN },
        }),
        [column, index]
    );

    const [{ isOver, canDrop, itemType }, drop] = useDrop({
        accept: [ItemTypes.COLUMN, ItemTypes.ISSUE],
        canDrop: (item: any, monitor: DropTargetMonitor) => {
            if (!ref.current) return false;
            if (item.type == ItemTypes.COLUMN) {
                const dragIndex = item.index;
                const hoverIndex = index;

                // Don't replace items with themselves
                return !(dragIndex === hoverIndex);
            } else if (item.type == ItemTypes.ISSUE) {
                // Only allow issue to be dropped in EMPTY column
                console.dir(column);
                return column.issues?.length === 0;
            }
            return false;
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
            itemType: monitor.getItemType() as ItemType,
        }),
    });

    drag(drop(ref));

    const cardStyles = useMemo(
        () => makeCardStyles(isOver, canDrop, itemType),
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
