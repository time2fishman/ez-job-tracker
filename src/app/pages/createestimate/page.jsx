"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

export default function CreateEstimatePage() {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
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
      const { firstName, lastName, email, address, city, state, zip, phone } =
        formData;
      const totalAmount = formData.total;
      const updatedFormData = {
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
    } catch (err) {
      console.error("Error creating estimate:", err);
    }
  };

  return (
    <div className="m-auto bg-gray-100 text-black min-w-fit max-w-4xl">
      <h1 className="text-4xl pt-10 pb-10 ml-4">Create New Estimate</h1>
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    city: e.target.value,
                  })
                }
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
                    state: e.target.value,
                  })
                }
                type="text"
                id="state"
                name="state"
                className="border px-1 mb-2"
                minLength={2}
                maxLength={2}
                size={2}
                height={26}
                required
              />
            </div>
            <div>
              <label htmlFor="zip" className="block">
                Zip
              </label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    zip: e.target.value,
                  })
                }
                type="text"
                id="zip"
                name="zip"
                className="px-1 border mb-2"
                minLength={5}
                maxLength={5}
                size={5}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block">
                Phone
              </label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                type="tel"
                id="phone"
                name="phone"
                className="px-1 border mb-10 placeholder:text-center"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength={12}
                size={13}
                placeholder="000-000-0000"
                required
              />
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
