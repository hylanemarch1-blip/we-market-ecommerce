'use client';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  vendor: string;
  image: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Wireless Noise-Canceling Headphones', price: 199.99, category: 'Electronics', vendor: 'TechWorld', image: '/assets/imgs/product-1.png' },
  { id: '2', name: 'Ergonomic Leather Office Chair', price: 289.50, category: 'Furniture', vendor: 'HomeComfort', image: '/assets/imgs/product-2.png' },
  { id: '3', name: 'Smart Fitness Watch Series 5', price: 149.00, category: 'Electronics', vendor: 'FitPulse', image: '/assets/imgs/product-3.png' },
  { id: '4', name: 'Organic Cold-Pressed Coffee Beans', price: 24.99, category: 'Groceries', vendor: 'RoastMasters', image: '/assets/imgs/product-4.png' },
];

export default function ProductGrid() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        <span className="text-sm font-medium text-emerald-600 hover:underline cursor-pointer">View All ?</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SAMPLE_PRODUCTS.map((product) => (
          <div key={product.id} className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 font-medium">
              [Product Image]
            </div>
            <div>
              <span className="text-xs text-emerald-600 font-semibold uppercase">{product.vendor}</span>
              <h3 className="font-semibold text-gray-800 mt-1 line-clamp-1">{product.name}</h3>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <button className="bg-emerald-600 text-white text-xs px-3 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
