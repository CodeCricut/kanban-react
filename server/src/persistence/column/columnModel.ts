import mongoose from "mongoose";

export const COLUMN_MODEL_NAME = "Column";

const ColumnSchema = new mongoose.Schema({
    // TODO
});

export const ColumnModel = mongoose.model(COLUMN_MODEL_NAME, ColumnSchema);
