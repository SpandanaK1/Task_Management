
const tables = {

  task : 'TM_Task',

};

const prefix = process.env.PG_TABLE_PREFIX;
if (prefix)
{
  Object.keys(tables).forEach((key) =>
  {
    tables[key] = `${prefix}${tables[key]}`;
  })
};
module.exports = tables;