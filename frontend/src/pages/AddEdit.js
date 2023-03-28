import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";

const initalState = {
  productName: "",
  productOwnerName: "",
  Developers: [],
  scrumMasterName: "",
  startDate: "",
  methodology: "",
};

function AddEdit() {
  const [state, setState] = useState(initalState);

  const {
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  } = initalState;

  const history = useNavigate();

  const addProduct = async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/products",
      data
    );
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  // prevent browser defaults
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !productName ||
      !productOwnerName ||
      !Developers ||
      !scrumMasterName ||
      !startDate ||
      !methodology
    ) {
      toast.error("Please provide values into each input field(s).")
    } else if(Developers > 5){
      toast.error("Please enter less than 5 developers.")
    } else if(!Array.isArray(Developers)){
      toast.error(`Please enter an Array of first name(s) and last name(s), up to 5. Format: ["Jane Doe", "James Bond"]`)
    } else {
      addProduct(state);
      history.push("/");
    }
  };

  const handleInputChange = (e) => {
    let { productName, value } = e.target;
    setState({ ...state, [productName]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Enter Product Name..."
          onChange={handleInputChange}
          value={productName}
        />

        <label htmlFor="productOwnerName">Product Owner Name</label>
        <input
          type="text"
          id="productOwnerName"
          name="productOwnerName"
          placeholder="Enter Product Owner Name..."
          onChange={handleInputChange}
          value={productOwnerName}
        />

        <label htmlFor="Developers">Developers</label>
        <input
          type="text"
          id="Developers"
          name="Developers"
          placeholder="Enter Developers Name(s)..."
          onChange={handleInputChange}
          value={Developers}
        />

        <label htmlFor="scrumMasterName">Scrum Master Name</label>
        <input
          type="text"
          id="scrumMasterName"
          name="scrumMasterName"
          placeholder="Enter Scrum Master Name..."
          onChange={handleInputChange}
          value={scrumMasterName}
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          type="text"
          id="startDate"
          name="startDate"
          placeholder="Enter Start Date MM/DD/YYYY..."
          onChange={handleInputChange}
          value={startDate}
        />

        <label htmlFor="methodology">Methodology</label>
        <input
          type="text"
          id="methodology"
          name="methodology"
          placeholder="Enter Methodology...Agile or Waterfall..."
          onChange={handleInputChange}
          value={methodology}
        />
      </form>
    </div>
  );
}

export default AddEdit;
