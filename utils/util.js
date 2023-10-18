const { logger } = require('../server/cb-frs-blackbird-util');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
var Readable = require('stream').Readable; 
const fs = require('fs');

const generateUUID = () =>
{
  logger.log({
    level: 'info',
    message: 'Util - generateUUID',
  });
  return uuidv4().split('-').join('').toUpperCase();
};

const generateID = () =>
{
  logger.log({
    level: 'info',
    message: 'Util - generateID',
  });
  return uuidv4();
};

const uniqueNumber = () =>
{
  logger.log({
    level: 'info',
    message: 'Util - uniqueNumber',
  });
  let value = String(Math.floor(100000 + Math.random() * 900000));
  return value;
};

const isEmpty = (value) => 
{
  return (
    value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
  );
};

function getESTDate(dtStr = null)
{
  if (dtStr && typeof dtStr == 'string' && dtStr.includes("T"))
  {
    let date = getDateStr(dtStr);

    return new Date((new Date(date + " 08:00:00")).toISOString("en-US", { timeZone: "America/New_York" }));
  }
  else if (dtStr && typeof dtStr == 'string')
  {
    return new Date((new Date(dtStr + " 08:00:00")).toISOString("en-US", { timeZone: "America/New_York" }));
  }
  else if (dtStr && typeof dtStr == 'object')
  {
    let date = getDateStr(dtStr);

    return new Date((new Date(date + " 08:00:00")).toISOString("en-US", { timeZone: "America/New_York" }));
  }

  return new Date((new Date()).toISOString("en-US", { timeZone: "America/New_York" }));
}

const JwtConfig = {
  secret_key: "bLuePaLRENTPAY",
  expiresin: "24h"
};

let generateToken = async (user) => 
{
  return jwt.sign({ user }, JwtConfig.secret_key, { expiresIn: JwtConfig.expiresin });
};

let validateToken = async (token, callback) => 
{

  logger.log({
    level: 'info',
    message: 'Util - validateToken',
    meta: { token }
  });

  jwt.verify(token, JwtConfig.secret_key, async function (error, decoded) 
  {
    if (error) 
    {
      logger.log({
        level: 'info',
        message: 'Util - verify',
        meta: { error }
      });
      callback(false, error);
    }
    else if (!decoded || !decoded.user) 
    {
      logger.log({
        level: 'info',
        message: 'Something went wrong!. User details are not extracted from token!',
        meta: { decoded }
      });

      let result = {
        message: "Something went wrong!. User details are not extracted from token!",
        error: decoded
      };

      callback(false, result);
    }
    else
    {
      logger.log({
        level: 'info',
        message: 'Util - validateToken - resp',
        meta: { user: decoded.user }
      });
      callback(true, decoded.user);
    }
  });
};
function generateCardNumber() {
  let cardNumber = '';
  for (let i = 0; i < 16; i+= 1) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }
  return cardNumber;
};


function generateExpirationDate() {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate);
  expirationDate.setFullYear(expirationDate.getFullYear() + 6);

  const expYear = expirationDate.getFullYear().toString();
  const expMonth = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
  const expDay = expirationDate.getDate().toString().padStart(2, '0');

  return `${expYear}-${expMonth}-${expDay}`;
};

function generateCVV() {
  let cvc = '';
  for (let i = 0; i < 3; i+= 1) {
    cvc += Math.floor(Math.random() * 10).toString();
  }
  return cvc;
};

let getValidEmail = (email) =>
{
  var filter = /\+[0-9]*[@]/g;
  if (typeof (email) == 'string')
  {
    const filteredEmail = email.replace(filter, '@');
    return filteredEmail;
  }
  else if (typeof (email) == 'object')
  {
    let filteredEmails = [];
    for (let emailIndex = 0; emailIndex < email.length; emailIndex++)
    {
      let emailToBeFiltered = email[emailIndex];
      const filteredEmail = emailToBeFiltered.replace(filter, '@');
      filteredEmails.push(filteredEmail);
    }
    return filteredEmails;
  }
};

function bufferToStream(buffer)
{
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

const isFileReNamed = (directory, oldName, newName) => 
{
  try
  {
    fs.renameSync(oldName, newName);

    return true;
  }
  catch (error)
  {
    return false;
  }
};

function universalDateFormat(value) 
{
    var dateValue = new Date(getDateString(value));
    var dd = String(dateValue.getDate()).padStart(2, 0);
    var mm = String(dateValue.getMonth() + 1).padStart(2, 0);
    var yyyy = dateValue.getFullYear();

    let dateValueFormat = mm + '/' + dd + '/' + yyyy;

    return dateValueFormat;
};

module.exports = {
  generateUUID,
  generateID,
  uniqueNumber,
  isEmpty,
  getESTDate,
  generateToken,
  validateToken,
  generateCardNumber,
  generateCVV,
  generateExpirationDate,
  getValidEmail,
  bufferToStream,
  isFileReNamed,
  universalDateFormat
}

