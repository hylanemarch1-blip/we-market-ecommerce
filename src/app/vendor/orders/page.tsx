export default function Orders() {
  const orders = [
    {
      id: "#1027",
      date: "2024-01-15",
      customer: "John Doe",
      items: " ergonomic office chair × 1",
      total: "$199.99",
      status: "DELIVERED",
    },
    {
      id: "#1026",
      date: "2024-01-12",
      customer: "Jane Smith",
      items: " smart watch pro × 1",
      total: "$299.99",
      status: "SHIPPED",
    },
    {
      id: "#1025",
      date: "2024-01-10",
      customer: "Bob Wilson",
      items: " standing desk × 1",
      total: "$399.99",
      status: "PROCESSING",
    },
    {
      id: "#1024",
      date: "2024-01-08",
      customer: "Alice Brown",
      items: " wireless headphones × 1",
      total: "$79.99",
      status: "PENDING",
    },
  ];

  const statuses = [
    { key: "PENDING", label: "Pending", color: "yellow" },
    { key: "CONFIRMED", label: "Confirmed", color: "blue" },
    { key: "PROCESSING", label: "Processing", color: "emerald" },
    { key: "PACKED", label: "Packed", color: "purple" },
    { key: "SHIPPED", label: "Shipped", color: "green" },
    { key: "DELIVERED", label: "Delivered", color: "teal" },
    { key: "CANCELLED", label: "Cancelled", color: "red" },
    { key: "RETURN_REQUESTED", label: "Return Requested", color: "orange" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">Orders</h1>

          {/* Status Filter */}
          <div className="flex gap-2 mb-6">
            {statuses.map((status) => (
              <button
                key={status.key}
                className={`px-3 py-1.5 text-xs font-medium rounded ${
                  status.color === "green"
                    ? "bg-green-100 text-green-600"
                  : status.color === "red"
                    ? "bg-red-100 text-red-600"
                  : status.color === "emerald"
                    ? "bg-emerald-100 text-emerald-600"
                  : status.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                  : status.color === "orange"
                    ? "bg-orange-100 text-orange-600"
                  : status.color === "purple"
                    ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
                } hover:bg-${
                  status.color === "green"
                    ? "green-200"
                  : status.color === "red"
                    ? "red-200"
                  : status.color === "emerald"
                    ? "emerald-200"
                  : status.color === "blue"
                    ? "blue-200"
                  : status.color === "orange"
                    ? "orange-200"
                  : status.color === "purple"
                    ? "purple-200"
                  : "gray-200"
                } transition-colors`}
              >
                {status.label}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.items}</td>
                    <td className="px-6 py-4">{order.total}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          order.status === "DELIVERED"
                            ? "bg-teal-100 text-teal-600"
                          : order.status === "SHIPPED"
                            ? "bg-green-100 text-green-600"
                          : order.status === "PROCESSING"
                            ? "bg-emerald-100 text-emerald-600"
                          : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-600"
                          : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-600"
                          : order.status === "RETURN_REQUESTED"
                            ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a href="#"
                        className="text-emerald-600 hover underline text-xs"
                      >
                        View
                      </a>
                      <a href="#"
                        className="text-red-600 hover underline text-xs ml-2"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-end items-center">
            <p className="text-sm text-gray-500">Showing 1 to 4 of 8 orders</p>
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