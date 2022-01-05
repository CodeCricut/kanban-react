import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../shared/itemTypes";

export const ColumnContainer = () => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: ItemTypes.COLUMN,
        drop: (item) => handleDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const handleDrop = (item: any) => {
        console.log(item);
    };

    return (
        <div
            ref={dropRef}
            role="Dustbin"
            style={{ backgroundColor: isOver ? "blue" : "white" }}
        >
            drop container
        </div>
    );
};
