const router = require('express').Router();
const {addOwner,addRoom,getOwner,getRoom,findOwner,findRoom} = require('../conroller/hotel')
const {upload}=require('../middleware/multer');
const {firebaseUpload,firebaseUploadMulti}=require('../middleware/upload');
router.post('/owner',upload.single('picture'),firebaseUpload,addOwner);
router.post('/room',upload.array('photos', 5),firebaseUploadMulti,addRoom);
router.get('/owner',getOwner);
router.post('/findOwner',findOwner);
router.post('/findRoom',findRoom);
router.get('/room',getRoom);
module.exports = router;