let zak_fact_func = function () {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/zak_hackathon';
    const pool = new Pool({
        connectionString
    });

    let msg = '';

    let getProducts = async function () {
        let products = await pool.query(`SELECT * FROM   store_products`);
        console.log(products.rows)
        return products.rows

    }


    function getProductById(id) {
        return products.find(function (product) {
            return product.id == id;
        });
    }


    function postReview(userMessage) {
        if (userMessage) {
            msg = userMessage
        }
    }

    function getMsg() {
        return msg;
    }


    return {
        getProductById,
        getProducts,
        postReview,
        getMsg,
    }
}

module.exports = zak_fact_func;