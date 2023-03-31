import express from "express"
import { getProducts, 
    createProduct,
    getProductByProductId,
    deleteProductByProductId,
    updateProductByProductId 
} from "../controllers/productsController"

// initialize express Router
const router = express.Router()

// get All Products
router.get("/api/products", getProducts)
// create one new Product
router.post('/api/products', createProduct)
// get a specific Product
router.get('/api/product/:productId', getProductByProductId)
// delete a specific Product
router.delete('/api/product/:productId', deleteProductByProductId)
// update a specific Product
router.put('/api/product/:productId', updateProductByProductId)

module.exports = router