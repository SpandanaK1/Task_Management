const config = require("../config");

const htmlStart = `<!DOCTYPE html >	<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
`;

const htmlBodyStart = `<body style="width: 100% !important; height: 100%; background: #fafafa; padding: 20px 0px;">`;
const htmlContainerStart = `<div style="display: block !important; clear: both !important; margin: 0 auto !important; max-width: 700px !important; background: #fafafa; font-size: 13px;">`;
const divClose = `</div>`;
const horizontalLine = `<hr style="margin-top: 40px; border-top: 1px solid #D5D1D1;">`;
const htmlBodyClose = `</body>`;
const htmlClose = `</html>`;
let disclaimer = `<div style="font-size: 12px;color: #6D6C7D;text-align: justify;font-weight: 400;line-height: 14px !important;">
<div style="margin-top: 10px;">
    This is an automated message sent by Demo Inc. Please do not reply to this email as you will not receive a response.
</div>
<div style="margin-top:10px;">
    &copy; ${new Date().getFullYear()} Demo Inc. All rights reserved. 
</div>
</div>`;

let generateInviteRecipient = (data) =>
{
    let signInUrl = config.serviceUrls.signInUrl;

    return htmlStart + htmlBodyStart + htmlContainerStart + `    
    <div style="padding: 40px;font-weight:500;color:#2F2D46;font-size:16px;line-height:24px !important;">
    <div style="margin-top: 10px;"> Hi `+ data.name + `, </div>

    <div style="margin-top: 20px;">
             Inviting you to Banking Application.
    </div>

    <div style="margin-top: 20px;">
          Please share the information of bank and address details. We will keep this information confidential.
    </div>
        
        `+ horizontalLine + disclaimer + `
    </div>`+ divClose + htmlBodyClose + htmlClose;

}

let generateNewPaymentRequest = (data) => 
{
    return htmlStart + htmlBodyStart + htmlContainerStart + `
    <div style="padding: 40px;font-weight:500;color:#2F2D46;font-size:16px;line-height:24px !important;">
    <div style="margin-top: 20px;">
        Hello ${data.name}!
    </div>
    
    <div style="margin-top: 20px;">
        You've emailed a Payment Request for ${data.amount} to destination account ${data.account_name}
    </div>`
        + horizontalLine + disclaimer +
    `</div>` + divClose + htmlBodyClose + htmlClose;
}

module.exports = {
    generateInviteRecipient: generateInviteRecipient,
    generateNewPaymentRequest : generateNewPaymentRequest
}