const { logger } = require('../cb-frs-blackbird-util'); // needed to change in JPMC
const  {task} = require('../databases/database');
// const { task } = require('../databases/tables');
const { generateID } = require('../../utils/util');

const getTasks = async () =>
{
    try
    {
        const Task = await task.getTasks();
        logger.log({
            level: 'info',
            message: 'taskService getTasks - resp',
            meta: { Task }
        });
        return task;
    }
    catch (error)
    {
        logger.log({
            level: 'error',
            message: 'taskService getTasks - error',
            meta: { error }
        })
        throw error;
    }
}

const addTask = async (reqBody) => 
{
    try
    {
        let TaskAddParams = {
            id: generateID(),
            project_id : reqBody.project_id,
            user_id : reqBody.user_id,
            description : reqBody.description,
            due_date : reqBody.due_date,
            priority : reqBody.priority,
            status : reqBody.status,
            assigned_to : reqBody.assigned_to,
            created_by : reqBody.created_by
        }

        logger.log({
            level: 'info',
            message: 'taskService addTask - addParams',
            meta: { TaskAddParams }
        });

        const tasks = await task.addTask(TaskAddParams);

        logger.log({
            level: 'info',
            message: 'taskService addTask - resp',
            meta: { task }
        });
        return {
        task : tasks,
        message : "task created successfully"
        }
    }
    catch(error)
    {
        logger.log({
            level: 'error',
            message: 'taskService addTask - error',
            meta: { error }
        })
        throw error;
    }
};

module.exports = {
    getTasks,
    addTask
};