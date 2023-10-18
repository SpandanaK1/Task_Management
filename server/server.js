const { logger } = require('./cb-frs-blackbird-util');
const app = require('./app');

const port = process.env.PORT || 1096;

const server = app.listen(port, () =>
{
    logger.info(`SS01 : Service starts at port ${port}`);
    console.log(`SS01 : Service starts at port ${port}`);
    // Uncomment the below code in JPMC
    // securityLogger.log({
    //     level:'info',
    //     message:'Server Config',
    //     config:'Server Config'
    // });
});