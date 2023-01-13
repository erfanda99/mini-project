let express = require('express')
let moment = require('moment')
let app = express()
let port = 3000

let models = require('./models/index')

app.use(express.json())

app.listen(port, () => {
    console.log('Example app listen to port '+ port)
})

app.get('/', (req, res) => {
    res.send('Hello world!')
})

function logUrl(req, res, next) {
    console.log('Request URL ', req.originalUrl)
    next()
}

// MERCHANT

app.get('/merchant', logUrl, (req, res) => {
    models.Merchant.findAll().then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(result)
    })
})
app.get('/merchant/:id', (req, res) => {
    models.Merchant.findOne({ where: {id: req.params.id} }).then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(result)
    })
})
app.post('/merchant', (req, res) => {
    let createMerchant = models.Merchant.create(req.body)
    if (!createMerchant) {
        console.error('Error create Merchant')
    } else {
        res.send('New merchant created! Name: '+ req.body.name)
        
    }
    // res.json(req.body)
})
app.put('/merchant/:id', (req, res) => {
    merchantId = req.params.id
    models.Merchant.update(
        req.body,
        {
            where: 
            {
                id: req.params.id
            }
        }
    ).then(merchantId => {
        res.send("Success update Merchant with ID: "+merchantId)
    });
})
app.delete('/merchant/:id', (req, res) => {
    models.Merchant.findOne({ where: {id: req.params.id} }).then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        result.destroy()
        res.send("Success delete Merchant with ID: " +req.params.id)
    })
})

app.get('/merchant/:id/product', (req, res) => {
    models.Product.findOne({ where: {merchant_id: req.params.id} }).then(function(result) {
        productId = req.params.id
        if (!result || result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json({
                    message: "List Products of Merchant ID : " + productId,
                    Products: result
                })
    })
})


// PRODUCT

app.get('/product', logUrl, (req, res) => {
    models.Product.findAll().then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(result)
    })
})
app.get('/product/:id', (req, res) => {
    models.Product.findOne({ where: {id: req.params.id} }).then(function(result) {
        if (!result || result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(result)
    })
})
app.post('/product', (req, res) => {
    let createProduct = models.Product.create(req.body)
    if (!createProduct) {
        console.error('Error create Product')
    } else {
        res.send('New product created! Name: '+ req.body.name)
        
    }
    // res.json(req.body)
})
app.put('/product/:id', (req, res) => {
    productId = req.params.id
    models.Product.update(
        req.body,
        {
            where: 
            {
                id: req.params.id
            }
        }
    ).then(productId => {
        res.send("Success update Product with ID: "+productId)
    });
})
app.delete('/product/:id', (req, res) => {
    models.Product.findOne({ where: {id: req.params.id} }).then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        result.destroy()
        res.send("Success delete Product with ID: " +req.params.id)
    })
})

// User

app.get('/user', logUrl, (req, res) => {
    models.User.findAll().then(function(result) {
        if (!result || result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(result)
    })
})
app.get('/user/:id', (req, res) => {
    models.User.findOne({ where: {id: req.params.id} }).then(function(result) {
        if (!result || result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(result)
    })
})
app.post('/user', (req, res) => {
    let createUser = models.User.create(req.body)
    if (!createUser) {
        console.error('Error create User')
    } else {
        res.send('New User created! Name: '+ req.body.username)
        
    }
    // res.json(req.body)
})
app.put('/user/:id', (req, res) => {
    userId = req.params.id
    models.User.update(
        req.body,
        {
            where: 
            {
                id: req.params.id
            }
        }
    ).then(userId => {
        res.send("Success update User with ID: "+userId)
    });
})
app.delete('/user/:id', (req, res) => {
    models.User.findOne({ where: {id: req.params.id} }).then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        result.destroy()
        res.send("Success delete User with ID: " +req.params.id)
    })
})


app.post('/login', (req, res) => {
    models.User.findOne({ where: {username: req.body.username} }).then(function(result) {
        if (result.length < 1) {
            res.json({message: "User NOT FOUND"})
        }
        else {
            if (result[0].password == req.body.password) {
                res.json({message: "Login Success"})
            }
            else {res.json({message: "Login Failed"})}
        }
    })
})