const accountSid = 'ACd805a00d1fe65398647c551adbcdc421';
const authToken = 'e7694adad041220d9ebb51da7629c9ce';
const client = require('twilio')(accountSid, authToken);
const sendsms=(nameofperson,trackingid,phoneno)=>{

    client.messages
    .create({
        body: `A gift is sent to you Mr ${nameofperson} having tracking id:${trackingid}`,
        from: '+19285646931',
        to: `+${phoneno.slice(2)}`
    })
    .then(message => console.log(message.sid))
}
// sendsms(nameofperson,trackingid,);
module.exports=sendsms;