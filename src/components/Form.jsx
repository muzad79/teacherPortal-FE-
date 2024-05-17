import React, { useEffect, useState, useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext"; // Assuming you have an AuthContext
const Form = ({
  inputFields,
  method,
  values,
  type,
  description,
  isAuthPage,
  route,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { setUser, login } = useContext(AuthContext);
  const [val] = useState(values);
  let initialValues = {};
  if (values == undefined) {
    initialValues = inputFields.reduce((acc, currentField) => {
      acc[currentField.name] = "";
      return acc;
    }, {});
  }
  initialValues = { ...val };

  const [focus, setFocus] = useState(false);

  const [formData, setFormData] = useState(values);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let config = {};
    if (!isAuthPage) {
      const token = localStorage.getItem("token");
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Add other headers as needed
        },
      };
    }
    let res;
    try {
      res = await axios[method](route, formData, config);
      console.log(res);
      if (res.status == 200 || res.status == 201) {
        navigate("/dashboard"); // Redirect to dashboard
        isAuthPage
          ? toast.success(res?.data?.message, { autoClose: 4000 })
          : toast.success(res?.data?.message, { autoClose: 4000 });
        if (res.data.token != undefined) {
          login(res.data);
        }
        navigate("/dashboard"); // Redirect to dashboard
        window.location.reload();
      } else {
        console.log("error");
        if (!isAuthPage) toast.error(res?.data?.message, { autoClose: 4000 });
        toast.error("Unauthorized");
      }
    } catch (error) {
      // if (!isAuthPage) toast.error(res?.data?.message, { autoClose: 4000 })
        if (!isAuthPage) toast.error("student already present", { autoClose: 4000 });;
      if (res?.status == 400) setError(error.data?.error[0].msg);
      
    }
    console.log(error);
  };

  return (
    <div
      className={`container mx-auto ${
        isAuthPage && "justify-center items-center align-center"
      } px-4 py-8`}
    >
      <h1 className="text-4xl font-semibold mb-6 text-center">{type}</h1>
      <form className={`w-full  mx-auto items-center flex flex-col`} method="POST">
        <div
          className={`grid ${
            isAuthPage ? "flex justify-center align-center" : "grid-cols-2"
          } gap-4`}
        >
          {inputFields.map((field, index) => (
            <div
              className={`flex flex-col w-full ${
                error ? "text-red-500" : ""
              } mb-4`}
            >
              <label htmlFor={field.name} className={`mb-1 text-gray-500`}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field?.name]}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`border ${
                  focus ? "border-blue-500" : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
          ))}
        </div>
        {description && (
          <div className="flex flex-col">
            <label htmlFor={description} className={`mb-1 text-gray-500`}>
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter Description"
              onChange={handleChange}
              onFocus={handleFocus}
              value={formData.description}
              onBlur={handleBlur}
              className={`border ${
                focus ? "border-blue-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>
        )}
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-500 mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {type}
        </button>
      </form>
    </div>
  );
};

export default Form;
