const tables = require('./tables');

const paymentrequest = function productQueries(knex)
{
  const totalCount = () => knex(tables.paymentrequest).count('*');
  const getpaymentrequest = () => knex(tables.paymentrequest).select('*')
  

  return {
    totalCount,
    getpaymentrequest,

  };
};

module.exports = paymentrequest;