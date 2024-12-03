import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth();

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Please confirm your password."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const user = userCredential.user;
        await updateProfile(user, {
          displayName: values.name,
        });

        toast.success("Signed up successfully!");
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-500 text-center mb-4">{formik.errors.name}</p>
        )}

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

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border border-gray-300 rounded-md"
          />
          <span
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
          >
            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <p className="text-red-500 text-center mb-4">{formik.errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>

      <footer className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:text-blue-700">
            Sign In
          </a>
        </p>
      </footer>
    </div>
  );
};
