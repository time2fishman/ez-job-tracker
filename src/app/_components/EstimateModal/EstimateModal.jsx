import "./EstimateModal.css";

function EstimateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-container text-black">
      <div className="mt-4 flex">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
          className="h-16 w-auto"
        />
        <h1 className="text-4xl grow text-right content-center">ESTIMATE</h1>
      </div>
      <div>
        <h2 className="text-2xl text-gray-600 mt-4 mb-2">Demo Company</h2>
        <p className="text-gray-500 py-1">1234 Fake Street</p>
        <p className="text-gray-500 mb-10">Somewhere, MI 12345</p>
      </div>
      <div className="flex">
        <div>
          <h3 className="text-lg mb-2">Bill To:</h3>
          <p className="text-gray-500 py-1">John Doe</p>
          <p className="text-gray-500 py-1">35 Wicked Rd</p>
          <p className="text-gray-500 pt-1">Rancho, MI 12344</p>
        </div>
        <div className="flex grow justify-center mb-20">
          <div>
            <p className="py-1">Estimate#</p>
            <p className="py-1">Invoice Date </p>
            <p className="pt-1">Due Date</p>
          </div>
          <div>
            <p className="text-gray-500 pl-5 py-1">9027348</p>
            <p className="text-gray-500 pl-5 py-1">9027348</p>
            <p className="text-gray-500 pl-5 pt-1">9027348</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <table className="w-11/12 mb-10 border border-black">
          <thead>
            <tr className="bg-gray-600 text-gray-300 text-left border border-black">
              <th className="p-2">Item Description</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Rate</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-black">
              <td className="p-2">Labor</td>
              <td className="p-2">7</td>
              <td className="p-2">50.00</td>
              <td className="p-2">350</td>
            </tr>
            <tr className="border border-black">
              <td className="p-2">Materials</td>
              <td className="p-2">N/A</td>
              <td className="p-2">N/A</td>
              <td className="p-2">650</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-6"></td>
              <td className="pt-6"></td>
              <td className="pt-6">Sub Total</td>
              <td className="pt-6">1000.00</td>
            </tr>
            <tr>
              <td className="pt-1"></td>
              <td className="pt-1"></td>
              <td className="pt-1">Sales Tax</td>
              <td className="pt-1">100.00</td>
            </tr>
            <tr>
              <td className="pt-4"></td>
              <td className="pt-4"></td>
              <td className="pt-4 bg-gray-400 text-lg">Total</td>
              <td className="pt-4 bg-gray-400">$ 1100.00</td>
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
