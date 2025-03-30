"use client";

import React, { useState, useEffect } from "react";
import EstimateModal from "@/app/pages/_components/EstimateModal/EstimateModal";
import Link from "next/link";
import formatDate from "../../../utils/dateUtils"; // Import the date formatting function

export default function EstimatesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpenModal = (estimate) => {
    setSelectedEstimate(estimate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEstimate(null);
  };

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await fetch("/api/estimates");
        if (!response.ok) {
          throw new Error("Failed to fetch estimates");
        }
        const data = await response.json();
        setEstimates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimates();
  }, []);

  return (
    <>
      {isModalOpen ? (
        <EstimateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          estimate={selectedEstimate}
        />
      ) : (
        <section className="container px-4 mx-auto mb-20 z-0">
          <h1 id="heading" className="text-4xl mt-10 mb-4">
            Estimates
          </h1>
          <div className="pb-4 text-right">
            <Link href={"/pages/createestimate"}>
              <button className="bg-indigo-700 p-1.5 border rounded font-semibold hover:bg-indigo-500 active:bg-indigo-800">
                Create New Estimate
              </button>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                          Estimate Id
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                          Date
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                          Customer
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            Loading...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center py-4 text-red-500"
                          >
                            {error}
                          </td>
                        </tr>
                      ) : estimates.length > 0 ? (
                        estimates.map((estimate) => (
                          <tr
                            key={estimate._id}
                            className="cursor-pointer"
                            onClick={() => handleOpenModal(estimate)}
                          >
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {estimate.estimateId}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {formatDate(estimate.date)}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {estimate.status || "Pending"}
                            </td>
                            <td className="pl-4 pr-8 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <div>
                                <p>
                                  {estimate.firstName} {estimate.lastName}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {estimate.email}
                                </p>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            No estimates found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
