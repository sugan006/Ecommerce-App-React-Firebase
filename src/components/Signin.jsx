import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
        toast.success("Signed in successfully!");

        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-500 text-center mb-4">{formik.errors.email}</p>
        )}

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border border-gray-300 rounded-md"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>
        {formik.errors.password && formik.touched.password && (
          <p className="text-red-500 text-center mb-4">{formik.errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </form>

      <footer className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </a>
        </p>
      </footer>
    </div>
  );
};