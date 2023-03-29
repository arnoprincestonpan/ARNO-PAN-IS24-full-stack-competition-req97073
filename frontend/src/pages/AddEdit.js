import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";


function AddEdit() {

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

  // use to add new product on serverside
  const addProduct = async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/products",
      data
    );
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  // patterns to pass
  const datePattern = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
  const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/

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
      toast.error("Please provide values into each input field(s).")
    } else if(!namePattern.test(productName)) {
      toast.error("Please enter a first and last name that has their first letters capitalized.")
    } else if(state.Developers.length > 5){
      console.log(state.Developers)
      toast.error("Please enter less than 5 developers.")
    } else if(!Array.isArray(state.Developers)){
      console.log(state.Developers)
      toast.error(`Please enter an Array of first name(s) and last name(s), up to 5. Format: ["Jane Doe", "James Bond"]`)
    } else if(!state.methodology === "Agile" || !state.methodology === "Waterfall"){
      console.log(state.methodology)
      toast.error(`Please enter "Agile" or "Waterfall"`)
    } else if(!datePattern.test(state.startDate)){
      toast.error(`Please enter a date pattern like 2023/03/28. YYYY/MM/DD`)
    } else {
      addProduct(state); // only add into server.js once checks have passed
      navigate("/"); // head Home.js
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Enter Product Name"
          onChange={(e) => setState({...state, productName : e.target.value})}
          value={state.productName}
        />

        <label htmlFor="productOwnerName">Product Owner Name</label>
        <input
          type="text"
          id="productOwnerName"
          name="productOwnerName"
          placeholder="Enter Product Owner Name..."
          onChange={(e) => setState({...state, productOwnerName : e.target.value})}
          value={state.productOwnerName}
        />

        <label htmlFor="Developers">Developers</label>
        <input
          type="text"
          id="Developers"
          name="Developers"
          placeholder="Enter Developers Name(s)..."
          onChange={(e) => setState({...state, Developers : e.target.value.split(",")})}
          value={state.Developers}
        />

        <label htmlFor="scrumMasterName">Scrum Master Name</label>
        <input
          type="text"
          id="scrumMasterName"
          name="scrumMasterName"
          placeholder="Enter Scrum Master Name..."
          onChange={(e) => setState({...state, scrumMasterName : e.target.value})}
          value={state.scrumMasterName}
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          type="text"
          id="startDate"
          name="startDate"
          placeholder="Enter Start Date MM/DD/YYYY..."
          onChange={(e) => setState({...state, startDate : e.target.value})}
          value={state.startDate}
        />

        <label htmlFor="methodology">Methodology</label>
        <input
          type="text"
          id="methodology"
          name="methodology"
          placeholder="Enter Methodology...Agile or Waterfall..."
          onChange={(e) => setState({...state, methodology : e.target.value})}
          value={state.methodology}
        />
        <br/>
        <input type="submit" value="Add"/>
      </form>
    </div>
  );
}

export default AddEdit;
