const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Zak = require('./zak_fact_func.js');
const zak = Zak();
const app = express();

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    layoutsDir: './views/layouts'
}));

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "th1s is m9 c@rt ",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


app.get('/addFlash', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.get("/login", function (req, res) {
    req.session.regenerate(function () {
        res.redirect("/");
    });
})


app.get('/', async function (req, res) {
    let userMessage = req.body.myreview;
    // console.log(userMessage);

    if (userMessage) {
        req.flash('info', 'Review sent!');
    }

    const products = await zak.getProducts();

    res.render('index', {
        updateCart: products
        // storeName: await zak.productStore()
    });


});

app.get('/viewcart', async function (req, res) {
    res.render('viewcart', {
        cart: await req.session.cart || {}
    })
})

app.get('/dashboard_store', async function (req, res) {
    
    const data = {
        msg: zak.getMsg(),
        rows: await zak.getDashboardData()    
    };

    console.log(data)
    
    res.render('dashboard_store', data)
});

app.get('/dashboard_store/:id', async function (req, res) {
    
    const rows = await zak.getDashboardDataByStore(req.params.id);

    const store_name = rows[0].store_name;

    const data = {
        msg: zak.getMsg(),
        rows,
        store_name   
    };
    
    res.render('dashboard_store', data)
});

app.post('/reviews', function (req, res) {
    let userMessage = req.body.myreview;
    if (userMessage) {
        req.flash('info', 'Review sent!');
    }

    zak.postReview(userMessage)

    res.redirect('/')

})

async function addToCart(currentCart, productId) {
    let cart = currentCart;

    // if the cart doesn't exist yet create a cart
    if (!cart) {
        cart = {
            items: [],
            total: 0
        };
    }

    let product = await zak.getProductById(productId);
    cart.items.push(product)
    cart.total += parseFloat (product.price);

    return cart;
}

app.post('/cart',async function (req, res) {

    req.session.cart = await addToCart(req.session.cart, req.body.productId);

    res.redirect('/')
})

function clearCart(req) {

    if ( req.session.cart) {
        req.session.cart = {
            items: [],
            total: 0
        }
    };

}


app.post('/clearcart', async function (req, res) {
    
    clearCart(req);

    res.render('viewcart', {

    })
})

app.post('/checkout', async function (req, res) {
    // let productName = req.session.cart.items;  
    // console.log(productName) ;
    let checkout = await zak.storeInDb(req.session.cart);
    
    clearCart(req);

    res.redirect('/')
    // return checkout;
})

app.get('/removeItem/:productId', async function (req, res) {

    // let itemsArray = req.session.cart.items.push(product)

    const productId = req.params.productId;

    const product =await  zak.getProductById(productId);

    req.session.cart.items = await req.session.cart.items.filter(function (item) {
        return item.id != productId
    });

    req.session.cart.total -= parseFloat(product.price);


    res.redirect("/viewcart");

});


const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});
