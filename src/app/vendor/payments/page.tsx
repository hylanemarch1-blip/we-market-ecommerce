export default function Payments() {
  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">Payment Configuration</h1>

          {/* Settlement Account */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Settlement Account</h3>
              <p className="text-sm text-gray-500">
                Configure your payout account details
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Account Name:</p>
                <p className="font-medium text-gray-600">WE Market Vendor</p>
                <p className="text-xs text-gray-500">Account Number:</p>
                <p className="font-medium text-gray-600">*****1234</p>
                <p className="text-xs text-gray-500">Bank:</p>
                <p className="font-medium text-gray-600">Global Bank Ltd.</p>
                <p className="text-xs text-gray-500">IFSC/Routing:</p>
                <p className="font-medium text-gray-600">ABC0000123</p>
              </div>
              <a href="#"
                className="mt-3 text-emerald-600 hover underline text-sm"
              >
                Update Details
              </a>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Payment Methods</h3>
              <p className="text-sm text-gray-500">
                Enable payment methods for customer checkout
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked
                    className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span>UPI</span>
                </label>
                <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked
                    className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span>Credit Card</span>
                </label>
                <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked
                    className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span>Debit Card</span>
                </label>
                <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked
                    className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span>Net Banking</span>
                </label>
              </div>
            </div>
          </div>

          {/* Settlement Schedule */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Settlement Schedule</h3>
            <p className="text-sm text-gray-500">
              Choose how often you receive payouts
            </p>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <label className="flex flex-col items-center gap-2 px-4 py-2 border rounded-md hover:bg-emerald-50 transition-colors">
                <span>Daily</span>
                <p className="text-xs">Next payout: Tomorrow</p>
              </label>
              <label className="flex flex-col items-center gap-2 px-4 py-2 border rounded-md hover:bg-emerald-50 transition-colors">
                <span>Weekly</span>
                <p className="text-xs">Next payout: In 3 days</p>
              </label>
              <label className="flex flex-col items-center gap-2 px-4 py-2 border rounded-md hover:bg-emerald-50 transition-colors">
                <span>Bi-Weekly</span>
                <p className="text-xs">Next payout: In 7 days</p>
              </label>
            </div>
          </div>

          {/* Available Balance */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3">Available Balance</h3>
            <p className="text-3xl font-bold text-emerald-600">$12,450.00</p>
            <p className="text-sm text-gray-500">Available for payout</p>
            <button
              className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Request Payout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}