"use client";

import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const DataField = ({ label, type, placeholder, name, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-col sm:w-96">
        <label htmlFor={name} className="mb-2">
          {label}
        </label>
        <input
        value={value}
        onChange={onChange}
          id={name}
          name={name}
          required
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="p-2 bg-bgdarkgray rounded-3xl focus:outline text-black outline-blue-500 focus:border-blue-500 tracking-wide"
        />
        {type === "password" && (
          <i className="relative">
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute -top-7 right-2 cursor-pointer
            ${showPassword ? "text-blue-500" : "text-gray-500"}`}
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute -top-7 right-2 cursor-pointer
            ${showPassword ? "text-blue-500" : "text-gray-500"}`}
              />
            )}
          </i>
        )}
      </div>
    );
  };

  export default DataField;