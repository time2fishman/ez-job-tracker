import "./EstimateModal.css";

function EstimateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content text-black">
        <h2 className="text-xl">Estimate# 3066</h2>
        <p>Date: Jan 6, 2022</p>
        <p>Status: Paid</p>
        <p>Customer: Arthur Melo</p>
        <p>Purchase: Monthly Subscription</p>
        <button
          onClick={onClose}
          className="border bg-indigo-700 rounded px-3.5 py-1 mt-5 flex justify-self-end text-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EstimateModal;
