const express = require('express');
const router = express.Router();

const { 
    allCategory
} = require('../controller/CategoryController');

router.use(express.json());

router.get('/',allCategory);//(카테고리별)전체 도서 조회 


module.exports = router;