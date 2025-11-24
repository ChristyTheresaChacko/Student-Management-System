import React from "react";
import Header from "../components/Header";
import PropTypes from "prop-types";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";

/* ---------- MOCK REDUX STORE CREATOR ---------- */
const mockStore = (role) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: { role },
        token: "sample-token",
      },
    },
  });

/* ------------ STORYBOOK DEFAULT EXPORT ------------ */
export default {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],

  decorators: [
    (Story, context) => {
      const role = context.args.role || "user";

      return (
        <Provider store={mockStore(role)}>
          <MemoryRouter>
            <div style={{ padding: "20px", background: "#f5f5f5" }}>
              <Story />
            </div>
          </MemoryRouter>
        </Provider>
      );
    },
  ],

  argTypes: {
    title: { control: "text" },
    role: { control: "text" },
  },
};

/* ------------ HEADER PROPTYPES (optional but clean) ------------ */
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

/* ----------------------- STORIES ----------------------- */

export const Admin = {
  args: {
    title: "Admin Dashboard",
    role: "admin",
  },
};

export const Teacher = {
  args: {
    title: "Teacher Dashboard",
    role: "teacher",
  },
};

export const Student = {
  args: {
    title: "Student Dashboard",
    role: "student",
  },
};
