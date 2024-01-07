const express = require('express');
const cors = require('cors');
// Load the SDK for JavaScript
const { S3Client, ListBucketsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv  = require('dotenv');
dotenv.config();

const bucketName = process.env.bucket_name;
const bucketRegion = process.env.bucket_region;
const accessKeyId = process.env.access_key_id;
const secretAccessKey = process.env.secret_access_key;

//initialise client
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});


const app = express();
app.use(express.json());

//for generating file names
const crypto = require('crypto');

const generateFileName = (bytes = 32) => {
  // Generate random bytes using crypto.randomBytes
  const randomBytes = crypto.randomBytes(bytes);
  
  // Convert the random bytes to a hexadecimal string
  const fileName = randomBytes.toString('hex');
  
  // Return the generated file name
  return fileName;
};

//configure multer -> for file buffer storage
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './tmp/my-uploads')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`)
  }
})
const upload = multer({ storage: storage })

app.post('/api/test', async (req, res) => {

  const directoryPath = './tmp';
  const files = fs.readdirSync(directoryPath);
  
    for (const file of files) {
      const filePath = `${directoryPath}/${file}`;
      const fileContent = fs.readFileSync(filePath);

      const params = {
        Bucket: bucketName,
        Body: fileContent,
        Key: file,
      };

      try {
        const command = new PutObjectCommand(params);
        const data = await s3.send(command);
        console.log(`File ${file} uploaded. S3 Location: ${data.Location}`);
      } catch (error) {
        console.error(`Error uploading file ${file}:`, error);
      }
    }
});

app.post('/getImage', async (req, res) => { 

  try {

  } catch (e) { 
    
  }
})



app.post('/api/posts', upload.array('file', 12), async (req, res) => {
  try {
    const files = req.files; // Use req.files to access an array of uploaded files
    const fileNames = [];

    for (const uploadedFile of files) {
      const fileContent = uploadedFile.buffer; // Use uploadedFile.buffer to get the file content
      const filename = uploadedFile.originalname;

      const params = {
        Bucket: 'your-s3-bucket-name', // replace with your S3 bucket name
        Body: fileContent,
        Key: filename,
      };

      const command = new PutObjectCommand(params);
      const data = await s3Client.send(command);
      console.log('File uploaded:', data);
      
      fileNames.push(filename);
    }

    // Now you have an array of uploaded file names (fileNames) that you can use as needed

    res.status(201).send({ success: true, files: fileNames });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
});

//i want to upload files to the cloud db

// app.get('/', uploadFiles);

// listen to port
app.listen(process.env.PORT || 8080, () => {
    console.log(`listening to port ${process.env.PORT || 8080}`);
});

//functions
// const uploadFiles = async () => { };