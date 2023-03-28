import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import "./Home.css"
import axios from "axios"

function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  // retrieve all Products from Backend
  const getProducts = async() => {
    const response = await axios.get("http://localhost:5000/api/products")
    if(response.status === 200){
      setData(response.data)
    } else {
      console.log("Server is not on or Error.")
    }
  }

  return (
    <div style={{marginTop: "150px"}}>
      <h2>Home</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Scrum Master</th>
            <th>Product Owner</th>
            <th>Developer Names</th>
            <th>Start Date</th>
            <th>Methodology</th>
          </tr>
          <tbody>
            { data && data.map((product, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{product.productId}</td>
                </tr>
              )
            })}
          </tbody>
        </thead>
      </table>
    </div>
  )
}

export default Home