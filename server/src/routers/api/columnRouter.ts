import { Router } from "express";
import { ColumnController } from "../../controllers/columnController";

export const makeColumnRouter = (columnController: ColumnController) => {
    const router = Router();

    router.put("/edit/:id", columnController.editColumn);

    return router;
};
