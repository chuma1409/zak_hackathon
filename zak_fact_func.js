let zak_fact_func = function () {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/zak_hackathon';
    const pool = new Pool({
        connectionString
    });

    let msg = '';

    let getProducts = async function () {
        
        let storeName = await pool.query(
            `SELECT store_name, store_products.description, store_products.price
         FROM stores 
         FULL OUTER JOIN  store_products
         ON stores.id = store_products.store_id
         WHERE id = store_id`)

        return storeName.rows;


    }

    let productStore = async function () {
        let storeName = await pool.query(
            `SELECT store_name, store_products.description, store_products.price
         FROM stores 
         FULL OUTER JOIN  store_products
         ON stores.id = store_products.store_id
         WHERE id = store_id`)

        console.log(storeName.rows)

    }

    let store = async function(){

         let store = await productStore()

    }

    async function getProductById(id) {
        let products = await getProducts();
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
        productStore,
        store
    }
}

module.exports = zak_fact_func;