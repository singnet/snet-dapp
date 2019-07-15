import React, { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback(event);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  });
  return <div />;
};

export default useOutsideClick;
