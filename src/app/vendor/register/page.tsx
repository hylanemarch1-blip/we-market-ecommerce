"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileSignature,
  FileText,
  ShieldCheck,
  Store,
  Upload,
} from "lucide-react";

const STEPS = [
  { key: "business", label: "Business Info", icon: Building2 },
  { key: "compliance", label: "Certifications & Compliance", icon: ShieldCheck },
  { key: "catalog", label: "Catalog Specs", icon: ClipboardList },
  { key: "agreement", label: "Agreement", icon: FileSignature },
] as const;

const VENDOR_TYPES = ["Manufacturer", "Wholesaler", "Retailer", "Exporter"] as const;

const CATEGORIES = [
  "Grocery & Gourmet Food",
  "Fashion & Apparel",
  "Electronics & Tech",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Appliances",
  "Sports & Outdoors",
  "Books & Stationery",
  "Toys & Kids",
  "Auto & Accessories",
];

interface FileFields {
  gstCertificate: File | null;
  businessLicense: File | null;
  complianceDeclaration: File | null;
  catalogFile: File | null;
  priceList: File | null;
}

interface BusinessFields {
  legalBusinessName: string;
  contactName: string;
  email: string;
  phone: string;
  vendorType: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
}

interface CatalogFields {
  categories: string[];
  monthlyOrders: string;
  leadTime: string;
  description: string;
  returnPolicy: string;
}

interface AgreementFields {
  sellerTerms: boolean;
  ipWarranty: boolean;
  payoutTerms: boolean;
}

const FILE_HINTS: Record<keyof FileFields, { label: string; hint: string; accept: string }> = {
  gstCertificate: {
    label: "GST Certificate",
    hint: "PDF or PNG, max 5 MB",
    accept: ".pdf,.png",
  },
  businessLicense: {
    label: "Business License / Registration",
    hint: "PDF or PNG, max 5 MB",
    accept: ".pdf,.png",
  },
  complianceDeclaration: {
    label: "Compliance Declaration",
    hint: "Signed PDF or PNG, max 5 MB",
    accept: ".pdf,.png",
  },
  catalogFile: {
    label: "Product Catalog",
    hint: "CSV export of your catalog (SKU, name, price, stock)",
    accept: ".csv,.pdf,.png",
  },
  priceList: {
    label: "Wholesale Price List",
    hint: "PDF or CSV",
    accept: ".pdf,.csv",
  },
};

const emptyBusiness: BusinessFields = {
  legalBusinessName: "",
  contactName: "",
  email: "",
  phone: "",
  vendorType: "Manufacturer",
  addressLine1: "",
  city: "",
  state: "",
  postalCode: "",
};

const emptyCatalog: CatalogFields = {
  categories: [],
  monthlyOrders: "",
  leadTime: "",
  description: "",
  returnPolicy: "",
};

const emptyAgreement: AgreementFields = {
  sellerTerms: false,
  ipWarranty: false,
  payoutTerms: false,
};

export default function VendorRegisterPage() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState<BusinessFields>(emptyBusiness);
  const [files, setFiles] = useState<FileFields>({
    gstCertificate: null,
    businessLicense: null,
    complianceDeclaration: null,
    catalogFile: null,
    priceList: null,
  });
  const [catalog, setCatalog] = useState<CatalogFields>(emptyCatalog);
  const [agreement, setAgreement] = useState<AgreementFields>(emptyAgreement);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const setBusinessField = (key: keyof BusinessFields, value: string) => {
    setBusiness((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFile =
    (key: keyof FileFields) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      setFiles((prev) => ({ ...prev, [key]: file }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    };

  const toggleCategory = (category: string) => {
    setCatalog((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((entry) => entry !== category)
        : [...prev.categories, category],
    }));
    setErrors((prev) => ({ ...prev, categories: "" }));
  };

  const validateStep = (index: number): boolean => {
    const next: Record<string, string> = {};

    if (index === 0) {
      if (!business.legalBusinessName.trim())
        next.legalBusinessName = "Legal business name is required";
      if (!business.contactName.trim())
        next.contactName = "Contact person is required";
      if (!business.email.trim()) next.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email.trim()))
        next.email = "Enter a valid email address";
      if (!business.phone.trim()) next.phone = "Phone number is required";
      if (!business.addressLine1.trim())
        next.addressLine1 = "Business address is required";
      if (!business.city.trim()) next.city = "City is required";
      if (!business.state.trim()) next.state = "State is required";
      if (!business.postalCode.trim()) next.postalCode = "Postal code is required";
    }

    if (index === 1) {
      if (!files.gstCertificate)
        next.gstCertificate = "GST certificate is required";
      if (!files.businessLicense)
        next.businessLicense = "Business license is required";
      if (!files.complianceDeclaration)
        next.complianceDeclaration = "Compliance declaration is required";
    }

    if (index === 2) {
      if (catalog.categories.length === 0)
        next.categories = "Select at least one category";
      if (!files.catalogFile) next.catalogFile = "Product catalog is required";
      if (!catalog.description.trim())
        next.description = "Describe your catalog / product focus";
      if (!catalog.leadTime.trim())
        next.leadTime = "Typical fulfilment lead time is required";
    }

    if (index === 3) {
      if (!agreement.sellerTerms)
        next.sellerTerms = "You must accept the seller terms";
      if (!agreement.ipWarranty)
        next.ipWarranty = "You must warrant you own or license your IP";
      if (!agreement.payoutTerms)
        next.payoutTerms = "You must accept the payout terms";
    }

    setErrors(next);
    return Object.values(next).every((value) => !value);
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    if (step > 0) {
      setErrors({});
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(3) || submitting) return;
    setSubmitting(true);
    // Mock onboarding submission — application reference is generated locally.
    window.setTimeout(() => {
      const reference = `VR-${Date.now().toString(36).toUpperCase()}`;
      setSubmitted(reference);
      setSubmitting(false);
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-[60vh] py-16">
        <div ref={summaryRef} className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-10">
            <CheckCircle2 size={52} className="mx-auto text-emerald-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Application submitted
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              Thanks, {business.contactName || "seller"}! Our marketplace team
              will review <span className="font-semibold text-gray-700">
                {business.legalBusinessName}
              </span>{" "}
              within 2–3 business days and email {business.email}.
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Application reference:{" "}
              <span className="font-mono font-bold text-gray-600">
                {submitted}
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Continue shopping <ArrowRight size={16} />
              </Link>
              <Link
                href="/vendor"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Vendor portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = (key: string) =>
    `w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white ${
      errors[key] ? "border-red-400" : "border-gray-300"
    }`;

  const fieldError = (key: string) =>
    errors[key] ? (
      <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
    ) : null;

  const fileRow = (key: keyof FileFields) => {
    const meta = FILE_HINTS[key];
    const file = files[key];
    return (
      <div key={key} className="border border-dashed border-gray-300 rounded-lg p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800">
              {meta.label}
              <span className="text-red-500 ml-1">*</span>
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{meta.hint}</p>
            {file && (
              <p className="text-xs text-emerald-600 font-medium mt-1 truncate">
                <FileText size={12} className="inline -mt-0.5 mr-1" />
                {file.name} ({Math.max(1, Math.round(file.size / 1024))} KB)
              </p>
            )}
          </div>
          <label className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-md cursor-pointer transition-colors">
            <Upload size={13} />
            {file ? "Replace" : "Upload"}
            <input
              type="file"
              accept={meta.accept}
              className="sr-only"
              onChange={handleFile(key)}
            />
          </label>
        </div>
        {fieldError(key)}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <Link href="/vendor" className="hover:text-emerald-600">Vendor</Link> /{" "}
          <span className="text-gray-700">Register</span>
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
            <Store size={20} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Sell on WE Market
            </h1>
            <p className="text-sm text-gray-500">
              Complete all {STEPS.length} steps to open your seller account.
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <ol className="flex items-center gap-2 mb-8" aria-label="Registration progress">
          {STEPS.map((entry, index) => {
            const Icon = entry.icon;
            const done = index < step;
            const active = index === step;
            return (
              <li key={entry.key} className="flex-1 min-w-0">
                <div
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors ${
                    active
                      ? "border-emerald-500 bg-emerald-50"
                      : done
                        ? "border-emerald-200 bg-white"
                        : "border-gray-200 bg-white"
                  }`}
                >
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      done
                        ? "bg-emerald-500 text-white"
                        : active
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {done ? <CheckCircle2 size={13} /> : index + 1}
                  </span>
                  <span
                    className={`text-[11px] font-semibold truncate ${
                      active ? "text-emerald-700" : "text-gray-500"
                    }`}
                  >
                    {entry.label}
                  </span>
                  <Icon
                    size={13}
                    className={`ml-auto shrink-0 hidden sm:block ${
                      active ? "text-emerald-600" : "text-gray-300"
                    }`}
                  />
                </div>
              </li>
            );
          })}
        </ol>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
          {/* Step 1 — Business info */}
          {step === 0 && (
            <section>
              <h2 className="font-bold text-gray-800 mb-1">Business Information</h2>
              <p className="text-xs text-gray-500 mb-5">
                Tell us who you are and where your business operates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="legalBusinessName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Legal business name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="legalBusinessName"
                    value={business.legalBusinessName}
                    onChange={(e) => setBusinessField("legalBusinessName", e.target.value)}
                    placeholder="Acme Traders Pvt Ltd"
                    className={inputClass("legalBusinessName")}
                  />
                  {fieldError("legalBusinessName")}
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contact person <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactName"
                    value={business.contactName}
                    onChange={(e) => setBusinessField("contactName", e.target.value)}
                    placeholder="Jane Doe"
                    className={inputClass("contactName")}
                  />
                  {fieldError("contactName")}
                </div>

                <div>
                  <label htmlFor="vendorType" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Business type
                  </label>
                  <select
                    id="vendorType"
                    value={business.vendorType}
                    onChange={(e) => setBusinessField("vendorType", e.target.value)}
                    className={inputClass("vendorType")}
                  >
                    {VENDOR_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={business.email}
                    onChange={(e) => setBusinessField("email", e.target.value)}
                    placeholder="seller@business.com"
                    className={inputClass("email")}
                  />
                  {fieldError("email")}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={business.phone}
                    onChange={(e) => setBusinessField("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={inputClass("phone")}
                  />
                  {fieldError("phone")}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Business address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="addressLine1"
                    value={business.addressLine1}
                    onChange={(e) => setBusinessField("addressLine1", e.target.value)}
                    placeholder="12, Industrial Estate, MG Road"
                    className={inputClass("addressLine1")}
                  />
                  {fieldError("addressLine1")}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    value={business.city}
                    onChange={(e) => setBusinessField("city", e.target.value)}
                    placeholder="Bengaluru"
                    className={inputClass("city")}
                  />
                  {fieldError("city")}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="state"
                    value={business.state}
                    onChange={(e) => setBusinessField("state", e.target.value)}
                    placeholder="Karnataka"
                    className={inputClass("state")}
                  />
                  {fieldError("state")}
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Postal code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="postalCode"
                    value={business.postalCode}
                    onChange={(e) => setBusinessField("postalCode", e.target.value)}
                    placeholder="560001"
                    className={inputClass("postalCode")}
                  />
                  {fieldError("postalCode")}
                </div>
              </div>
            </section>
          )}

          {/* Step 2 — Certifications & compliance */}
          {step === 1 && (
            <section>
              <h2 className="font-bold text-gray-800 mb-1">
                Certifications & Compliance
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Upload the documents required to verify your business. Files may
                be PDF or PNG unless noted.
              </p>
              <div className="space-y-4">
                {fileRow("gstCertificate")}
                {fileRow("businessLicense")}
                {fileRow("complianceDeclaration")}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Documents are reviewed by our compliance team and are never
                shared with other sellers.
              </p>
            </section>
          )}

          {/* Step 3 — Catalog specs */}
          {step === 2 && (
            <section>
              <h2 className="font-bold text-gray-800 mb-1">Catalog Specs</h2>
              <p className="text-xs text-gray-500 mb-5">
                Describe what you sell so we can route the right traffic to your
                store.
              </p>

              <div className="mb-5">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Categories you sell in <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => {
                    const selected = catalog.categories.includes(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => toggleCategory(category)}
                        aria-pressed={selected}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                          selected
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                            : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
                {fieldError("categories")}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label htmlFor="monthlyOrders" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Monthly order capacity
                  </label>
                  <input
                    id="monthlyOrders"
                    type="number"
                    min={0}
                    value={catalog.monthlyOrders}
                    onChange={(e) =>
                      setCatalog((prev) => ({ ...prev, monthlyOrders: e.target.value }))
                    }
                    placeholder="500"
                    className={inputClass("monthlyOrders")}
                  />
                </div>
                <div>
                  <label htmlFor="leadTime" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Fulfilment lead time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="leadTime"
                    value={catalog.leadTime}
                    onChange={(e) =>
                      setCatalog((prev) => ({ ...prev, leadTime: e.target.value }))
                    }
                    placeholder="e.g. 2–3 business days"
                    className={inputClass("leadTime")}
                  />
                  {fieldError("leadTime")}
                </div>
              </div>

              <div className="space-y-4 mb-5">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Catalog description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={catalog.description}
                    onChange={(e) =>
                      setCatalog((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="What products do you list? Brands, price range, sourcing…"
                    className={inputClass("description")}
                  />
                  {fieldError("description")}
                </div>
                <div>
                  <label htmlFor="returnPolicy" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Return policy
                  </label>
                  <textarea
                    id="returnPolicy"
                    rows={3}
                    value={catalog.returnPolicy}
                    onChange={(e) =>
                      setCatalog((prev) => ({ ...prev, returnPolicy: e.target.value }))
                    }
                    placeholder="e.g. 7-day returns on unopened items, buyer pays return shipping"
                    className={inputClass("returnPolicy")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {fileRow("catalogFile")}
                {fileRow("priceList")}
              </div>
            </section>
          )}

          {/* Step 4 — Agreement */}
          {step === 3 && (
            <section>
              <h2 className="font-bold text-gray-800 mb-1">
                Seller Agreement
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Review and accept the terms below to finish your application.
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 leading-relaxed max-h-56 overflow-y-auto mb-5">
                <p className="font-bold text-gray-800 text-sm mb-2">
                  WE Market Seller Terms (summary)
                </p>
                <p className="mb-2">
                  1. You warrant that all listings are accurate, in stock as
                  described, and comply with applicable laws in your region.
                </p>
                <p className="mb-2">
                  2. You grant WE Market a non-exclusive licence to display your
                  product images and descriptions for the purpose of selling
                  your inventory.
                </p>
                <p className="mb-2">
                  3. Payouts are processed every Tuesday for orders delivered
                  more than 7 days prior, net of marketplace fees.
                </p>
                <p className="mb-2">
                  4. Counterfeit, restricted or unsafe goods lead to immediate
                  suspension of your seller account.
                </p>
                <p>
                  5. Either party may terminate this agreement with 30 days
                  written notice; open orders must still be fulfilled.
                </p>
              </div>

              <div className="space-y-3">
                {(
                  [
                    ["sellerTerms", "I accept the Seller Terms & Conditions"],
                    ["ipWarranty", "I warrant that I own or license all IP used in my listings"],
                    ["payoutTerms", "I accept the payout schedule and fee structure"],
                  ] as [keyof AgreementFields, string][]
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className={`flex items-start gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                      errors[key]
                        ? "border-red-300 bg-red-50"
                        : agreement[key]
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={agreement[key]}
                      onChange={(e) => {
                        setAgreement((prev) => ({ ...prev, [key]: e.target.checked }));
                        setErrors((prev) => ({ ...prev, [key]: "" }));
                      }}
                      className="mt-0.5 accent-emerald-600"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {label} <span className="text-red-500">*</span>
                    </span>
                  </label>
                ))}
              </div>
              {(["sellerTerms", "ipWarranty", "payoutTerms"] as const)
                .filter((key) => errors[key])
                .map((key) => (
                  <p key={key} className="text-xs text-red-500 mt-1">
                    {errors[key]}
                  </p>
                ))}
            </section>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3 border-t border-gray-100 mt-6 pt-5">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={15} /> Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                {submitting ? "Submitting…" : "Submit application"}
              </button>
            )}
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-5">
          Already selling with us?{" "}
          <Link href="/seller/register" className="text-emerald-600 font-semibold hover:underline">
            Use the full seller registration form
          </Link>
        </p>
      </div>
    </div>
  );
}
