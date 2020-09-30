let zak_fact_func = function(){

    const products = [{
        id: 17,
        description: "Shoez",
        price: 125.75
    }, {
        id: 18,
        description: "Shirtz",
        price: 109.75
    },{
        id: 17,
        description: "Shoez",
        price: 125.75
    }, {
        id: 18,
        description: "Shirtz",
        price: 109.75
    },{
        id: 17,
        description: "Shoez",
        price: 125.75
    }, {
        id: 18,
        description: "Shirtz",
        price: 109.75
    }   ];

    function getProducts() {
        return products;
    }

    function getProductById(id) {
        return products.find(function(product){
            return product.id == id;
        });
    }


    return{
        getProductById,
        getProducts
    }
}

module.exports = zak_fact_func;