export default function ProductListing() {
  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Product Catalog</h1>
            <a href="/vendor/products/new"
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Add Product
            </a>
          </div>

          {/* Bulk Import Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <h3 className="font-medium text-emerald-600 mb-2">Bulk Import</h3>
              <p className="text-sm text-emerald-600">
                Download CSV template and upload products in bulk
              </p>
              <a href="#"
                className="text-emerald-600 hover underline text-sm mt-2 block"
              >
                Download Template
              </a>
              <input
                type="file"
                className="mt-2 w-full px-3 py-2 border border-emerald-300 rounded-md"
              />
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <h3 className="font-medium text-emerald-600 mb-2">Quick Add</h3>
              <p className="text-sm text-emerald-600">
                Add product manually
              </p>
              <a href="/vendor/products/new"
                className="text-emerald-600 hover underline text-sm mt-2 block"
              >
                Add New Product
              </a>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">SKU12345</td>
                  <td className="px-6 py-4">Ergonomic Office Chair</td>
                  <td className="px-6 py-4">Office Furniture</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold">$199.99</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-600 rounded">NEW</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-600 rounded">PUBLISHED</span>
                  </td>
                  <td className="px-6 py-4">
                    <a href="#"
                      className="text-emerald-600 hover underline text-xs"
                    >
                      Edit
                    </a>
                    <a href="#"
                      className="text-red-600 hover underline text-xs ml-2"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">SKU12346</td>
                  <td className="px-6 py-4">Smart Watch Pro</td>
                  <td className="px-6 py-4">Electronics</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold">$299.99</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-600 rounded">NEW</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-600 rounded">PUBLISHED</span>
                  </td>
                  <td className="px-6 py-4">
                    <a href="#"
                      className="text-emerald-600 hover underline text-xs"
                    >
                      Edit
                    </a>
                    <a href="#"
                      className="text-red-600 hover underline text-xs ml-2"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-end items-center">
            <p className="text-sm text-gray-500">Showing 1 to 10 of 245 products</p>
            <div className="flex gap-2 mt-2">
              <button className="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Prev</button>
              <button className="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">1</button>
              <button className="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">2</button>
              <button className="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">3</button>
              <button className="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}