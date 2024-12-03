import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { db } from "../firebase"; 
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

export const Contact = () => {
  
  const sendMessage = async (values, { resetForm }) => {
    try {
      
      await addDoc(collection(db, "contactMessages"), {
        name: values.name,
        email: values.email,
        message: values.message,
        timestamp: serverTimestamp(),
      });

      resetForm();
      toast.success("Message sent successfully!");

    } catch (err) {
      toast.error("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={validationSchema} 
        onSubmit={sendMessage}
      >
        <Form>
          <div className="mb-4">
            <Field
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <Field
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <Field
              as="textarea"
              name="message"
              placeholder="Your Message"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </Form>
      </Formik>
    </div>
  );
};
