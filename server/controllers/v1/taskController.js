const { logger } = require('../../cb-frs-blackbird-util'); // needed to change in JPMC
const { task } = require('../../databases/tables');
const taskService = require('../../services/taskService');
const {  validteTaskAddParams, } = require('../../../utils/validator');
const path = require('path');

const getTasks = async (_, res, next) =>
{
  try
  {
    const Task = await taskService.getTasks();
    logger.log({
      level: 'info',
      message: 'Tasks - taskService',
      meta: { Task }
    });
    res.json(task);
  }
  catch (error)
  {
    logger.log({
      level: 'error',
      message: 'task - error',
      meta: { error }
    });
    next(error);
  }
};  

const addTask = async (req, res, next) =>
{
    try
    {
        const reqBody = req.body;
        const { error } = validteTaskAddParams(reqBody);

        if(error)
        {
            next(error);
        }
        else
        {
            const tasks = await taskService.addTask(reqBody);
        
            logger.log({
                level: 'info',
                message: 'taskController addTask - resp',
                meta: { tasks } 
            });
            res.json(task);
        }
    }
    catch(error)
    {
        logger.log({
            level: 'error',
            message: 'taskController addTask - error',
            meta: { error }
        });
        next(error);
    }
};

module.exports = {
    getTasks,
    addTask
  }