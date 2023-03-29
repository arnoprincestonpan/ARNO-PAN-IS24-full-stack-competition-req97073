import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const {productId} = useParams()

  const getSingleProduct = async(productId) => {
    const response = await axios
    .get(`http://localhost:5000/api/product/` + productId)
    .then((res) => {
      if (res.status === 200) {
        console.log(productId)
        setState(res.data[0])      
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const updateSingleProduct = async(state) => {
    const response = await axios
    .put(`http://localhost:5000/api/product/${productId}`, state)
    .then(res => {
      if(res.status === 200){
        toast.success("Editted Product Successfully.")
        // navigate("/", 500); // head Home.js, 1/2 a second to refresh
        navigate(`/view/${productId}`, 500)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(productId) {
      console.log(productId)
      getSingleProduct(productId)
    }
  }, [productId])

  // patterns to pass
  const datePattern = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/;
  const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

  // prevent browser defaults
  const handleSubmit = (e) => {
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
    } else if (!typeof(state.productName) == "string") {
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
      console.log(state.Developers);
      toast.error("Developers: Please enter less than 5 developers.");
    } else if (!Array.isArray(state.Developers)) {
      console.log(state.Developers);
      toast.error(
        `Developers: Please enter an Array of first name(s) and last name(s), up to 5. Format: ["Jane Doe", "James Bond"]`
      );
    } else if (
      !state.methodology.toLowerCase() === "agile" ||
      !state.methodology.toLowerCase() === "waterfall"
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
      <p>Home &gt; Edit</p>
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
