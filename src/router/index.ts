import { Router, Request, Response } from "express";
import { generatorController } from "controllers";

const router = Router();

router.get("/test", generatorController.test);

// Fallback route to handle all other requests to /api/*
router.get("*", (req: Request, res: Response) => {
  res.send("Route not found");
});

export default router;
