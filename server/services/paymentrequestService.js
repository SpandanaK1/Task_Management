const { logger } = require('../cb-frs-blackbird-util'); // needed to change in JPMC
const  {paymentrequest} = require('../databases/database');
// const documentService  = require('./documentService')
// const htmlTemplate = require('../../utils/htmlTemplate')
// const { generateID } = require('../../utils/util');
// const smtp = require('../services/smtp');
const getpaymentrequest = async () =>
{
    try
    {
        const Paymentrequests = await paymentrequest.getpaymentrequest();
        logger.log({
            level: 'info',
            message: 'paymentrequestService getpaymentrequest - resp',
            meta: { paymentrequest }
        });
        return Paymentrequests;
    }
    catch (error)
    {
        logger.log({
            level: 'error',
            message: 'paymentrequestService getpaymentrequest - error',
            meta: { error }
        })
        throw error;
    }
}


module.exports = {
    getpaymentrequest,

};