'use client'

import Image from "next/image";
import React, { useState } from "react";
import EstimateModal from "@/app/pages/_components/EstimateModal/EstimateModal"
import clientInfo from "@/app/data/client-data.json"
import Link from "next/link";

export default function EstimatesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen ? <EstimateModal isOpen={isModalOpen} onClose={handleCloseModal} /> :
        <section className="container px-4 mx-auto mb-20 z-0">
          <h1 id="heading" className="text-4xl mt-10 mb-4">Estimates</h1>
          <div className="pb-4 text-right">
            <Link href={'/pages/createestimate'}>
              <button
                className="bg-indigo-700 p-1.5 border rounded font-semibold hover:bg-indigo-500 active:bg-indigo-800 ">Create New Estimate</button>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-x-3">
                            <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                            <button className="flex items-center gap-x-2">
                              <span>Estimate</span>
                              <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Date
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Status
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Customer
                        </th>

                        {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Purchase
                        </th> */}
                        {/* 
                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Actions</span>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {clientInfo ? clientInfo.map((client) => (
                        <tr key={client.id} className="cursor-pointer" onClick={handleOpenModal}>
                          {client.estimates.map((estimate) => (
                            <React.Fragment key={estimate.estimateId}>
                              <td key={`estimate-id-${estimate.estimateId}`} className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                  <span>{estimate.estimateId}</span>
                                </div>
                              </td>
                              <td key={`date-${estimate.estimateId}`} className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{estimate.estimateDate}</td>
                              <td key={`status-${estimate.estimateId}`} className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                {estimate.status === "Accepted" ? (
                                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <h2 className="text-sm font-normal">{estimate.status}</h2>
                                  </div>
                                ) : estimate.status === "Pending" ? (
                                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 dark:bg-gray-800">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      {/* <!-- Clock Circle --> */}
                                      <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" fill="none" />

                                      {/* <!-- Clock Hour Hand --> */}
                                      <line x1="6" y1="6" x2="6" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

                                      {/* <!-- Clock Minute Hand --> */}
                                      <line x1="6" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

                                      {/* <!-- Clock Center --> */}
                                      <circle cx="6" cy="6" r="0.3" fill="currentColor" />
                                    </svg>

                                    <h2 className="text-sm font-normal">{estimate.status}</h2>
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <h2 className="text-sm font-normal">{estimate.status}</h2>
                                  </div>
                                )}

                              </td>
                              <td key={`customer-${estimate.estimateId}`} className="pl-4 pr-8 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <Image className="object-cover w-8 h-8 rounded-full" src={client.image} alt="" width={0} height={0} />
                                  <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{client.firstName} {client.lastName}</h2>
                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{client.email}</p>
                                  </div>
                                </div>
                              </td>
                              {/* <td key={`purchase-${estimate.estimateId}`} className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{estimate.purchase}</td> */}
                              {/* <td key={`actions-${estimate.estimateId}`} className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-6">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      alert('You have elected to archive this estimate.')
                                    }}
                                    className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                    Archive
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      alert('You have elected to dowload this estimate.')
                                    }}
                                    className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                    Download
                                  </button>
                                </div>
                              </td> */}
                            </React.Fragment>
                          ))}
                        </tr>

                      )) : <tr>

                        <td className="text-center p-6" colSpan={6}>
                          <div><h2 className="text-lg">There are currently no estimates</h2></div></td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>

              <span>
                previous
              </span>
            </a>

            <div className="items-center hidden md:flex gap-x-3">
              <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
              <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
              <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
              <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
              <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
              <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
              <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
            </div>

            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
              <span>
                Next
              </span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </section >
      }
    </>
  )
}
