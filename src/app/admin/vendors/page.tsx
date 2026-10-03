export default function AdminVendors() {
  const vendors = [
    {
      id: "1",
      name: "TechCorp Electronics",
      status: "pending",
      documentStatus: "pending",
      rating: 4.5,
      products: 124,
      sales: "$45,230",
      joined: "2024-01-15",
    },
    {
      id: "2",
      name: "Fashion Empire",
      status: "approved",
      documentStatus: "verified",
      rating: 4.8,
      products: 89,
      sales: "$28,150",
      joined: "2023-11-30",
    },
    {
      id: "3",
      name: "Home Essentials Ltd.",
      status: "suspended",
      documentStatus: "pending",
      rating: 3.9,
      products: 45,
      sales: "$12,800",
      joined: "2024-02-10",
    },
    {
      id: "4",
      name: "Global Gear Co.",
      status: "approved",
      documentStatus: "verified",
      rating: 4.6,
      products: 203,
      sales: "$67,340",
      joined: "2023-10-15",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">Vendor Management</h1>

          {/* Bulk Actions */}
          <div className="flex gap-2 mb-4">
            <select className="bg-gray-50 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-border-transparent">
              <option value="all">All Vendors</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="suspended">Suspended</option>
            </select>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium">
              Bulk Action
            </button>
          </div>

          {/* Vendors Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-flex flex items-center justify-center shrink-0 flex-shrink-0">
                          <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2Lsq-5.007 3.305 7.503 12.331L12 22l-8-3 8-3.006L12 2ZM2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Zm18-4a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-xs text-gray-500">{vendor.joined}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          vendor.status === "approved"
                            ? "bg-green-100 text-green-600"
                          : vendor.status === "suspended"
                            ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          vendor.documentStatus === "verified"
                            ? "bg-green-100 text-green-600"
                          : vendor.documentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {vendor.documentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-emerald-600 font-medium">{vendor.rating}</p>
                      <p className="text-xs text-gray-400">out of 5</p>
                    </td>
                    <td className="px-6 py-4">{vendor.products}</td>
                    <td className="px-6 py-4">${vendor.sales}</td>
                    <td className="px-6 py-4">{vendor.joined}</td>
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
                        <button
                          className="px-2 py-1 text-xs border border-orange-300 rounded-md hover:bg-orange-50 text-orange-600 transition-colors"
                        >
                          Suspend
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