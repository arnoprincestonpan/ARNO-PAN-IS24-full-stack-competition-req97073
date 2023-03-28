
// initialize fs to read/write later
const fs = require("fs")

export const getProducts = (req, res) => {
    let productsjson = fs.readFileSync("data.json", "utf-8")
    let products = JSON.parse(productsjson)
    
    if(products.length === 0){
        res.send("There are no products.")
    } else {
        res.send(products)
    }

    // fs.readFile("data.json", "utf8", (err, data) => {
    //     if(err){
    //         res.send("There was an error in fetching products. " + err)
    //     }else{
    //         res.send(data)
    //     }
    // })

    // if(Object.keys(products).length !== 0){
    //     res.send(products)
    // } else {
    //     res.send("No Products available.")
    // }
} 

export const createProduct = (req, res) => {
    const product = req.body
    // save onto local obj variable products

    // if(Object.keys(product).length !== 0){
    //     products.push({ ...product, productId: uuid()})
    //     res.send("Product Added Successfully.")
    // } else {
    //     res.send("Please enter some information for Product.")
    // }

    // if(Object.keys(product).length !== 0){
    //     products.push({...product, productId: uuid()})
    //     fs.writeFile("data.json", JSON.stringify({...product, productId: uuid()}), (err) => {
    //         if(err){
    //             res.send("There was an error in adding Product. Error: " + err)
    //         } else {
    //             res.send("Product Added Successfully.")
    //         }
    //     })
    // } else {
    //     res.send("Please enter some information for Product.")
    // }

    if(Object.keys(product).length !== 0){
        let productsjson = fs.readFileSync("data.json", "utf-8")
        let products = JSON.parse(productsjson)
        products.push({...product, productId: products.length + 1})
        productsjson = JSON.stringify(products, null, 4)
        fs.writeFileSync("data.json", productsjson, "utf-8")
        res.send(product)
    } else {
        res.send("Please enter some information for Product.")
    }

    
}

export const getProductByProductId = (req, res) => {
    let productsjson = fs.readFileSync("data.json", "utf-8")
    let products = JSON.parse(productsjson)
    const singleProduct = products.filter((product) => product.productId === req.params.productId)
    if(Object.keys(singleProduct).length !== 0){
        console.log(singleProduct)
        res.send(singleProduct)
    } else {
        res.send("Product not found.")
    }
}

export const deleteProductByProductId = (req, res) => {
    let productsjson = fs.readFileSync("data.json", "utf-8")
    let products = JSON.parse(productsjson)
    const singleProduct = products.filter((product) => product.productId === req.params.productId)
    if(Object.keys(singleProduct).length !== 0){
        products.pop(singleProduct)
        productsjson = JSON.stringify(products, null, 4)
        fs.writeFileSync("data.json", productsjson, "utf-8")
        res.send("Product deleted.")
    } else {
        res.send("Product not found.")
    }
}

export const updateProductByProductId = (req, res) => {
    let productsjson = fs.readFileSync("data.json", "utf-8")
    let products = JSON.parse(productsjson)
    const singleProduct = products.find((product) => product.productId === req.params.productId)
    if(singleProduct !== undefined){
        // remove previous copy of singleProduct
        products.pop(singleProduct)

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