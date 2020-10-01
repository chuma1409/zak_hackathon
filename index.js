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
    console.log(userMessage);

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
app.get('/dashboard', async function (req, res) {

    const sum = req.session.cart;
    const { items } = sum || []

    // console.log(sum.items);
    var bussiness = {};

    for (let i = 0; i < items.length; i++) {
        const element = items[i].store_name;
        const price = Number(items[i].price);
        if(bussiness[element] === undefined) {
            bussiness[element] = 0;
        }
        bussiness[element] += price;
        
    }


    
    res.render('dashboard', {
        msg: zak.getMsg(),
        i: (sum && sum.total) ? sum.total : 0,
        bussiness,
        // stores: (sum && sum.items) ? sum.items : []
    })
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

app.post('/clearcart', async function (req, res) {
    if ( await req.session.cart) {
        req.session.cart = {
            items: [],
            total: 0
        }
    };

    res.render('viewcart', {

    })
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
