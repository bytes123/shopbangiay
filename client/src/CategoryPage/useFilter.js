import { useState, useEffect } from "react";

const useFilter = (callback, validate) => {
  const [filterValues, setFilterValues] = useState({
    filter_brand: "",
    filter_price: "",
    filter_size: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setNewFilterValues = (name, value) => {
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  return { filterValues, setNewFilterValues };
};

export default useFilter;
