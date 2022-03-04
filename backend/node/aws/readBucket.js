const AWS = require('aws-sdk'); //aws

function readFromS3(ruta){
    try {
         var s3 = new AWS.S3();
         
         AWS.config.update({
            region: process.env.REGION,
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        });
         
         var getParams = {
             Bucket: process.env.BUCKET_S3,
             Key: ruta
         };

         s3.getObject(getParams, async function(err, data) {
             if(err) {
                 console.error(err, err.stack);
             } else {   
                let f = new Buffer.from(data.Body).toString('base64')
                return f
             }
         });
    } catch (ex) {
         console.error("Reading data from s3 failed." , ex);
         return null;
    }
}

const getPhoto  = function (ruta) {
    return new Promise((resolve,reject) =>{
        var s3 = new AWS.S3();
         
         AWS.config.update({
            region: process.env.REGION,
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        });

        var getParams = {
            Bucket: process.env.BUCKET_S3,
            Key: ruta
        };

        s3.getObject(getParams, function(err, data) {
            if(err) {
                console.error(err, err.stack);
                reject(err);
            } else {   
               let f = new Buffer.from(data.Body).toString('base64')
               resolve(f);
            }
        });
    });
}

module.exports.getPhoto =  getPhoto;