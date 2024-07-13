import React, { useEffect, useState } from "react";
import Resturants from "../ResturantLists";
import ResturantBox from "./ResturantBox";
import Modal from "react-modal";
import { TailSpin } from "react-loader-spinner";
import addRestuarant from "../API";
import { useCallback } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "85%",
    backgroundColor: "rgb(248, 234, 221)",
  },
};

const MainComponent = () => {
  const [isModal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    contact: "",
    description: "",
    type: "",
    parking: false,
    rating: "",
    famousDish: "",
    totalSeats: "",
    _id: "",
  });
  const [restList, setRestList] = useState(Resturants);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restList);
  useEffect(() => {
    setRestList(Resturants);
  }, []);

  const filterRestaurantsByName = (query) => {
    if (!query) {
      return restList;
    }
    return restList.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  function removeRest(id) {
    setIsLoading(true);
    setTimeout(() => {
      const newData = restList.filter((item) => item._id !== id);
      setRestList(newData);
      setIsLoading(false);
    }, 1000);
  }

  function editRest(id) {
    const findRest = restList.filter((item) => item._id === id);
    setFormData(findRest[0]);
    setModal(true);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    console.log(formData.name.length);
    if (formData.name.length > 40 || formData.name.length === 0)
      newErrors.name = "Name length should be between 1 to 40";
    if (formData.place.length > 30 || formData.place.length === 0)
      newErrors.place = "City length should be between 1 to 30";
    if (formData.contact.length > 14 || formData.contact.length === 0)
      newErrors.contact = "Contact length should not exceed 14 digits";
    if (formData.description.length > 100 || formData.description.length === 0)
      newErrors.description =
        "Description should not be more than 100 characters";
    if (formData.rating < 1 || formData.rating > 5)
      newErrors.rating = "Rating should be between 1 and 5";
    if (formData.famousDish.length > 20 || formData.famousDish.length === 0)
      newErrors.famousDish =
        "Special dish should not be more than 20 characters";
    if (formData.totalSeats > 400 || formData.totalSeats === 0)
      newErrors.totalSeats = "Seating capacity should not be more than 400";
    if (formData.type.length === 0)
      newErrors.type = "Please Add food type (Veg/Non-Veg)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // handle form submission, e.g., send the data to an API
    if (validate()) {
      if (formData["_id"] !== "") {
        //EDITING ALREADY ADDED RESTUARANT
        setRestList((prevRestaurants) =>
          prevRestaurants.map((restaurant) =>
            restaurant._id === formData?._id
              ? { ...restaurant, ...formData }
              : restaurant
          )
        );
      } else {
        //Creating new restuarant and post it by API
        const updatedData = await addRestuarant(formData);
        const newData = [...restList, updatedData];
        setRestList(newData);
      }
      setModal(false);
    }
    setIsLoading(false);
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const debouncedSearch = useCallback(debounce((query) => {
  setFilteredRestaurants(filterRestaurantsByName(query));
}, 300), [restList]);

const handleSearchChange = (e) => {
  const query = e.target.value;
  // setSearchQuery(query);
  debouncedSearch(query);
};


  useEffect(() => {
    if (!isModal) {
      console.log("Remove data");
      setFormData({
        name: "",
        place: "",
        contact: "",
        description: "",
        type: "",
        parking: false,
        rating: "",
        famousDish: "",
        totalSeats: "",
        _id: "",
      });
    }
  }, [isModal]);

  console.log(errors);
  return (
    <div className="main">
      {isLoading && <TailSpin height="80" width="120" color="red" />}
      <div>
        <div className="search-btn">
          <span>Search</span>
          <input type="text"  onChange={handleSearchChange} placeholder="By Name"></input>
        </div>
        <div className="add-btn" onClick={() => setModal(true)}>
          Add Restuarant
        </div>
      </div>
      <div className="grid-container2">
        {filteredRestaurants.length > 0 &&
          filteredRestaurants.map((rest) => {
            return (
              <ResturantBox
                editRest={editRest}
                removeRest={removeRest}
                Item={rest}
              />
            );
          })}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="not-found">
          <img width="50%" src="/not-found.jpg"></img>
          <h1 style={{ fontFamily: "fantasy" }}>
            No Resturants Found. Please Add
          </h1>
        </div>
      )}

      <Modal
        isOpen={isModal}
        id="formModal"
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-box">
          <div onClick={() => setModal(false)} className="modal-close">
            Close
          </div>
          <div>
            <h2>Enter the details for your Restuarant: </h2>
          </div>
          <div className="modal-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder=""
              value={formData.name}
              onChange={handleChange}
            />
            <p className="error">{errors.name}</p>
            <br></br>
            <label htmlFor="place">City</label>
            <input
              type="text"
              name="place"
              placeholder=""
              value={formData.place}
              onChange={handleChange}
            />
            <p className="error">{errors.place}</p>
            <br></br>
            <label htmlFor="contact">Contact</label>
            <input
              type="number"
              name="contact"
              placeholder=""
              value={formData.contact}
              onChange={handleChange}
            />
            <p className="error">{errors.contact}</p>
            <br></br>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Enter the description"
              rows={5}
              cols={3}
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <p className="error">{errors.description}</p>
            <br></br>
            <label htmlFor="type">Food Type</label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="select">Select</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non Vegetarian</option>
            </select>
            <p className="error">{errors.type}</p>

            <br></br>
            <div>
              <label htmlFor="parking">Parking</label>
              <input
                className="checkbox"
                type="checkbox"
                id="parking"
                name="parking"
                checked={formData.parking}
                onChange={handleChange}
              />
            </div>
            <br />
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              placeholder=""
              value={formData.rating}
              onChange={handleChange}
            />
            <p className="error">{errors.rating}</p>
            <br></br>
            <label htmlFor="famousDish">Special Dish</label>
            <input
              type="text"
              name="famousDish"
              placeholder=""
              value={formData.famousDish}
              onChange={handleChange}
            />
            <p className="error">{errors.famousDish}</p>
            <br></br>
            <label htmlFor="totalSeats">Seating Capacity</label>
            <input
              type="number"
              name="totalSeats"
              placeholder=""
              value={formData.totalSeats}
              onChange={handleChange}
            />
          </div>
          <div onClick={handleSubmit} className="modal-submit">
            Submit
          </div>
          <br></br>
        </div>
      </Modal>
    </div>
  );
};

export default MainComponent;
