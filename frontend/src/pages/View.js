import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import "./View.css"

function View() {
  const [product, setProduct] = useState(null)

  const { productId } = useParams()

  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${productId}`)
        console.log(response.data)
        setProduct(response.data[0])
      } catch (error) {
        console.error(error)
      }
    }
    fetchProduct()
  }, [productId])

  return (
    <div>
      <p>Home &gt; View</p>
        <div className="card">
          <div className="card-header">
            <h2>Product Information</h2>
          </div>
          <div className="container">
            <p className="field-title">Product ID: </p>
            <p className="field-value">{product && product.productId}</p>
            <p className="field-title">Product Name: </p>
            <p className="field-value">{product && product.productName}</p>
            <p className="field-title">Product Owner Name: </p>
            <p className="field-value">{product && product.productOwnerName}</p>
            <p className="field-title">Developers: </p>
            <p className="field-value">{product && product.Developers.join(", ")}</p>
            <p className="field-title">Scrum Master Name: </p>
            <p className="field-value">{product && product.scrumMasterName}</p>
            <p className="field-title">Start Date: </p>
            <p className="field-value">{product && product.startDate}</p>
            <p className="field-title">Methodology: </p>
            <p className="field-value">{product && product.methodology}</p>
          </div>
        </div>
    </div>
  )
}

export default View 
