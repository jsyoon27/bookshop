const express = require('express');
const router = express.Router();

router.use(express.json());

//주문하기
router.post('/',(req, res) => {
    res.send('주문 담기');
});

//주문 목록 조회
router.get('/',(req, res) => {
    res.send('주문 목록 조회');
});

//주문 상세 상품 조회
router.delete('/:id',(req, res) => {
    res.send('주문 상세 상품 조회');
});


module.exports = router;