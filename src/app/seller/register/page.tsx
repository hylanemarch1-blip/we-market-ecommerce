export default function SellerRegister() {
  const steps = [
    {
      title: "Business Profile & GSTIN",
      description: "Enter your domestic business details and tax identification number",
    },
    {
      title: "Global Expansion",
      description: "Set up currency preferences and international shipping options",
    },
    {
      title: "Product Import & Catalog",
      description: "Import your product catalog and integrate with our marketplace",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">Vendor Onboarding</h1>

          <div className="flex justify-between mb-8 text-sm text-gray-500">
            <div className="relative">Step 1: Business Profile</div>
            <div className="w-px bg-gray-200"></div>
            <div className="relative">Step 2: Global Expansion</div>
            <div className="w-px bg-gray-200"></div>
            <div className="relative">Step 3: Product Catalog</div>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-500">{step.description}</p>
                <button
                  className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}