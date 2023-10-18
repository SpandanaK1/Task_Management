function logRequest() 
{
    return async (req, res, next) => 
    {
        next();
    }
}

const fs = require('fs');
const path = require('path');
const pino = require('pino');

const config = require('../config');
// const JwtConfig = config.jwt;
// const jwt = require('jsonwebtoken');

let applicationLog = path.join(config.root_dir, 'log', 'application.log')

//Check if "applicationLog" file exits else create new file
fs.open(applicationLog, 'r', function (err, fd) 
{
    if (err) 
    {
        fs.writeFile(applicationLog, '', function (err) 
        {
            if (err) 
            {
                console.log(err);
            }
        });
    }
});

var applicationStream = pino.destination(applicationLog);

var logger = pino(applicationStream);
logger.level = config.log_level;

function info(message) 
{
    if (typeof message == "object")
    {
        message = JSON.stringify(message)
    }

    logger.info(message);
}

function warn(message)
{
    if (typeof message == "object")
    {
        message = JSON.stringify(message)
    }

    logger.warn(message);
}

let error = (error) => 
{
    if (typeof error == "object")
    {
        error = JSON.stringify(error)
    }

    logger.error(JSON.stringify(error));
};

let debug = (message) => 
{
    if (typeof message == "object")
    {
        message = JSON.stringify(message)
    }

    logger.debug(message);
};

let log = (obj) => 
{
    try
    {
        let time = new Date();
        logger.info({ ...obj, time: time });
    }
    catch (error)
    {
        console.log('pino log error', { error, obj })
    }
};

async function getApp2AppToken(adfsBaseURL, clientId, resourceId, privateKey, cert) 
{
    return jwt.sign({ service: 'Scheduler' }, JwtConfig.secret_key, { expiresIn: JwtConfig.expiresin });
}


module.exports = {
    middlewares: {
        logRequest
    },
    logger: {
        info: info,
        warn: warn,
        error: error,
        debug: debug,
        log: log
    },
    util: {
        getApp2AppToken
    },
}