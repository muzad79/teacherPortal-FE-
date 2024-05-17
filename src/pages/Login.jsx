import React from "react";
import Form from "../components/Form";
import axios from "axios";
const page = () => {
    const route = `${import.meta.env.VITE_BASE_URL}/auth/login`; // Use VITE_BASE_URL
  const inputFields = [
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Enter Username",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter password",
    },
  ];
  const values = {
    name: "",
    password: "",
  };
  return (
    <div>
      <Form
        method={"post"}
        values={values}
        type={"Login"}
        route={route}
        inputFields={inputFields}
        isAuthPage={true}
      />
    </div>
  );
};

export default page;
