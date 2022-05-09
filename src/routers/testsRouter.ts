import { Router } from "express";

const testsRouter = Router();

testsRouter.post("/reset-database");
testsRouter.post("/seed/recommendations");

export default testsRouter;