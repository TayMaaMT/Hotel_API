const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "hotel-3d761.appspot.com"
  });
  const bucket = admin.storage().bucket();
  const firebaseUpload = (req,res,next)=>{
    try {
        if (!req.file) {
          res.status(400).send('Error, could not upload file');
          return;
        }
        const image = new Date().valueOf() + req.file.originalname;
        const blob = bucket.file(image);
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
        blobWriter.on('error', (err) => next(err));
        blobWriter.on('finish', () => {
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
          req.imageURL = publicUrl;
          next();
        });
        blobWriter.end(req.file.buffer);

      } catch (error) {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return;
      }
  }

  const firebaseUploadMulti =async (req,res,next)=>{
    try {
        if (!req.files) {
          res.status(400).send('Error, could not upload file');
          return;
        }
        req.imageURL=[];
        let count = 0;
         const uploads =await req.files.map((file,i)=>{
          const  image = new Date().valueOf() + file.originalname;
        const blob = bucket.file(image);
        
        const blobWriter =  blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });
        blobWriter.on('error', (err) => next(err));
        blobWriter.on('finish', () => {
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
          req.imageURL[i] = publicUrl;
          count++;
          if(count===5){
            next();
          }

        });
        blobWriter.end(file.buffer); 
        })
        
     
       
      } catch (error) {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return;
      }
  }

  module.exports={
    firebaseUpload,
    firebaseUploadMulti
  }