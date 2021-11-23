const service = require('./avatarService');
const multer = require('multer');
const { uploadSingleImage } = require('../../config/cloudinary');
module.exports.updateAvatar = async (req, res, next) => {
    // if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    //     res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})};
    
    try {
        // console.log(req.file);
        const uploadRes = await uploadSingleImage(req.file.path, "web-avatar");
        await service.updateAvatar(req.user.id, uploadRes.url);
        res.json(uploadRes.url); 
    } catch (error) {
        console.log(error)
    }
  
}