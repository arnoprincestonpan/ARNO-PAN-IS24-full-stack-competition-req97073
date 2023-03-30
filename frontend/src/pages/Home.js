import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  // useState for products data
  const [data, setData] = useState([]);
  // useState for searching for Scrum Master Name
  const [scrumName, setScrumName] = useState("");

  // getProducts() right away on page load
  useEffect(() => {
    getProducts();
  }, []);

  // onDeleteProduct, find the productId and remove from Backend
  const onDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      const response = await axios
        .delete(`http://localhost:5000/api/product/` + productId)
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

  // filter Products from Frontend, for Scrum Master Name
  const handleSearch = () => {
    console.log(data);
    console.log(scrumName);
    const filteredData = data.filter((product) =>
      product.scrumMasterName.toLowerCase().includes(scrumName.toLowerCase())
    );
    console.log(filteredData);
    if (filteredData.length === 0) {
      toast.warning("Nothing found.");
      getProducts();
    } else {
      toast.success("Congrats. Here are the results for: " + scrumName);
      setData(filteredData);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <p>Number of Products Available: {data.length}</p>
      <div></div>
      <label htmlFor="searchScrum">Scrum Master Name: </label>
      <input
        type="type"
        id="searchScrum"
        name="searchScrum"
        value={scrumName}
        onChange={(e) => setScrumName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
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
