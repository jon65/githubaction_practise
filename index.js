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
app.use(cors());

//configure multer -> for file buffer storage
const multer = require('multer');
const fs = require('fs');


const upload = multer({ dest: 'uploads/' })

app.post('/api/upload', upload.single('file'), async (req, res) => {

  const file = req.file;
  console.log('File Path:', file.path);

  if (!file) { 
    return res.status(400).send({ error: 'No file uploaded'});
  }
  
  // const uploadedFile = fs.createReadStream(file.path);
  // const uploadedFile = fs.readFileSync(filePath, 'utf-8');

  const param = {
    Bucket: bucketName,
    Body: fs.createReadStream(file.path),
    Key: file.originalname,
  }

  try {
    const command = new PutObjectCommand(param);
    const data = await s3.send(command);

    fs.unlinkSync(file.path);
    res.status(200).send({
      file: data,
    });
  } catch (e) { 
    console.log(e);
    res.status(500).send({
      error: 'Internal server error'
    })
  }
});

app.post('/api/posts', upload.single('file'), async (req, res) => {

  try {

  } catch (e) {

  }

});


// listen to port
app.listen(process.env.PORT || 8080, () => {
    console.log(`listening to port ${process.env.PORT || 8080}`);
});

//functions
// const uploadFiles = async () => { };