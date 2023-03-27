import express from "express"
import { getProducts, 
    createProduct,
    getProductByProductId,
    deleteProductByProductId,
    updateProductByProductId 
} from "../controllers/productsController"

const router = express.Router()

router.get("/api/products", getProducts)
router.post('/api/products', createProduct)
router.get('/api/product/:productId', getProductByProductId)
router.delete('/api/product/:productId', deleteProductByProductId)
router.put('/api/product/:productId', updateProductByProductId)

module.exports = router