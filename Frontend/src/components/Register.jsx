import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    isAgency: ""
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    company: Yup.string().required("Company name is required"),
    isAgency: Yup.string().required("Please select an option")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, values);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create your <span className="highlight">PopX</span> account</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="form-group">
              <label>Full Name<span className="required">*</span></label>
              <Field type="text" name="fullName" className="input" />
              <ErrorMessage name="fullName" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Phone number<span className="required">*</span></label>
              <Field type="text" name="phone" className="input" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Email address<span className="required">*</span></label>
              <Field type="email" name="email" className="input" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Password <span className="required">*</span></label>
              <Field type="password" name="password" className="input" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Company name<span className="required">*</span></label>
              <Field type="text" name="company" className="input" />
              <ErrorMessage name="company" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Are you an Agency?<span className="required">*</span></label>
              <div className="radio-group">
                <label><Field type="radio" name="isAgency" value="Yes" /> Yes</label>
                <label><Field type="radio" name="isAgency" value="No" /> No</label>
              </div>
              <ErrorMessage name="isAgency" component="div" className="error" />
            </div>

            <button type="submit" className="submit-button">Create Account</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
