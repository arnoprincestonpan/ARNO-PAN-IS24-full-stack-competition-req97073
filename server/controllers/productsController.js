import { v4 as uuid } from "uuid"
import database from '../db.json'

// let products = database
let products = []

export const getProducts = (req, res) => {
    res.send(products)
} 

export const createProduct = (req, res) => {
    const product = req.body
    // save onto local obj variable products
    if(Object.keys(product).length !== 0){
        products.push({ ...product, productId: uuid()})
        res.send("Product Added Successfully.")
    } else {
        res.send("Please enter some information for Product.")
    }
}

export const getProductByProductId = (req, res) => {
    const singleProduct = products.filter((product) => product.productId === req.params.productId)
    if(Object.keys(singleProduct).length !== 0){
        console.log(singleProduct)
        res.send(singleProduct)
    } else {
        res.send("Product not found.")
    }
}

export const deleteProductByProductId = (req, res) => {
    const singleProduct = products.filter((product) => product.productId === req.params.productId)
    if(Object.keys(singleProduct).length !== 0){
        products = products.filter((product) => product.productId !== req.params.productId)
        res.send("Product deleted.")
    } else {
        res.send("Product not found.")
    }
}

export const updateProductByProductId = (req, res) => {
    const singleProduct = products.find((product) => product.productId === req.params.productId)
    console.log(singleProduct)
    if(singleProduct !== undefined){
        singleProduct.productName = req.body.productName
        singleProduct.productOwnerName = req.body.productOwnerName
        singleProduct.Developers = req.body.Developers
        singleProduct.scrumMasterName = req.body.scrumMasterName
        singleProduct.startDate = req.body.startDate
        singleProduct.methodology = req.body.methodology
        res.send("Product updated.")
    } else {
        res.send("Product not found.")
    }
}