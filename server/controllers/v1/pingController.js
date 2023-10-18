const { logger } = require('../../cb-frs-blackbird-util'); // needed to change in JPMC
const pingService = require('../../services/pingService');

const getAppStatus = (_, res) =>
{
  res.status(200).json({ status: 'Success' });
};

const getDbStatus = async (_, res, next) =>
{
  try
  {
    const totalCount = await pingService.getDataCount();
    logger.log({
      level: 'info',
      message: 'getDbStatus - totalCount',
      meta: { totalCount }
    });
    res.json(totalCount)
  } catch (error)
  {
    logger.log({
      level: 'error',
      message: 'getDbStatus - error',
      meta: { error }
    });
    next();
  }
};

module.exports = {
  getAppStatus,
  getDbStatus
}
