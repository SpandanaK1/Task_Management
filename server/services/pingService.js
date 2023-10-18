const { logger } = require('../cb-frs-blackbird-util'); // needed to change in JPMC
const { Transaction } = require('../databases/database');

const getDataCount = async () =>
{
    try
    {
        const totalCount = await Transaction.totalCount();
        logger.log({
            level: 'info',
            message: 'pingService getDataCount - resp',
            meta: { totalCount }
        });
        return totalCount;
    }
    catch (error)
    {
        logger.log({
            level: 'error',
            message: 'pingService getDataCount - error',
            meta: { error }
        })
        throw error;
    }
}

module.exports = {
    getDataCount
};