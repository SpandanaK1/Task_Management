const common = require('../utils/util');

let validateRecipientAddParams = (data) =>
{
  let fields = [];
  let recipientErrors = [];

  data.email = !common.isEmpty(data.email) ? data.email : '';
  let emailValidation = /^(([^<>()[\]\\.,;:{|}!`~$%&#'^=+\-_\s@\"]+(\.[^<>()[\]\\.,;:}!`~$%&#'^\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!data.name)
  {
    recipientErrors.push("Recipient name is required.");
  }
  else if (data.name.length > 50)
  {
    recipientErrors.push("Maximum characters allowed for Recipient name is 50.");
  }

  if (data.email.length > 50)
  {
    recipientErrors.push('Email maximum character limit is 50.');
  }
  else if (data.email !== '' && !emailValidation.test(data.email))
  {
    recipientErrors.push('Email format is incorrect.');
  }

  let isValid = common.isEmpty(recipientErrors);

  return {
    recipientErrors,
    isRecipientValid: isValid
  };
};

module.exports = {
  validateRecipientAddParams
}