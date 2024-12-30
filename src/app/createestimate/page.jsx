export default function CreateEstimatePage() {
  return (
    <div className="bg-white h-screen w-screen text-black">
      <h1 className="text-center text-4xl pt-10 pb-10">Create New Estimate</h1>
      <form action={""} method="post">
        <fieldset className="border">
          <legend>Customer information:</legend>
          <label htmlFor="fname">First Name: </label>
          <input type="text" id="fname" name="fname" className="border" />
          <br />
          <label htmlFor="lname">Last Name: </label>
          <input type="text" id="lname" name="lname" className="border" />
          <br />
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" className="border" />
          <br />
          <label htmlFor="address">Address: </label>
          <input type="text" id="address" name="address" className="border" />
          <br />
          <label htmlFor="city">City: </label>
          <input type="text" id="city" name="city" className="border" />
          <br />
          <label htmlFor="state">State: </label>
          <input type="text" id="state" name="state" className="border" />
          <br />
          <label htmlFor="zip">Zip: </label>
          <input type="text" id="zip" name="zip" className="border" />
        </fieldset>
        <fieldset className="border">
          <legend>Job Details:</legend>
          <table className="mb-10 border border-gray-400">
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
                    className="border"
                  />
                </td>
                <td className="p-2 border-l border-gray-400 text-right">
                  <input type="text" id="qty" name="qty" className="border" />
                </td>
                <td className="p-2 border-l border-gray-400 text-right">
                  <input type="text" id="rate" name="rate" className="border" />
                </td>
                <td className="p-2 border-l border-gray-400 text-right">
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    className="border"
                  />
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
                <td className="text-lg pt-6 pb-2 px-2">Total</td>
                <td className="pt-6 pb-2 px-2 text-right">
                  <input
                    type="text"
                    id="total"
                    name="total"
                    className="border"
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </fieldset>
      </form>
    </div>
  );
}
