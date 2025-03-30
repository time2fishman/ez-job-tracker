import "./EstimateModal.css";
import jsPDF from "jspdf";
import data from "@/app/data/client-data.json";
import estimateData from "@/app/data/estimates.json";
import Logo from "../../../../../public/Adam_logo.png";
import Image from "next/image";
import html2canvas from "html2canvas";
import React, { useRef } from "react";
import formatDate from "../../../../utils/dateUtils";

function EstimateModal({ isOpen, onClose, estimate }) {
  if (!isOpen || !estimate) return null;

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("estimate.pdf");
    });
  };

  return (
    <div ref={pdfRef} className="modal-container text-black">
      <div className="grid grid-cols-3 mx-8 mt-8 mb-4">
        <Image
          alt="Demo Company"
          src={Logo}
          className="h-24 w-auto col-start-1"
        />
        <h1 className="text-3xl col-start-3 content-center text-right">
          ESTIMATE
        </h1>
      </div>
      <div>
        <h2 className="text-2xl text-gray-700 mt-4 mb-2">Demo Company</h2>
        <p className="text-gray-500 py-1">1234 Fake Street</p>
        <p className="text-gray-500 mb-10">Somewhere, MI 12345</p>
      </div>
      <div className="flex">
        <div>
          <h3>Bill To:</h3>
          <p className="text-gray-500 py-1">
            {estimate.firstName} {estimate.lastName}
          </p>
          <p className="text-gray-500 py-1">{estimate.address}</p>
          <p className="text-gray-500 pt-1">
            {estimate.city}, {estimate.state} {estimate.zip}
          </p>
          <p className="text-gray-500 pt-1">{estimate.phone}</p>
          <p className="text-gray-500 pt-1 pb-5">{estimate.email}</p>
        </div>
        <div className="flex grow justify-center mb-20">
          <div>
            <p className="py-1">Estimate#</p>
            <p className="py-1">Estimate Date </p>
          </div>
          <div>
            <p className="text-gray-500 pl-5 py-1">{estimate.estimateId}</p>
            <p className="text-gray-500 pl-5 py-1">
              {estimate.date ? formatDate(estimate.date) : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
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
              <td className="p-2">{estimateData[0].itemDescription1}</td>
              <td className="p-2 border-l border-gray-400 text-right">
                {estimateData[0].qty1}
              </td>
              <td className="p-2 border-l border-gray-400 text-right">
                {estimateData[0].rate1}
              </td>
              <td className="p-2 border-l border-gray-400 text-right">
                {estimateData[0].amount1}
              </td>
            </tr>
            <tr className="border border-gray-400">
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
            </tr>
          </tbody>
          <tfoot>
            {/* <tr>
              <td className="pt-6"></td>
              <td className="pt-6"></td>
              <td className="pt-6">Sub Total</td>
              <td className="pt-6">1000.00</td>
            </tr> */}
            {/* <tr>
              <td className="pt-1"></td>
              <td className="pt-1"></td>
              <td className="pt-1">Sales Tax</td>
              <td className="pt-1">100.00</td>
            </tr> */}
            <tr>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="text-lg pt-6 pb-2 px-2">Total</td>
              <td className="pt-6 pb-2 px-2 text-right">
                {estimateData[0].total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex justify-evenly">
        <button
          className="border bg-indigo-700 rounded py-2 px-4 mt-5 text-gray-300 mb-4"
          onClick={downloadPDF}
        >
          Dowload PDF
        </button>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="border bg-indigo-700 rounded py-2 px-4 mt-5 text-gray-300 mb-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EstimateModal;
