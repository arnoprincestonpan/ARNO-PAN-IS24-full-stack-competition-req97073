import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import "./View.css"

function View() {
  // initialize product useState
  const [product, setProduct] = useState(null)
  // get previous page's productId with useParams()
  const { productId } = useParams()

  // fetch the Product with the productId
  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${productId}`)
        console.log(response.data)
        if(response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
          setProduct(response.data[0])
        } else {
          console.error("Error: Invalid response data.")
        }
      } catch (error) {
        console.error(error)
        // set to empty not found Product
        setProduct({
          productId: `${productId} not found.`,
          productName: "Blank",
          productOwnerName: "Blank",
          Developers: ["Blank"],
          scrumMasterName: "Blank",
          startDate: "Blank",
          methodology: "Blank"
        })
      }
    }
    if(productId){
      fetchProduct()
    }
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
