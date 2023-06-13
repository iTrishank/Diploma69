import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const OnBoarding = () => {
  //* Get cookie value by name
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split("=");
      acc[cookieName] = cookieValue;
      return acc;
    }, {});

    return cookies[name] || "";
  };
  const [formData, setFormData] = useState({
    user_id: getCookie("UserId"),
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "",
    gender_interest: "",
    url: "",
    about: "",
    matches: [],
  });

  let navigate = useNavigate();

  console.log(formData);

  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="Golden-gender-identity"
                type="radio"
                name="gender_identity"
                value="Golden"
                onChange={handleChange}
                checked={formData.gender_identity === "Golden"}
              />
              <label htmlFor="Golden-gender-identity">Golden Retriever</label>

              <input
                id="Doberman-gender-identity"
                type="radio"
                name="gender_identity"
                value="Doberman"
                onChange={handleChange}
                checked={formData.gender_identity === "Doberman"}
              />
              <label htmlFor="Doberman-gender-identity">Doberman</label>

              <input
                id="german-gender-identity"
                type="radio"
                name="gender_identity"
                value="german"
                onChange={handleChange}
                checked={formData.gender_identity === "german"}
              />
              <label htmlFor="more-gender-identity">Germany Shepard</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="Golden-gender-interest"
                type="radio"
                name="gender_interest"
                value="Golden"
                onChange={handleChange}
                checked={formData.gender_interest === "Golden"}
              />
              <label htmlFor="Golden-gender-interest">Golden Retriever</label>
              <input
                id="Doberman-gender-interest"
                type="radio"
                name="gender_interest"
                value="Doberman"
                onChange={handleChange}
                checked={formData.gender_interest === "Doberman"}
              />
              <label htmlFor="Doberman-gender-interest">Doberman</label>

              <input
                id="german-gender-interest"
                type="radio"
                name="gender_interest"
                value="german"
                onChange={handleChange}
                checked={formData.gender_interest === "german"}
              />
              <label htmlFor="everyone-gender-interest">Germany Shepard</label>
            </div>
            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like bones.."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="Profile pic Preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
