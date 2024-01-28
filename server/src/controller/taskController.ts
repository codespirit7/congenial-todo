import { NextFunction, Request, Response } from "express";

import Task from "../model/task.js"

import mongoose from "mongoose";


const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {title } = req.body;

        const user = req.user;

        const newTask = new Task({
          user,
          title,
          completed: false,
        });
    
        const savedTask = await newTask.save();

        res.status(201).json(savedTask);



      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  };

  const getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tasks = await Task.find({user: req.user});
            res.status(200).json(tasks);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
  };

  const getTaskId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
          res.status(400).json({ message: 'Invalid Task ID' });
          return;
        }
    
        const task = await Task.findById(taskId);
    
        if (!task) {
           res.status(404).json({ message: 'Task not found' });
           return;
        }
    
        res.status(200).json(task);

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

const updateTaskId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
           res.status(400).json({ message: 'Invalid Task ID' });
           return;
        }
    
        const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          req.body,
          { new: true }
        );
    
        if (!updatedTask) {
          res.status(404).json({ message: 'Task not found' });
          return;
        }
    
        res.status(200).json(updatedTask);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};


const deleteTask = async(req: Request, res: Response, next: NextFunction): Promise<void> => { 
    try {
        const taskId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
          res.status(400).json({ message: 'Invalid Task ID' });
          return;
        }
    
        const deletedTask = await Task.findByIdAndDelete(taskId);
    
        if (!deletedTask) {
           res.status(404).json({ message: 'Task not found' });
           return;
        }
    
        res.status(204).send({message: "Task Deleted succesfully"});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

export {
    createTask,
    updateTaskId,
    getTask,
    getTaskId,
    deleteTask
}
