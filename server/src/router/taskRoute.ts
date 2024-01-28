import { Router } from 'express';
import { createTask, getTask, getTaskId, updateTaskId, deleteTask } from "../controller/taskController.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = Router();

router.post('/task', authMiddleware, createTask);
router.get('/task', authMiddleware, getTask);
router.get('/task/:id', authMiddleware, getTaskId);
router.put('/task/:id', authMiddleware, updateTaskId);
router.delete('/task/:id', authMiddleware, deleteTask);


export default router;