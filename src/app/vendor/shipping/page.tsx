export default function Shipping() {
  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">Shipping Management</h1>

          {/* Domestic Shipping */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Domestic Shipping</h3>
              <p className="text-sm text-gray-500">
                Configure domestic shipping rates and zones
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Zone 1: $5.99 (3-5 business days)</li>
                <li>Zone 2: $8.99 (3-5 business days)</li>
                <li>Zone 3: $12.99 (5-7 business days)</li>
                <li>Zone 4: $19.99 (7-10 business days)</li>
              </ul>
              <a href="#"
                className="mt-3 text-emerald-600 hover underline text-sm"
              >
                Update Rates
              </a>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-3">International Shipping</h3>
              <p className="text-sm text-gray-500">
                Set up international shipping rates by country
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Europe: $15.99 (5-7 business days)</li>
                <li>Asia: $12.99 (4-6 business days)</li>
                <li>North America: $14.99 (3-5 business days)</li>
                <li>Middle East: $20.99 (7-10 business days)</li>
              </ul>
              <a href="#"
                className="mt-3 text-emerald-600 hover underline text-sm"
              >
                Update Rates
              </a>
            </div>
          </div>

          {/* Tracking Update */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Update Tracking</h3>
            <p className="text-sm text-gray-500">
              Enter tracking numbers for orders
              </p>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Tracking number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-2"
              />
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select carrier</option>
                <option value="fedex">FedEx</option>
                <option value="ups">UPS</option>
                <option value="dhl">DHL</option>
                <option value="usps">USPS</option>
              </select>
              <button
                className="mt-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
              >
                Update Tracking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}