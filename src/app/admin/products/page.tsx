export default function AdminProducts() {
  const products = [
    {
      id: "1",
      name: "Ergonomic Office Chair",
      vendor: "TechCorp Electronics",
      category: "Office Furniture",
      price: "$199.99",
      status: "pending",
    },
    {
      id: "2",
      name: "Smart Watch Pro",
      vendor: "TechCorp Electronics",
      category: "Electronics",
      price: "$299.99",
      status: "approved",
    },
    {
      id: "3",
      name: "Wireless Headphones",
      vendor: "Fashion Empire",
      category: "Audio",
      price: "$79.99",
      status: "pending",
    },
    {
      id: "4",
      name: "Standing Desk",
      vendor: "Home Essentials Ltd.",
      category: "Office Furniture",
      price: "$399.99",
      status: "rejected",
    },
    {
      id: "5",
      name: "Wireless Router",
      vendor: "Global Gear Co.",
      category: "Electronics",
      price: "$89.99",
      status: "approved",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">Product Approval Queue</h1>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-2xl font-bold text-emerald-600">3</p>
              <p className="text-sm text-gray-500">Pending Approval</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">2</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">1</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-flex flex items-center justify-center shrink-0 flex-shrink-0">
                          <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2Lsq-5.007 3.305 7.503 12.331L12 22l-8-3 8-3.006L12 2ZM2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Zm18-4a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.vendor}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          product.status === "approved"
                            ? "bg-green-100 text-green-600"
                          : product.status === "rejected"
                            ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 text-xs border border-emerald-300 rounded-md hover:bg-emerald-50 text-emerald-600 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          className="px-2 py-1 text-xs border border-red-300 rounded-md hover:bg-red-50 text-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}