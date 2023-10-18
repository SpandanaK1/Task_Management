require('dotenv').config();

// Command line arguments
const args = require('minimist')(process.argv.slice(2));

let config_file = args['RENTPAY_CONFIG'] || process.env.RENTPAY_CONFIG || './config.json';
const config = require(config_file);

const environment = args['RENTPAY_DEPLOYMENT_MODE'] || process.env.RENTPAY_DEPLOYMENT_MODE || 'development';
const environmentConfig = config[environment];

let serverUrl = args['SERVER_URL'] || process.env.SERVER_URL || environmentConfig.SERVICE_URLS.BANKING_SERVICE;
let clientUrl = serverUrl;

let serverUrlExtractions = serverUrl.split(':');

let serverPort = serverUrlExtractions.pop() * 1;

if (!serverPort)
{
    serverPort = 80;
}

let poolMin = args['SQL_DB_POOL_MIN'] || process.env.SQL_DB_POOL_MIN || environmentConfig.SQL.POOL.MIN || 0;
let poolMax = args['SQL_DB_POOL_MAX'] || process.env.SQL_DB_POOL_MAX || environmentConfig.SQL.POOL.MAX || 3;

module.exports = {

    app_name: args['APP_NAME'] || process.env.APP_NAME || environmentConfig.APP_NAME || 'banking service',
    SERVER_PORT: args['PORT'] || process.env.PORT || process.env.port || serverPort,

    server_url: serverUrl,
    client_url: clientUrl,

    db_type: environmentConfig.DB_TYPE || 'nosql',

    sql: {
        client: args['SQL_DB_CLIENT'] || process.env.SQL_DB_CLIENT || environmentConfig.SQL.CLIENT,
        host: args['SQL_DB_HOST'] || process.env.SQL_DB_HOST || environmentConfig.SQL.HOST,
        user: args['SQL_DB_USER'] || process.env.SQL_DB_USER || environmentConfig.SQL.USER,
        paswd: args['SQL_DB_PASWD'] || process.env.SQL_DB_PASWD || environmentConfig.SQL.PASWD,
        database: args['SQL_DB_DATABASE'] || process.env.SQL_DB_DATABASE || environmentConfig.SQL.DATABASE,
        owner: args['ORACLE_TABLE_PREFIX'] || process.env.ORACLE_TABLE_PREFIX || environmentConfig.SQL.OWNER || null,
        connectString: args['ORACLE_CONNECTION'] || process.env.ORACLE_CONNECTION || environmentConfig.SQL.CONNECT_STRING,
        pool: {
            min: Number(poolMin),
            max: Number(poolMax)
        },
        connectionTimeout: args['SQL_DB_CONNECTION_TIMEOUT'] || process.env.SQL_DB_CONNECTION_TIMEOUT || environmentConfig.SQL.CONNECTION_TIMEOUT
    },

    dbServer: process.env.DEPLOY_TO || "GOS",
    awsProxy: process.env.AWS_PROXY || null,

    rdsSql: {
        client: process.env.SQL_DB_CLIENT || environmentConfig.SQL.CLIENT || "oracledb",

        region: process.env.RDS_SQL_DB_REGION || null,
        secretArn: process.env.RDS_SQL_DB_SECRET_ARN || null,

        paswdExpiry: process.env.RDS_SQL_DB_PASSWORD_EXPIRY_DAYS || 29,

        owner: process.env.RDS_ORACLE_TABLE_PREFIX || null,
        pool: {
            min: Number(poolMin),
            max: Number(poolMax)
        }
    },
    encrypt_secret_key: environmentConfig.ENCRYPT_SECRET_KEY || "bLuePaLRENTPAY",

    smtp: {
        host: args['SMTP_HOST'] || process.env.SMTP_HOST || environmentConfig.SMTP.HOST,
        port: args['SMTP_PORT'] || process.env.SMTP_PORT || environmentConfig.SMTP.PORT,
        secure: args['SMTP_SECURE'] || process.env.SMTP_SECURE || environmentConfig.SMTP.SECURE,
        requireTls: args['SMTP_REQUIRE_TLS'] || process.env.SMTP_REQUIRE_TLS || environmentConfig.SMTP.REQUIRE_TLS,
        email: args['SMTP_USER'] || process.env.SMTP_USER || environmentConfig.SMTP.EMAIL,
        paswd: args['SMTP_PASS'] || process.env.SMTP_PASS || environmentConfig.SMTP.PASWD,
        sender: args['EMAIL_SENDER'] || process.env.EMAIL_SENDER || environmentConfig.SMTP.SENDER,
        bcc: args['EMAIL_BCC'] || process.env.EMAIL_BCC || environmentConfig.SMTP.BCC
    },

    serviceUrls: {
        signInUrl: args['PARTNER_SIGNIN_URL'] || process.env.PARTNER_SIGNIN_URL || (environmentConfig.SERVICE_URLS ? environmentConfig.SERVICE_URLS.PARTNER_SIGNIN_URL : null)
    },

    externalServiceUrls: {
        document: process.env.DOCUMENT_SERVICE_URL || (environmentConfig.EXTERNAL_SERVICE_URLS ? environmentConfig.EXTERNAL_SERVICE_URLS.DOCUMENT : null)
    },

    root_dir: __dirname,
    upload_files: environmentConfig.UPLOADS || __dirname + '/uploads/',
    // upload_files: environmentConfig.FILES || __dirname + '/files/',
    log_level: environmentConfig.LOG_LEVEL || 'info',

    app_version: args['APP_VERSION'] || process.env.APP_VERSION || environmentConfig.APP_VERSION,
    SUPPORT_TEST_EMAIL_PATTERN: args['SUPPORT_TEST_EMAIL_PATTERN'] || process.env.SUPPORT_TEST_EMAIL_PATTERN || process.env.support_test_email_pattern || environmentConfig.SUPPORT_TEST_EMAIL_PATTERN || true,
    story_tollgate_email: process.env.STORY_TOLLGATE_EMAIL || environmentConfig.STORY_TOLLGATE_EMAIL || "CRE_Story_Tollgate@restricted.chase.com",
    story_onboarding_email: process.env.STORY_ONBOARDING_EMAIL || environmentConfig.STORY_ONBOARDING_EMAIL || "CRE_Story_Onboarding@restricted.chase.com",
    useStoryNotificationService: args['USE_STORY_NOTIFICATION_SERVICE'] || process.env.USE_STORY_NOTIFICATION_SERVICE || environmentConfig.USE_STORY_NOTIFICATION_SERVICE || false,
    isLocalConnect: false,

    bccEmail: process.env.BCC_EMAIL || environmentConfig.BCC_EMAIL || "qa1@bluepal.com",
    googleCaptchaURL: process.env.GOOGLE_CAPTCHA_URL || environmentConfig.GOOGLE_CAPTCHA_URL || "https://www.google.com/recaptcha/api/siteverify",
    googleCaptchaSecret: process.env.GOOGLE_CAPTCHA_SECRET || environmentConfig.GOOGLE_CAPTCHA_SECRET || "6Le0TEQlAAAAAFnnOJigQBabUEL-JXgU7GdBKL0E",
    isLocalConnect: false
}