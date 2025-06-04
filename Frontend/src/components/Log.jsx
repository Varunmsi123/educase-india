import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export const Log = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("http://localhost:5000/login", values, { withCredentials: true });
      alert(res.data.message);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">
          Sign in to your <span className="highlight">PopX</span> account
        </h2>
        <p className="login-subtext">Welcome back! Please enter your credentials to continue.</p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="form-group">
              <label>Email address<span className="required">*</span></label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Password<span className="required">*</span></label>
              <Field type="password" name="password" className="input-field" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" className="login-button">Login</button>
          </Form>
        </Formik>

        <p className="signup-text">
          Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
