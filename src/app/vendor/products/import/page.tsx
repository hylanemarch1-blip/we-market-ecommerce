export default function ProductImport() {
  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">Bulk Product Import</h1>

          {/* CSV Template */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">CSV Template</h3>
              <p className="text-sm text-gray-500">
                Download the CSV template to format your product data correctly.
              </p>
              <a href="#"
                className="bg-emerald-50 text-emerald-600 text-sm rounded px-3 py-1.5 hover:bg-emerald-100 transition-colors"
              >
                Download Template (CSV)
              </a>
              <input
                type="file"
                accept=".csv"
                className="mt-3 w-full px-3 py-2 border border-emerald-300 rounded-md"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Supported Fields</h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>product_name</li>
                <li>sku</li>
                <li>barcode</li>
                <li>condition (NEW, REFURBISHED, USED)</li>
                <li>category_id</li>
                <li>price</li>
                <li>b2b_price_1_9</li>
                <li>b2b_price_10_49</li>
                <li>b2b_price_50_99</li>
                <li>b2b_price_100_plus</li>
                <li>hsn_code</li>
                <li>country_of_origin</li>
                <li>warranty_period</li>
                <li>return_policy</li>
              </ul>
            </div>
          </div>

          {/* CSV Uploader */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Upload CSV File</h3>
              <p className="text-sm text-gray-500">
                Select your CSV file to import products
              </p>
              <input
                type="file"
                accept=".csv"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                className="mt-3 w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
              >
                Import File
              </button>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Import Results</h3>
              <p className="text-sm text-gray-500">Rows processed: 0 / 0</p>
              <div className="h-24 border border-gray-200 rounded-md overflow-y-auto bg-gray-50">
                {/* Validation results would appear here */}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                0 errors, 0 warnings
              </p>
            </div>
          </div>

          {/* Validation Summary */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3">Validation Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-emerald-600">0</p>
                <p className="text-sm text-gray-500">Valid Rows</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">0</p>
                <p className="text-sm text-gray-500">Invalid Rows</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">0</p>
                <p className="text-sm text-gray-500">Warnings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}