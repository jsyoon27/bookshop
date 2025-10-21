const conn = require('../mariadb'); //db 모듈
const {StatusCodes} = require('http-status-codes'); //status code 모듈

//(카테고리 별 신간 여부) 전체 도서 목록 조회
const allBooks = (req, res) => {
    let { category_id, news, limit, currentPage } = req.query;

    // limit : page 당 도서 수 ex 3
    // currentPage : 현재 페이지 번호 ex 1,2,3...
    // offset 0,3,6,9,12 ...
    // limit * (currentPage - 1)
    let offset = limit * (currentPage - 1);

    let sql = "SELECT * FROM books LIMIT ? OFFSET ?";
    let values = [parseInt(limit), offset];

    if (category_id && news) {
        sql += "WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 MONTH) AND NOW();";
        values = values.push(category_id, news);
        
    }
    else if(category_id){
        sql += "WHERE category_id = ?";
        values = values.push(category_id);
    } 
    else if (news) {
        sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 MONTH) AND NOW();";
        values = values.push(news);
    }

    conn.query(sql,values,
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
};

const bookDetail = (req, res) => {
    let {id} = req.params;
    
    let sql = `SELECT * FROM books LEFT
                JOIN category ON books.category_id = category.id where books.id = ?;`;
    conn.query(sql,id,
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
            }
            if(results[0])
                return res.status(StatusCodes.OK).json(results[0]);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
    })
};



module.exports = {
    allBooks,
    bookDetail
};