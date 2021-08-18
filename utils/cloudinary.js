require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
     cloud_name: process.env.CLOUD_NAME,
     api_key: process.env.CLOUD_KEY,
     api_secret: process.env.CLOUD_SECRET,
});

const foo = async () => {
     let data = await cloudinary.uploader.upload(
          './public/favicon.ico',
          (error, result) => {
               error ? console.log(error) : result.url;
          }
     );
     console.log(data);
};
foo();
