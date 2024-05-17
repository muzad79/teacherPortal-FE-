import { Password } from "@mui/icons-material";
import Form from "../components/Form";
import React from "react";

const page = () => {
    const route = `${import.meta.env.VITE_BASE_URL}/auth/register`; // Use VITE_BASE_URL
  const inputFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter Name",
    },
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
      placeholder: "Enter Password",
    },
  ];
  const values = {
    name: "",
    username: "",
    password: "",
  };
  return (
    <Form
      method={"post"}
      values={values}
      route={route}
      inputFields={inputFields}
      isAuthPage={true}
      type={"Register"}
    />
  );
};

export default page;
