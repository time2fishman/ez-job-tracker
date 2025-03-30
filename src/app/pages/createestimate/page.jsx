"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

export default function CreateEstimatePage() {
  const [rows, setRows] = useState([]);
  const [zipTouched, setZipTouched] = useState(false);
  const [stateTouched, setStateTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    estimateId: "",
    date: "",
    status: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    estimateRows: [],
    total: "0.00",
  });

  // Set the default date to the current date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: today, // Set the default date
    }));
    console.log("added date");
  }, []);

  // Generate estimateId on the client side after the component mounts
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      estimateId: `${Date.now()}`,
    }));
  }, []);

  useEffect(() => {
    const updatedTotal = calculateTotal(rows);
    setFormData((prevFormData) => ({
      ...prevFormData,
      total: updatedTotal,
      estimateRows: rows,
    }));
  }, [rows]); // Recalculate total when rows change

  const handleInputChange = debounce((id, field, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          // If field is either quantity or rate, recalculate amount
          if (field === "quantity" || field === "rate") {
            const quantity =
              field === "quantity"
                ? parseFloat(value) || 0
                : parseFloat(row.quantity) || 0;
            const rate =
              field === "rate"
                ? parseFloat(value) || 0
                : parseFloat(row.rate) || 0;
            const amount = (quantity * rate).toFixed(2); // Recalculate amount based on quantity and rate
            return { ...row, [field]: value, amount };
          } else {
            return { ...row, [field]: value }; // Just update the field if it's not quantity or rate
          }
        }
        return row;
      });
      return updatedRows;
    });
  });

  const handleZipChange = (e) => {
    const value = e.target.value;

    // Ensure the value is only numeric and limit the length to 5
    if (/^\d{0,5}$/.test(value)) {
      setFormData({
        ...formData,
        zip: value,
      });
    }
  };

  const isZipValidLength = formData.zip.length === 5;
  const isStateValidLength = formData.state.length === 2;
  const isPhoneValidLength =
    formData.phone.replace(/[^0-9]/g, "").length === 10;

  const handleZipBlur = () => {
    setZipTouched(true); // Mark the input as touched when the user leaves it
  };
  const handleStateBlur = () => {
    setStateTouched(true); // Mark the input as touched when the user leaves it
  };
  const handlePhoneBlur = () => {
    setPhoneTouched(true); // Mark the input as touched when the user leaves it
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        itemDescription: "",
        quantity: "",
        rate: "",
        amount: "0.00",
      },
    ]);
  };

  const calculateTotal = (updatedRows) => {
    return updatedRows
      .reduce((total, row) => {
        const amount = parseFloat(row.amount) || 0;
        return total + amount;
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        estimateId,
        date,
        status,
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zip,
        phone,
      } = formData;
      const totalAmount = formData.total;
      const updatedFormData = {
        estimateId,
        date,
        status,
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zip,
        phone,
        estimateRows: rows,
        total: totalAmount, // Use the total from formData
      };
      const response = await axios.post("../../api/estimates", updatedFormData);
      // console.log("Estimate Created:", response); // Log the response if needed
      if (response.status === 201) {
        setSuccessMessage("Estimate created successfully!");
        setErrorMessage(""); // Clear any previous error message
        setFormData({
          estimateId: "",
          date: "",
          status: "",
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          estimateRows: [],
          total: "0.00",
        }); // Reset form
        setRows([]); // Clear rows
      }
    } catch (err) {
      console.error("Error creating estimate:", err);
      setErrorMessage("Failed to create the estimate. Please try again."); // Set error message
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="m-auto bg-gray-100 text-black min-w-fit max-w-4xl">
      <h1 className="text-4xl pt-10 pb-10 ml-4">Create New Estimate</h1>
      <div className="mb-4 px-4 flex justify-between">
        <div className="ml-8">
          <label htmlFor="date" className="block mr-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
              })
            }
            className="border px-1 mb-2 w-auto"
            required
          />
        </div>
        <h4 className="text-xl mb-4 text-right mr-4">
          Estimate Id: <span>{formData.estimateId}</span>
        </h4>
      </div>
      {/* Display success or error messages */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center m-auto w-1/2">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4 text-center m-auto w-1/2">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mx-8">
        {/* Customer Fields */}
        <fieldset className="mb-8">
          <legend className="text-2xl mb-8">Customer Information</legend>
          <div className="max-w-xs px-4">
            <div>
              <label htmlFor="firstName" className="block">
                First Name
              </label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
                value={formData.firstName}
                maxLength={50}
                type="text"
                id="firstName"
                name="firstName"
                className="border px-1 mb-2 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block">
                Last Name
              </label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }
                value={formData.lastName}
                maxLength={25}
                type="text"
                id="lastName"
                name="lastName"
                className="border px-1 mb-2 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                value={formData.email}
                maxLength={25}
                type="email"
                id="email"
                name="email"
                className="border px-1 mb-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="address" className="block">
                Address
              </label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                value={formData.address}
                type="text"
                id="address"
                name="address"
                className="border px-1 mb-2 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block">
                City
              </label>
              <input
                onInput={(e) => {
                  const capitalizeWords = (str) => {
                    return str
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ");
                  };
                  // Allow only alphabetic characters
                  const filteredValue = e.target.value.replace(
                    /[^a-zA-Z\s.-]/g,
                    ""
                  );
                  // Update the value with the filtered value and capitalize words
                  e.target.value = capitalizeWords(filteredValue);
                  setFormData({
                    ...formData,
                    city: capitalizeWords(filteredValue),
                  });
                }}
                value={formData.city}
                type="text"
                id="city"
                name="city"
                className="border px-1 mb-2 w-full"
                maxLength={25}
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block">
                State
              </label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state: e.target.value.toUpperCase(),
                  })
                }
                value={formData.state}
                onBlur={handleStateBlur}
                pattern="[A-Za-z]{2}"
                onInput={(e) => {
                  // Remove non-alphabet characters and caplitalize text
                  e.target.value = e.target.value
                    .replace(/[^A-Za-z]/g, "")
                    .toUpperCase();
                }}
                type="text"
                id="state"
                name="state"
                className="border px-1 mb-2"
                // minLength={2}
                maxLength={2}
                size={3}
                height={26}
                required
              />
              {stateTouched && !isStateValidLength && formData.state && (
                <p id="state-error" style={{ color: "red" }}>
                  State must be exactly 2 characters.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="zip" className="block">
                Zip
              </label>
              <input
                onChange={handleZipChange}
                onBlur={handleZipBlur}
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                className="px-1 border mb-2"
                maxLength={5}
                size={5}
                aria-invalid={!isZipValidLength}
                aria-describedby="zip-error"
                required
              />
              {zipTouched && !isZipValidLength && formData.zip && (
                <p id="zip-error" style={{ color: "red" }}>
                  Zip code must be exactly 5 digits.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block">
                Phone
              </label>
              <input
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Ensure only numbers are entered
                  let formattedValue = numericValue;

                  // Apply format for phone number (XXX-XXX-XXXX)
                  if (numericValue.length > 6) {
                    formattedValue = `${numericValue.slice(
                      0,
                      3
                    )}-${numericValue.slice(3, 6)}-${numericValue.slice(
                      6,
                      10
                    )}`;
                  } else if (numericValue.length > 3) {
                    formattedValue = `${numericValue.slice(
                      0,
                      3
                    )}-${numericValue.slice(3)}`;
                  }

                  setFormData({
                    ...formData,
                    phone: formattedValue, // Update state with formatted value
                  });
                }}
                value={formData.phone} // Controlled input bound to formData.phone
                onBlur={handlePhoneBlur}
                type="tel"
                id="phone"
                name="phone"
                className="px-1 border placeholder:text-center mb-2"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength={12}
                size={13}
                placeholder="000-000-0000"
                required
              />
              {phoneTouched && !isPhoneValidLength && formData.phone && (
                <p id="phone-error" style={{ color: "red" }}>
                  Phone code must be exactly 10 digits.
                </p>
              )}
            </div>
          </div>
        </fieldset>
        {/* Estimate Fields */}
        <fieldset>
          <legend className="text-2xl mb-8">Job Details</legend>
          <div className="px-4">
            <table className="w-full mb-10 border border-gray-400">
              <thead>
                <tr className="bg-gray-600 text-gray-300 text-left border border-gray-400">
                  <th className="p-2">Item Description</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Rate</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border border-gray-400">
                    <td className="p-2">
                      <textarea
                        type="text"
                        value={row.itemDescription}
                        onChange={(e) =>
                          handleInputChange(
                            row.id,
                            "itemDescription",
                            e.target.value
                          )
                        }
                        className="border flex justify-self-center py-1 px-2 leading-snug"
                        rows={3}
                        maxLength={75}
                      />
                    </td>
                    <td className="p-2 border-l border-gray-400 text-right">
                      <input
                        type="text"
                        value={row.quantity}
                        onChange={(e) =>
                          handleInputChange(row.id, "quantity", e.target.value)
                        }
                        className="border flex justify-self-center text-right pr-2"
                      />
                    </td>
                    <td className="p-2 border-l border-gray-400 text-right">
                      <input
                        type="text"
                        value={row.rate}
                        onChange={(e) =>
                          handleInputChange(row.id, "rate", e.target.value)
                        }
                        className="border flex justify-self-center text-right pr-2"
                      />
                    </td>
                    <td className="p-2 border-l border-gray-400 text-right">
                      <input
                        type="text"
                        value={row.amount}
                        className="border flex justify-self-center text-right pr-2"
                        readOnly={true}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <button
                      type="button"
                      onClick={addRow}
                      className="border-2 border-gray-500 rounded py-1 px-2 mt-4 ml-2 text-gray-500 mb-4"
                    >
                      + Add Row
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                  <td className="text-lg text-right pt-6 pb-4 px-2">Total</td>
                  <td className="pt-6 px-2 pb-4 text-right">
                    <input
                      value={formData.total}
                      type="text"
                      id="total"
                      name="total"
                      className="border flex justify-self-center text-right pr-2"
                      readOnly={true}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="flex justify-end">
              <button
                type="submit"
                className="border bg-indigo-700 rounded py-2 px-4 text-gray-300 mb-10"
              >
                Create Estimate
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
