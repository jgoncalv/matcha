const router = require('express').Router({ mergeParams: true })
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const { uploadImage, getUserImages, removeUserImage, changeAvatar } = require('../../../../controllers/images');

router.use('/:id', require('./_id'));

router.route('/')
  .post(upload.single('img'), uploadImage)
  .get(getUserImages);

module.exports = router;



