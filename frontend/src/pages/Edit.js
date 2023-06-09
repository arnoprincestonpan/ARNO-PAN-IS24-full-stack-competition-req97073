import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Edit.css";
import { toast } from "react-toastify";

function Edit() {
  // default state
  const initalState = {
    productName: "",
    productOwnerName: "",
    Developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  };

  // initialize useState
  const [state, setState] = useState(initalState);

  // initialize useNavigate
  const navigate = useNavigate();

  // initialize useParams to retrieve productId
  const { productId } = useParams();

  // get a single product via the productId
  const getSingleProduct = async(productId) => {
    try {
      const response = await axios
      .get(`http://localhost:5000/api/product/` + productId)
      if(response.status === 200){
        setState(response.data[0])
      } else {
        throw new Error("Product not found.")
      }
    } catch(error) {
      console.error(error)
      if(error.response.status === 404) {
        toast.error("Product not found.")
      } else {
        toast.error("Failed to find product.")
      }
    }
  }

  // update the singleProduct via the productId
  const updateSingleProduct = async (state) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/product/${productId}`,
        state
      );
      if (response.status === 200) {
        toast.success("Product Updated Successfully.");
        navigate(`/view/${productId}`, 500);
      } 
    } catch (error) {
      console.error(error);
      if(error.response.status === 404){
        toast.error("Product not found.")
      } else {
        toast.error("Failed to update product.")
      }
    }
  };

  // if productId exists then we get the Product
  useEffect(() => {
    if (productId) {
      console.log(productId);
      getSingleProduct(productId);
    }
  }, [productId]);

  // patterns to pass
  const datePattern = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/;
  const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

  // filter submission data
  const handleSubmit = (e) => {
     // prevent browser defaults
    e.preventDefault();
    if (
      !state.productName ||
      !state.productOwnerName ||
      !state.Developers ||
      !state.scrumMasterName ||
      !state.startDate ||
      !state.methodology
    ) {
      toast.error("Please provide values into each input field(s).");
    } else if (!typeof state.productName === "string") {
      toast.error(
        "Product Name: Please enter strings only. i.e. St. Paul's Cathedral"
      );
    } else if (!namePattern.test(state.productOwnerName)) {
      toast.error(
        "Product Owner Name: Please enter a first and a last name, with only their first letters capitalized."
      );
    } else if (!namePattern.test(state.scrumMasterName)) {
      toast.error(
        "Scrum Master Name: Please enter a first and a last name, with only their first letters capitalized."
      );
    } else if (state.Developers.length > 5) {
      toast.error("Developers: Please enter less than 5 developers.");
    } else if (state.Developers.length === 0) {
      toast.error("You have entered no developers.")
    } else if (!Array.isArray(state.Developers)) {
      toast.error(
        `Developers: Please enter an Array of first name(s) and last name(s), up to 5. Format: ["Jane Doe", "James Bond"]`
      );
    } else if (
      !(
        state.methodology.toLowerCase() === "agile" ||
        state.methodology.toLowerCase() === "waterfall"
      )
    ) {
      console.log(state.methodology);
      toast.error(`Methodology: Please enter "Agile" or "Waterfall"`);
    } else if (!datePattern.test(state.startDate)) {
      toast.error(
        `Date Pattern: Please enter a date pattern like 2023/03/28. YYYY/MM/DD`
      );
    } else {
      updateSingleProduct(state); // only add into server.js once checks have passed
    }
  };

  return (
    <div>
      <p><Link to="/">Home</Link> &gt; Edit</p>
      <h2>Edit</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productId">Product Id</label>
        <input
          type="number"
          id="productId"
          name="productId"
          placeholder={state.productId ? state.productId : "Assigned by Server"}
          disabled
        />
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Enter Product Name"
          onChange={(e) => setState({ ...state, productName: e.target.value })}
          value={state.productName}
        />

        <label htmlFor="productOwnerName">Product Owner Name</label>
        <input
          type="text"
          id="productOwnerName"
          name="productOwnerName"
          placeholder="Enter Product Owner Name..."
          onChange={(e) =>
            setState({ ...state, productOwnerName: e.target.value })
          }
          value={state.productOwnerName}
        />

        <label htmlFor="Developers">Developers</label>
        <input
          type="text"
          id="Developers"
          name="Developers"
          placeholder="Enter Developers Name(s)..."
          onChange={(e) =>
            setState({ ...state, Developers: e.target.value.split(",") })
          }
          value={state.Developers}
        />

        <label htmlFor="scrumMasterName">Scrum Master Name</label>
        <input
          type="text"
          id="scrumMasterName"
          name="scrumMasterName"
          placeholder="Enter Scrum Master Name..."
          onChange={(e) =>
            setState({ ...state, scrumMasterName: e.target.value })
          }
          value={state.scrumMasterName}
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          type="text"
          id="startDate"
          name="startDate"
          placeholder="Enter Start Date YYYY/MM/DD..."
          onChange={(e) => setState({ ...state, startDate: e.target.value })}
          value={state.startDate}
        />

        <label htmlFor="methodology">Methodology</label>
        <input
          type="text"
          id="methodology"
          name="methodology"
          placeholder="Enter Methodology...Agile or Waterfall..."
          onChange={(e) => setState({ ...state, methodology: e.target.value })}
          value={state.methodology}
        />
        <br />
        <input type="submit" value="Edit" />
      </form>
    </div>
  );
}

export default Edit;
