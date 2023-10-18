const Joi = require('joi');

const validateId = (body) => 
{
    const schema = Joi.object({
        id: Joi.string().uuid().required()
    });
    return schema.validate(body);
}

  const validatePaymentRequestUpdateParams = (body) =>
  {
      const schema = Joi.object()
          .required()
          .label('req body cannot be null')
          .keys({
              id: Joi.string().uuid().required(),
              account_number: Joi.string().max(20).optional().allow(''),
              request_person: Joi.string().optional().max(30).allow(''),
              amount: Joi.string().optional().max(10).allow(''),
              account_name: Joi.string().optional().max(20).allow(''),
              status: Joi.string().optional().max(30).allow(''),
              due_date: Joi.string().optional().max(50).allow(''),
              email : Joi.string().email().optional().allow(''),
              request_notes: Joi.string().optional().max(30).allow(''),
              account_type: Joi.string().optional().max(20).allow(''),
              created_on: Joi.string().optional().max(25).allow('')
          })
          .unknown(false);
      return schema.validate(body);
  };

  const validtePaymentRequestAddParams = (body) =>
  {
      const schema = Joi.object()
          .required()
          .label('req body cannot be null')
          .keys({
              account_number: Joi.string().max(20).optional().allow(''),
              request_person: Joi.string().optional().max(30).allow(''),
              amount: Joi.string().optional().max(10).allow(''),
              account_name: Joi.string().optional().max(20).allow(''),
              status: Joi.string().optional().max(30).allow(''),
              due_date: Joi.string().optional().max(50).allow(''),
              email : Joi.string().email().optional().allow(''),
              request_notes: Joi.string().optional().max(30).allow(''),
              account_type: Joi.string().optional().max(20).allow(''),
              created_on: Joi.string().optional().max(25).allow('')
          })
          .unknown(false);
      return schema.validate(body);
};


const validteTaskAddParams = (body) =>
{
    const schema = Joi.object()
        .required()
        .label('req body cannot be null')
        .keys({
            description: Joi.string().max(50).optional().allow(''),
            priority: Joi.string().optional().max(10).allow(''),
            status: Joi.string().optional().max(20).allow(''),
            assigned_to: Joi.string().optional().max(30).allow(''),
            due_date: Joi.date().optional().allow(''),
            created_by : Joi.string().optional().max(30).allow(''),
            project_id : Joi.string().optional().allow(''),
            user_id : Joi.string().optional().allow(''),
        
        })
        .unknown(false);
    return schema.validate(body);
};

module.exports = {
    validateId,
    validatePaymentRequestUpdateParams,
    validtePaymentRequestAddParams,

    
    validteTaskAddParams
};

