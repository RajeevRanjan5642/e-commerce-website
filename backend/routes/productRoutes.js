const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

router.get('/',productController.getAllProducts);
router.post('/',productController.createProduct);
router.delete('/:id',productController.deleteProduct);
router.get('/newCollections',productController.getNewCollections);
router.get('/popularInWomen',productController.getPopularInWomen);


module.exports = router;