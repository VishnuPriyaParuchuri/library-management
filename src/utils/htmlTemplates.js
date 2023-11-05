let generateOTP = (data) =>
{
	return `<!DOCTYPE html>
    <html>
        <body style="width: 100% !important; height: 100%; background: #f2f2f2; padding: 40px 0px; ">
            <div style="display: block !important; clear: both !important; margin: 0 auto !important; max-width: 700px !important; background: #fafafa; font-size: 13px;"> 			
                <div style="padding: 40px;font-weight:500;color:#2F2D46;font-size:16px;line-height:24px !important;">

                    <div> Hi `+ data.name + `, </div>

                    <div style="margin-top: 10px;">
                           Kindly note that the One Time Password (OTP) for your appliction request is
                    </div>

                    <div style="margin-top: 10px;color:black;font-weight:bold;">
                        <h1>${data.otp}</h1>
                    </div>
                    
                    <hr style="margin-top: 40px; border-top: 1px solid #D5D1D1;">

                </div>
            </div>
        </body>
    </html>`;
}

module.exports ={

    generateOTP: generateOTP
}