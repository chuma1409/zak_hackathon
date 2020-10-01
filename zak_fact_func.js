let zak_fact_func = function () {

    let cart = [];

   let msg = '';

    const products = [{
        id: 17,
        description: "Shoez",
        price: 125.75
    }, {
        id: 18,
        description: "Shirtz",
        price: 109.75
    }, {
        id: 17,
        description: "Shoez",
        price: 125.75
    }, {
        id: 18,
        description: "Shirtz",
        price: 109.75
    }, {
        id: 17,
        description: "Shoez",
        price: 125.75
    }, {
        id: 18,
        description: "Shirtz",
        price: 109.75
    }];

    function getProducts() {
        return products;
    }

    function getProductById(id) {
        return products.find(function (product) {
            return product.id == id;
        });
    }


    function postReview(userMessage){
        if(userMessage){
        msg = userMessage
        }
    }

    function getMsg(){
        return msg;
    }


    return {
        getProductById,
        getProducts,
        postReview,
        getMsg
    }
}

module.exports = zak_fact_func;