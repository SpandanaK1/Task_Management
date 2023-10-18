const { logger } = require('../cb-frs-blackbird-util'); // needed to change in JPMC
const knex = require('knex');
const fs = require('fs');
const path = require('path');

const paymentrequest = require('./paymentrequest')
const task = require('./task')

//Should be modified in JPMC
const connection = knex({
  client: 'postgresql',
  connection: async () => ({
    host: 'postgres-banking-service.carttg0vyatu.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'BluePal123#',
  })
})

connection.on('query', (query) =>
{
  logger.log({
    level: 'debug',
    message: 'Postgres query',
    meta: { query }
  });
})

connection.on('query-error', (error, query) =>
{
  logger.log({
    level: 'error',
    message: 'DBE01: Postgres query error',
    meta: { error, query }
  });
})

module.exports = {

  paymentrequest : paymentrequest(connection),
  task : task(connection)

}