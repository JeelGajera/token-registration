'use client';

import Link from "next/link";
import React from "react";


const config = {
  blue: "bg-blue-500 border-0",
  primary: "bg-transparent border",
  gradient: "bg-gradient-to-r from-yellow-500 to-blue-500 hover:animated-pulse onfocus:translate-y-2"
};


function Button({ onClick, ref, type, size, children,btype, className, name, ...props}) {
  return (
    <button
      name={name}
      type={btype}
      onClick={onClick}
      ref={ref}
      {...props}
      className={`text-white px-12 py-3 rounded-[50px] transform active:translate-y-1 ${config[type]} ${className}`}
    >
      <span>{children}</span>
    </button>
  );
}

export const LinkButton = React.forwardRef(
  (
    {
      onClick,
      href="" ,
      type = "primary",
      children,
      className
    },
    ref
  ) => {
    return (
      <Link
        href={href}
        onClick={onClick}
        ref={ref}
        className={`text-white px-8 py-2 sm:px-12 sm:py-3 border-0 rounded-[50px] transform active:translate-y-1 ${config[type]} ${className}`}
      >
        {children}
      </Link>
    );
  }
);
LinkButton.displayName = "LinkButton";

export default Button;