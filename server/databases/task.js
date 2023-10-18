const tables = require('./tables');

const task = function productQueries(knex)
{
  const totalCount = () => knex(tables.task).count('*');
  const getTasks = () => knex(tables.task).select('*')
  const addTask = (body) => knex(tables.task).insert(body).returning('*');
  

  return {
    totalCount,
    getTasks,
    addTask
  };
};

module.exports = task;