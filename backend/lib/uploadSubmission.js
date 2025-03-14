import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const uploadFileToS3 = async (file) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `submissions/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ACL: 'private'
    };

    try {
        const result = await s3.upload(params).promise();
        return result.Location;
    } catch (error) {
        console.error("File upload failed:", error);
        throw new Error('Upload failed');
    }
};

export default uploadFileToS3;
