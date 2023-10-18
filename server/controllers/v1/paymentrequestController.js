const { logger } = require('../../cb-frs-blackbird-util'); // needed to change in JPMC
const paymentrequestService = require('../../services/paymentrequestService');
const { validateId, validtePaymentRequestAddParams, validatePaymentRequestUpdateParams } = require('../../../utils/validator');
const path = require('path');

const getpaymentrequest = async (_, res, next) =>
{
  try
  {
    const Paymentrequests = await paymentrequestService.getpaymentrequest();
    logger.log({
      level: 'info',
      message: 'Paymentrequests - paymentrequestService',
      meta: { Paymentrequests }
    });
    res.json(Paymentrequests);
  }
  catch (error)
  {
    logger.log({
      level: 'error',
      message: 'Paymentrequests - error',
      meta: { error }
    });
    next(error);
  }
};

const getPaymentRequestById = async (req, res, next) =>
{
  try
  {
    const { id } = req.params;
    const { error } = validateId({ id });
    if (error)
    {
      logger.log({
        level: 'info',
        message: 'paymentrequestController getPaymentRequestById - error',
        meta: { error }
      });
      next(error);
    } else
    {
      const Request = await paymentrequestService.getPaymentRequestById(id);
      logger.log({
        level: 'info',
        message: 'paymentrequestController getPaymentRequestById - resp',
        meta: { Request }
      });
      res.json(Request)
    }
  } catch (error)
  {
    logger.log({
      level: 'error',
      message: 'paymentrequestController getPaymentRequestById - error',
      meta: { error }
    });
    next(error);
  }
};

const addPaymentRequest = async (req, res, next) =>
{
    try
    {
        const reqBody = req.body;
        const { error } = validtePaymentRequestAddParams(reqBody);

        if(error)
        {
            next(error);
        }
        else
        {
            const Paymentrequests = await paymentrequestService.addPaymentRequest(reqBody);
        
            logger.log({
                level: 'info',
                message: 'paymentrequestController addPaymentRequest - resp',
                meta: { Paymentrequests } 
            });
            res.json(Paymentrequests);
        }
    }
    catch(error)
    {
        logger.log({
            level: 'error',
            message: 'paymentrequestController addPaymentRequest - error',
            meta: { error }
        });
        next(error);
    }
};

const updatePaymentRequestById = async (req, res, next) => 
{
    try
    {
        const  reqBody   = req.body    
        const { error } = validatePaymentRequestUpdateParams(reqBody);
        if(error)
        {
            logger.log({
                level: 'error',
                message: 'paymentrequestController validatePaymentRequestUpdateParams - error',
                meta: { error }
            });
            next(error);
        }
        else
        {
            const Requests = await paymentrequestService.updatePaymentRequestById(reqBody);

            logger.log({
                level: 'info',
                message: 'paymentrequestController updatePaymentRequestById - resp',
                meta: { Requests }
            });

            res.json(Requests);
        }
    }
    catch(error)
    {
        logger.log({
            level: 'error',
            message: 'paymentrequestController updatePaymentRequestById - error',
            meta: { error }
        });
        next(error);
    }
}

const deletePaymentRequest = async (req, res, next) =>
{
    try
    {
        const { id } = req.params;
        const { error } = validateId({ id });
        if(error)
        {
            next(error);
        }
        else
        {
            const paymentrequest = await paymentrequestService.deletePaymentRequest(id);
            logger.log({
                level: 'info',
                message: 'paymentrequestController deletePaymentRequest - resp',
                meta: { paymentrequest }
            });
            res.json(paymentrequest);
        }
    }
    catch(error)
    {
        logger.log({
            level: 'error',
            message: 'paymentrequestController deletePaymentRequest - error',
            meta: { error }
        });
        next(error);
    }
}


module.exports = {
  getpaymentrequest,
  getPaymentRequestById,
  addPaymentRequest,
  updatePaymentRequestById,
  deletePaymentRequest
}