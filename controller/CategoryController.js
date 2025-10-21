const conn = require('../mariadb'); //db 모듈
const {StatusCodes} = require('http-status-codes'); //status code 모듈

const allCategory = (req, res) => {
    let {category_id} = req.query;

    if(category_id){
        let sql = "SELECT * FROM books WHERE category_id = ?";
        conn.query(sql,category_id,
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
                }
                if(results.length)
                    return res.status(StatusCodes.OK).json(results);
                else
                    return res.status(StatusCodes.NOT_FOUND).end();
        })
    }
    else{
        // 카테고리 전체 목록 리스트
        let sql = "SELECT * FROM category";

        conn.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
            }

            return res.status(StatusCodes.OK).json(results);
            })
        }
    };

module.exports = {
    allCategory
};