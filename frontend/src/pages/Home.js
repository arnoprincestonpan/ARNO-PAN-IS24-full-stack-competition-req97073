import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // retrieve all Products from Backend
  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    if (response.status === 200) {
      setData(response.data);
    } else {
      console.log("Server is not on or Error.");
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">Product Number</th>
            <th scope="col">Product Name</th>
            <th scope="col">Scrum Master</th>
            <th scope="col">Product Owner</th>
            <th scope="col">Developer Names</th>
            <th scope="col">Start Date</th>
            <th scope="col">Methodology</th>
          </tr>
        </thead>
        <tbody>
            {data &&
              data.map((product, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{product.productId}</th>
                    <td>{product.productName}</td>
                    <td>{product.scrumMasterName}</td>
                    <td>{product.productOwnerName}</td>
                    <td>{product.Developers.join(", \n")}</td>
                    <td>{product.startDate}</td>
                    <td>{product.methodology}</td>
                  </tr>
                );
              })}
          </tbody>
      </table>
    </div>
  );
}

export default Home;
