import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";

const Drag_and_Drop = () => {
    const [columns, setColumns] = useState({
        columnOne: {
            sectionOne: ["Collection #1 name"],
        },
        columnTwo: {
            sectionOne: [
                "Collection #2 name",
                "Collection #3 name",
                "Collection #4 name",
                "Collection #5 name",
                "Products",
            ],
            sectionTwo: ["Pages"],
        },
    });

    const [draggingItem, setDraggingItem] = useState(null);
    const [draggingSource, setDraggingSource] = useState(null);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [draggingColumn, setDraggingColumn] = useState(null);

    const handleDragStart = (item, source, index) => {
        setDraggingItem(item);
        setDraggingSource(source);
        setDraggingIndex(index);
        setDraggingColumn(source.column);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow drop
    };

    const handleDrop = (target) => {
        if (!draggingItem || !draggingSource) return;

        const updatedColumns = { ...columns };

        // Remove the item from the source section
        const sourceItems = updatedColumns[draggingSource.column][draggingSource.section];
        sourceItems.splice(draggingIndex, 1);

        // Add the item at the correct position in the target section
        const targetItems = updatedColumns[target.column][target.section];
        targetItems.splice(target.index, 0, draggingItem);

        setColumns(updatedColumns);
        setDraggingItem(null);
        setDraggingSource(null);
        setDraggingIndex(null);
        setDraggingColumn(null);
    };

    const getHoveredIndex = (e, items) => {
        const boundingRect = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - boundingRect.top;
        const itemHeight = boundingRect.height / (items.length || 1); // Avoid division by zero
        return Math.min(Math.floor(offsetY / itemHeight), items.length);
    };

    // Utility function to format names
    const formatName = (name) => {
        return name
            .replace(/([A-Z])/g, " $1") // Add a space before each capital letter
            .replace(/(\d+)/g, (match) => ` ${convertNumberToWords(match)}`) // Convert numbers to words
            .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
            .trim(); // Remove leading/trailing spaces
    };

    // Function to convert numbers to words
    const convertNumberToWords = (number) => {
        const words = [
            "Zero",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten",
        ];
        return words[number] || number;
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 mt-5 w-full md:w-1/2 mx-4  md:mx-auto border-2 border-gray-500 rounded-2xl">
            {Object.entries(columns).map(([columnName, sections]) => (
                <div key={columnName} className="flex flex-col w-full">
                    <h2 className="font-bold px-2 py-2">{formatName(columnName)}</h2>
                    <div
                        className={`flex-1 border-2 rounded-2xl ${draggingColumn === columnName ? "border-blue-500" : "border-gray-500"
                            }`}
                    >
                        {Object.entries(sections).map(([sectionName, items]) => (
                            <div
                                key={sectionName}
                                onDragOver={handleDragOver}
                                onDrop={(e) => {
                                    const targetIndex = getHoveredIndex(e, items);
                                    handleDrop({
                                        column: columnName,
                                        section: sectionName,
                                        index: targetIndex,
                                    });
                                }}
                                className="p-2"
                            >
                                <h3 className="font-semibold px-2 mb-2">{formatName(sectionName)}</h3>
                                {items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        draggable
                                        onDragStart={() =>
                                            handleDragStart(item, { column: columnName, section: sectionName }, itemIndex)
                                        }
                                        className={`flex items-center py-1 mb-2 bg-white cursor-move hover:bg-gray-100 px-2 hover:rounded-xl ${draggingItem === item ? "border-blue-500" : "border-gray-200"
                                            }`}
                                    >
                                        <CgMenuGridO className="text-gray-500 mr-2" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Drag_and_Drop;
