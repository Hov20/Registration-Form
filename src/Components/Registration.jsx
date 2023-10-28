import React, { useState } from "react";
import "./registration.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Registration = () => {
  let point = 0;
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    fullName: "",
    password: "",
    phone: "",
  });
  const [outputInfo, setOutputInfo] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (validation()) {
      setOutputInfo(
        `Information after Register button click.

Id: ${(point += 1)},
FullName: ${data.fullName},
Password: ${data.password},
Phone: ${data.phone},
        `
      );
      setData({
        fullName: "",
        password: "",
        phone: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validation = () => {
    let errors = {};

    const nameRegex =
      /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
    const passwordRegex = /^(?=.*\d)(?=.*\w)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const phoneRegex = /^(\+374|374|0)([1-9]\d{7})$/;

    if (!data.fullName.match(nameRegex)) {
      errors.fullName = "Error Name";
    }

    if (!data.password.match(passwordRegex)) {
      errors.password = "Error Password";
    }

    if (!data.phone.match(phoneRegex)) {
      errors.phone = "Error Phone";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="block">
      <div className="general">
        <div className="registr-list">
          <h2>Registration Form</h2>
          <div className="inputLine">
            <label htmlFor="fullName">Full name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={handleChange}
            />
            <br />
            <div style={{ color: "red" }}> {errors.fullName}</div>
          </div>
          <div className="inputLine">
            <label htmlFor="password">Password</label>
            <input
              type={visible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
            />
            <div className="passIcon" onClick={() => setVisible(!visible)}>
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </div>
            <br />
            <div style={{ color: "red" }}> {errors.password}</div>
          </div>
          <div className="inputLine">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={data.phone || "+374"}
              onChange={handleChange}
            />
            <br />
            <div style={{ color: "red" }}> {errors.phone}</div>
          </div>
          <button className="inputButton" onClick={handleClick}>
            Register
          </button>
        </div>
      </div>
      <div className="outputInfo">{outputInfo && <pre>{outputInfo}</pre>}</div>
    </div>
  );
};

export default Registration;
