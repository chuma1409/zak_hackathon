let zak_fact_func = function () {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/zak_hackathon';
    const pool = new Pool({
        connectionString
    });

    let msg = '';

    let getDashboardData = async function () {

        let result = await pool.query(
            `SELECT  store_name, 
       store_products.description,
       units_sold,
       units_sold * price as total_sales
        FROM stores 
           JOIN  store_products
        ON 
           stores.id = store_products.store_id
        WHERE id = store_id
            order by store_name`)
        //  console.log(storeName.rows)

        return result.rows;


    }

    let getDashboardDataByStore = async function (storeId) {

        let result = await pool.query(
            `SELECT  store_name, 
       store_products.description,
       units_sold,
       units_sold * price as total_sales
        FROM stores 
           JOIN  store_products
        ON 
           stores.id = store_products.store_id
        WHERE id = store_id and
            id = $1
            `, [storeId])
        //  console.log(storeName.rows)

        return result.rows;


    }

    let getProducts = async function () {

        let storeName = await pool.query(
            `SELECT  store_name, 
                store_products.description, 
                store_products.price, 
                store_products.product_id as id, 
                store_id
         FROM stores 
         FULL OUTER JOIN  store_products
         ON stores.id = store_products.store_id
         WHERE id = store_id
         order by store_products.product_id
         `)
        //  console.log(storeName.rows)

        return storeName.rows;


    }

    let totalSalesPerStore = async function (storeId) {
        // let storeData = getProducts();
        // storeData.products.store_id

        const sql = 'select sum(price) from store_products where store_id = $1'
        let individualSales = await pool.query(sql, [storeId])
        // console.log(individualSales.rows)

        return individualSales.rows[0].sum;
    }

    let store = async function () {

        let store = await productStore()

    }

    async function storeInDb(cart) {


        // console.log(cart);

        for (const product of cart.items) {
            // console.log(product);

            const unitsSold = await pool.query(`
                UPDATE store_products 
                SET units_sold = units_sold+1 
                WHERE product_id = $1`,
                [product.id]);
            // console.log(unitsSold);

        }




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
        store,
        storeInDb,
        getDashboardData,
        getDashboardDataByStore
    }
}

module.exports = zak_fact_func;