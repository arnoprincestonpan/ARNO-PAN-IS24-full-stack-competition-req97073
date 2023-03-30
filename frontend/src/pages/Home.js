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
  // useState for searching for Developer Name
  const [devName, setDevName] = useState("");


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

  // get all Products from Backend
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        document.getElementById(
          "number-of-products"
        ).innerHTML = `404 Error: Empty JSON Database`;
      } else {
        console.log("Server is not on or Error.");
      }
    }
  };

  // filter Products from Frontend, for Scrum Master Name
  const handleScrumSearch = () => {
    const filteredData = data.filter((product) =>
      product.scrumMasterName.toLowerCase().includes(scrumName.toLowerCase())
    );
    if (filteredData.length === 0) {
      toast.warning(`${scrumName} not found.`);
      getProducts();
    } else {
      toast.success("Congrats. Here are the results for: " + scrumName);
      setData(filteredData);
    }
  };

  // filter Products from Frontend, for Developer Name
  const handleDevSearch = () => {
    const filteredData = data.filter((product) =>
      product.Developers.some((developer) =>
        developer.toLowerCase().includes(devName.toLowerCase())
      )
    );
    if (filteredData.length === 0) {
      toast.warning(`${devName} not found.`);
      getProducts();
    } else {
      toast.success("Congrats. Here are the results for: " + devName);
      setData(filteredData);
    }
  };

  // clear the Searches and reload to all Products
  const handleClearSearch = () => {
    toast.warning("Search Cleared.");
    setScrumName("");
    setDevName("");
    getProducts();
  };

  return (
    <div>
      <h1>Products</h1>
      <p id="number-of-products">Number of Products Available: {data.length}</p>
      <div className="dashboard">
        <div className="search-table">
          {/* Scrum Master Name Search */}
          <div className="search-row">
            <label className="search-cell" htmlFor="searchScrum">
              Scrum Master Name:{" "}
            </label>
            <input
              className="search-cell"
              type="text"
              id="searchScrum"
              name="searchScrum"
              value={scrumName}
              onChange={(e) => setScrumName(e.target.value)}
            />
            <button
              className="btn btn-search search-cell"
              onClick={handleScrumSearch}
            >
              Search
            </button>
          </div>
          {/* Developer Name Search */}
          <div className="search-row">
            <label className="search-cell" htmlFor="searchDeveloper">
              Developer Name:{" "}
            </label>
            <input
              className="search-cell"
              type="text"
              id="searchDeveloper"
              name="searchDeveloper"
              value={devName}
              onChange={(e) => setDevName(e.target.value)}
            />
            <button
              className="btn btn-search search-cell"
              onClick={handleDevSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* Clear Button */}
      <button className="btn btn-clear search-cell" onClick={handleClearSearch}>
        Clear Search
      </button>
      <br />
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
