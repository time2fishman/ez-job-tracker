"use client";

import axios from "axios";
import { useState } from "react";

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
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { firstName, lastName, email, address, city, state, zip, phone } =
        formData;
      const response = await axios.post("../../api/customers", {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zip,
        phone,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        itemDescription: "",
        qty: "",
        rate: "",
        amount: "",
      },
    ]);
  };

  const handleInputChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
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
              <label htmlFor="fname" className="block">
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
                id="fname"
                name="fname"
                className="border px-1 mb-2 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="lname" className="block">
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
                id="lname"
                name="lname"
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
              <label className="block">Zip</label>
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
              <label className="block">Phone</label>
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
                  <th className="p-2">Qty</th>
                  <th className="p-2">Rate</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-gray-400">
                  <td className="p-2">
                    <textarea
                      type="text"
                      id="item-description"
                      name="item-description"
                      className="border flex justify-self-center py-1 px-2 leading-snug"
                      rows={3}
                      maxLength={75}
                    />
                  </td>
                  <td className="p-2 border-l border-gray-400 text-right">
                    <input
                      type="text"
                      id="qty"
                      name="qty"
                      className="border flex justify-self-center text-right pr-2"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-400 text-right">
                    <input
                      type="text"
                      id="rate"
                      name="rate"
                      className="border flex justify-self-center text-right pr-2"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-400 text-right">
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      className="border flex justify-self-center text-right pr-2"
                    />
                  </td>
                </tr>
                {rows.map((row) => (
                  <tr key={row.id} className="border border-gray-400">
                    <td className="p-2">
                      <textarea
                        type="text"
                        value={row.firstName}
                        onChange={(e) =>
                          handleInputChange(row.id, "firstName", e.target.value)
                        }
                        className="border flex justify-self-center py-1 px-2 leading-snug"
                        rows={3}
                        maxLength={75}
                      />
                    </td>
                    <td className="p-2 border-l border-gray-400 text-right">
                      <input
                        type="text"
                        value={row.qty}
                        onChange={(e) =>
                          handleInputChange(row.id, "qty", e.target.value)
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
                    <td className="p-2 border-l border-gray-400 text-right ">
                      <input
                        type="text"
                        value={row.amount}
                        onChange={(e) =>
                          handleInputChange(row.id, "amount", e.target.value)
                        }
                        className="border flex justify-self-center text-right pr-2"
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
                {/* <tr className="border border-gray-400">
                <td className="p-2">{estimateData[0].itemDescription2}</td>
                <td className="p-2 border-l border-gray-400 text-right">
                  {estimateData[0].qty2}
                </td>
                <td className="p-2 border-l border-gray-400 text-right">
                  {estimateData[0].rate2}
                </td>
                <td className="p-2 border-l border-gray-400 text-right">
                  {estimateData[0].amount1}
                </td>
              </tr> */}
              </tbody>
              <tfoot>
                <tr>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                  <td className="text-lg text-right pt-6 pb-4 px-2">Total</td>
                  <td className="pt-6 px-2 pb-4 text-right">
                    <input
                      type="text"
                      id="total"
                      name="total"
                      className="border flex justify-self-center text-right pr-2"
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
