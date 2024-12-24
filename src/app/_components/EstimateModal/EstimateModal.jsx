import "./EstimateModal.css";
import data from "@/app/data/client-data.json";
import estimateData from "@/app/data/estimates.json";

function EstimateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-container text-black">
      <div className="flex">
        <img
          alt="Demo Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
          className="h-16 w-auto"
        />
        <h1 className="text-3xl grow text-right content-center">ESTIMATE</h1>
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
            {data[0].firstName} {data[0].lastName}
          </p>
          <p className="text-gray-500 py-1">{data[0].address}</p>
          <p className="text-gray-500 pt-1">
            {data[0].city}, {data[0].state} {data[0].zip}
          </p>
        </div>
        <div className="flex grow justify-center mb-20">
          <div>
            <p className="py-1">Estimate#</p>
            <p className="py-1">Estimate Date </p>
            <p className="pt-1">Due Date</p>
          </div>
          <div>
            <p className="text-gray-500 pl-5 py-1">
              {estimateData[0].estimateId}
            </p>
            <p className="text-gray-500 pl-5 py-1">
              {estimateData[0].estimateDate}
            </p>
            <p className="text-gray-500 pl-5 pt-1">{estimateData[0].dueDate}</p>
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
      <button
        onClick={onClose}
        className="border bg-indigo-700 rounded px-3.5 py-1 mt-5 flex justify-self-end text-gray-300 mb-4"
      >
        Close
      </button>
    </div>
  );
}

export default EstimateModal;
