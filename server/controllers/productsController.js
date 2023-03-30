
// initialize fs to read/write later
const fs = require("fs")

// route to get all Products (used on the Frontend's main page)
export const getProducts = (req, res) => {
    let productsjson = fs.readFileSync("data.json", "utf-8")
    let products = JSON.parse(productsjson)
    // sort productId by number value
    products = products.sort((a, b) => {
        if(a.productId < b.productId){
            return -1
        }
    })
    if(products.length === 0){
        // when there are no products within the JSON
        res.status(404).send({
            message: "There are no products."
        })
    } else {
        // success, send all products
        res.status(200).send(products)
    }
} 

// route to create a new Product (used on the Frontend's /add page)
export const createProduct = (req, res) => {
    const product = req.body

    // check if the user entered a product object
    if(Object.keys(product).length !== 0){
        // read json file and parse to JSON
        let productsjson = fs.readFileSync("data.json", "utf-8")
        let products = JSON.parse(productsjson)
        // assume it is adding at the end of the file, make newId length of products + 1
        let newId = products.length + 1
        // prevent same productId
        while(products.find((product) => product.productId == newId)){
            newId += 1
        }
        // add product and use newId and then write to JSON file, return product
        products.push({...product, productId: newId})
        productsjson = JSON.stringify(products, null, 4)
        fs.writeFileSync("data.json", productsjson, "utf-8")
        res.status(201).send(product)
    } else {
        res.send("Please enter some information for Product.")
        res.status(400).send({
            message: "Please enter some information for Product."
        })
    }
}

export const getProductByProductId = (req, res) => {
    let productsjson = fs.readFileSync("data.json", "utf-8")
    let products = JSON.parse(productsjson)
    let product = products.filter((product) => product.productId == req.params.productId)
    if(Object.keys(product).length !== 0){
        res.send(product)
    } else {
        res.send("Product not found.")
    }
}

export const deleteProductByProductId = (req, res) => {
    let productsjson = fs.readFileSync("data.json", "utf-8")
    let products = JSON.parse(productsjson)
    console.log(products)
    const singleProduct = products.filter((product) => product.productId == req.params.productId)[0]
    if(Object.keys(singleProduct).length !== 0){
        products = products.filter(product => product.productId !== singleProduct.productId)
        productsjson = JSON.stringify(products, null, 4)
        fs.writeFileSync("data.json", productsjson, "utf-8")
        res.send("Product Successfully Deleted.")
    } else {
        res.send("Product Not Found.")
    }
}

export const updateProductByProductId = (req, res) => {
    let productsjson = fs.readFileSync("data.json", "utf-8")
    let products = JSON.parse(productsjson)
    const singleProduct = products.filter((product) => product.productId == req.params.productId)[0]
    console.log(req.params.productId)
    if(singleProduct !== undefined){
        // remove previous copy of singleProduct
        products = products.filter(product => product.productId !== singleProduct.productId)

        singleProduct.productName = req.body.productName
        singleProduct.productOwnerName = req.body.productOwnerName
        singleProduct.Developers = req.body.Developers
        singleProduct.scrumMasterName = req.body.scrumMasterName
        singleProduct.startDate = req.body.startDate
        singleProduct.methodology = req.body.methodology

        // add new copy of singleProduct
        products.push(singleProduct)
        productsjson = JSON.stringify(products, null, 4)
        fs.writeFileSync("data.json", productsjson, "utf-8")

        res.send("Product updated.")
    } else {
        res.send("Product not found.")
    }
}