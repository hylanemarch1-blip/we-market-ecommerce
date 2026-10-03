"use client";

import { useState } from "react";

interface Step1Fields {
  fullName: string;
  businessEmail: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface Step2Fields {
  businessName: string;
  gstin: string;
  pan: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Step3Fields {
  registrationCertificate: File | null;
  gstDocument: File | null;
  idProof: File | null;
}

interface Step4Fields {
  storeName: string;
  storeDescription?: string;
  storeLogo?: File | null;
  storeBanner?: File | null;
}

interface Step5Fields {
  markets: string[];
  b2b: boolean;
  b2c: boolean;
  minOrderQuantity: number;
}

interface Step6Fields {
  primaryCurrency: string;
  paymentMethods: string[];
  payoutAccount: string;
}

interface Step7Fields {
  domesticShipping: string;
  internationalShipping: string;
  shippingCountries: string;
  handlingTime: number;
}

interface Step8Fields {
  productName: string;
  sku: string;
  category: string;
  price: number;
}

const STEP_COUNT = 10;

export default function SellerRegister() {
  // Step 1: Account Creation state
  const [step1, setStep1] = useState<Step1Fields>({
    fullName: "",
    businessEmail: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [step, setStep] = useState(1);

  const handleStep1Change = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setStep1({
      ...step1,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    if (step < STEP_COUNT) setStep(step + 1);
  };
  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  // Step content renderers
  const renderStep1 = () => (
    <div>
      <h2 className="text-xl font-medium text-gray-700 mb-4">
        Step 1: Account Creation
      </h2>
      <p className="text-gray-500 mb-6">
        Create your vendor account
      </p>
      <form className="space-y-4">
        <div className="rounded-lg border p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={step1.fullName}
            onChange={handleStep1Change}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="rounded-lg border p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Email
          </label>
          <input
            type="email"
            name="businessEmail"
            value={step1.businessEmail}
            onChange={handleStep1Change}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="john@business.com"
            required
          />
        </div>
        <div className="rounded-lg border p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={step1.mobileNumber}
            onChange={handleStep1Change}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="+91 98765 12345"
            required
          />
        </div>
        <div className="rounded-lg border p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={step1.password}
            onChange={handleStep1Change}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="rounded-lg border p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={step1.confirmPassword}
            onChange={handleStep1Change}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="rounded-lg border p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            I agree to the Terms & Conditions
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              checked={step1.terms}
              onChange={(e) => handleStep1Change(e)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500"
            />
            <span className="text-sm text-gray-600">I agree to the Terms & Conditions</span>
          </div>
        </div>
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-white text-emerald-600 px-4 py-2 rounded-md border border-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            disabled={step === STEP_COUNT}
          >
            {step === STEP_COUNT ? "Complete" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );

  // Render other steps minimally for now
  const renderOtherSteps = () => {
    if (step === STEP_COUNT) {
      return (
        <div>
          <h2 className="text-xl font-medium text-gray-700 mb-4">Step 10: Go Live</h2>
          <p className="text-gray-500 mb-6">
            Onboarding Complete!
          </p>
          <div className="bg-emerald-50 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-emerald-600 mb-4">Welcome to WE-Market!</h3>
            <p className="text-gray-600 mb-6">
              Your vendor application has been submitted successfully. Our team will review
              your documentation and get back to you within 3-5 business days.
            </p>
            <button
              className="bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-12">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">
            Vendor Onboarding
          </h1>

          {/* Step Progress */}
          <div className="flex justify-between mb-8 text-sm text-gray-500">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <div
                key={num}
                className={`relative ${
                  step === num ? "text-emerald-600 font-medium" : "text-gray-300"
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="space-y-6">{renderStep1()}{renderOtherSteps()}</div>
        </div>
      </div>
    </section>
  );
}