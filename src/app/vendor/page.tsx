export default function VendorLanding() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* CTA Column */}
          <div>
            <h1 className="text-5xl font-bold text-emerald-600 tracking-tight">
              Sell on WE-Market
            </h1>
            <p className="text-gray-600 text-lg mt-4">
              Start your own online store and reach customers across 200+ countries.
            </p>
            <div className="mt-8 space-y-4">
              <a href="/seller/register"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Start Selling
              </a>
              <a href="/seller/login"
                className="border border-emerald-600 text-emerald-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-50 transition-colors"
              >
                Already a vendor? Sign In
              </a>
            </div>
          </div>

          {/* Feature Grids Column */}
          <div>
            <h2 className="text-2xl font-bold text-emerald-600 mb-6">Why Sell With Us</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-flex flex items-center justify-center shrink-0 flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2Lsq-5.007 3.305 7.503 12.331L12 22l-8-3 8-3.006L12 2ZM2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Zm18-4a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-emerald-600">Global Reach</h3>
                  <p className="text-sm text-gray-500">Sell in 200+ countries and territories worldwide.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-flex flex items-center justify-center shrink-0 flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2Lsq-5.007 3.305 7.503 12.331L12 22l-8-3 8-3.006L12 2ZM2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Zm18-4a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-emerald-600">B2B & B2C</h3>
                  <p className="text-sm text-gray-500">Support both business and consumer sales channels.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-flex flex items-center justify-center shrink-0 flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2Lsq-5.007 3.305 7.503 12.331L12 22l-8-3 8-3.006L12 2ZM2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Zm18-4a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-emerald-600">Multi-Vendor</h3>
                  <p className="text-sm text-gray-500">Host multiple sellers under one marketplace.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-flex flex items-center justify-center shrink-0 flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2Lsq-5.007 3.305 7.503 12.331L12 22l-8-3 8-3.006L12 2ZM2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Zm18-4a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-emerald-600">Trusted Platform</h3>
                  <p className="text-sm text-gray-500">Built for enterprise-grade reliability and scale.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}