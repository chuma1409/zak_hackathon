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
            `SELECT store_name, store_products.description, store_products.price, store_products.product_id as id, store_id
         FROM stores 
         FULL OUTER JOIN  store_products
         ON stores.id = store_products.store_id
         WHERE id = store_id`)
        //  console.log(storeName.rows)

        return storeName.rows;


    }

    let totalSalesPerStore= async function (storeId) {
        // let storeData = getProducts();
        // storeData.products.store_id

        const sql = 'select sum(price) from store_products where store_id = $1'
        let individualSales = await pool.query(sql, [storeId])
        // console.log(individualSales.rows)

        return individualSales.rows[0].sum;
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
        totalSalesPerStore,
        store
    }
}

module.exports = zak_fact_func;