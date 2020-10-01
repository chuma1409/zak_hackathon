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


app.get('/', function (req, res) {

    res.render('index', {
        updateCart: zak.getProducts()
    });


});

app.get('/viewcart', function (req, res) {
    res.render('viewcart', {
        cart: req.session.cart || {}
    })
})
app.get('/dashboard', function (req, res) {

    res.render('dashboard', {

    })
});


function addToCart(currentCart, productId) {
    let cart = currentCart;

    // if the cart doesn't exist yet create a cart
    if (!cart) {
        cart = {
            items: [],
            total: 0
        };
    }

    const product = zak.getProductById(productId);
    cart.items.push(product)
    cart.total += product.price;
    
    return cart;
}

app.post('/cart', function (req, res) {

    req.session.cart = addToCart(req.session.cart, req.body.productId);
    
    res.redirect('/')
})

app.post('/clearcart', function (req, res) {
    if (req.session.cart) {
        req.session.cart = {
            items: [],
            total: 0
        }
    };

    res.render('viewcart', {

    })
})

app.get('/removeItem/:productId', function (req, res) {

    // let itemsArray = req.session.cart.items.push(product)

    const productId = req.params.productId;

    const product = zak.getProductById(productId);

    req.session.cart.items = req.session.cart.items.filter(function(item){
          return item.id != productId
    });

    req.session.cart.total -= product.price;

    
    res.redirect("/viewcart");

});


const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});
