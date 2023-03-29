import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const onDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      const response = await axios
        .delete(`http://localhost:5000/api/product/` + id)
        .then((res) => {
          if (res.status === 200) {
            toast.success(
              "Deleted Product Successfully. Wait for refresh. Or refresh browser."
            );
            getProducts(); // refresh get products again
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
            <th scope="col">Action</th>
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

                  <td>
                    <Link to={`/update/${product.productId}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDeleteProduct(product.productId)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${product.productId}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
