"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type VendorType = "Manufacturer" | "Wholesaler" | "Retailer" | "Exporter";

interface Step1Fields {
  fullName: string;
  legalBusinessName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface Step2Fields {
  gstin: string;
  pan: string;
  vendorType: VendorType;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Step3Fields {
  gstCertificate: File | null;
  businessCertificate: File | null;
  panDocument: File | null;
}

const STEP_COUNT = 3;
const VENDOR_TYPES: { value: VendorType; label: string }[] = [
  { value: "Manufacturer", label: "Manufacturer" },
  { value: "Wholesaler", label: "Wholesaler" },
  { value: "Retailer", label: "Retailer" },
  { value: "Exporter", label: "Exporter" },
];

const COUNTRIES = [
  { value: "IN", label: "India" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "JP", label: "Japan" },
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const FORM_FIELDS = [
  "fullName",
  "legalBusinessName",
  "storeName",
  "email",
  "phoneNumber",
  "password",
  "confirmPassword",
  "gstin",
  "pan",
  "vendorType",
  "addressLine1",
  "addressLine2",
  "city",
  "state",
  "country",
  "postalCode",
];

function mapDetailsToFields(details: string[]): Record<string, string> {
  const mapped: Record<string, string> = {};

  for (const detail of details) {
    const field = detail.split(" ")[0];
    if (FORM_FIELDS.includes(field)) mapped[field] = detail;
  }

  return mapped;
}

export default function SellerRegister() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [step1, setStep1] = useState<Step1Fields>({
    fullName: "",
    legalBusinessName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [step2, setStep2] = useState<Step2Fields>({
    gstin: "",
    pan: "",
    vendorType: "Manufacturer",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "IN",
    postalCode: "",
  });

  const [step3, setStep3] = useState<Step3Fields>({
    gstCertificate: null,
    businessCertificate: null,
    panDocument: null,
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitDetails, setSubmitDetails] = useState<string[]>([]);

  const validateStep1 = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!step1.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!step1.legalBusinessName.trim()) newErrors.legalBusinessName = "Legal business name is required";
    if (!step1.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(step1.email)) newErrors.email = "Invalid email format";
    if (!step1.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^[\d\s\+\-\(\)]{10,}$/.test(step1.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";
    if (!step1.password) newErrors.password = "Password is required";
    else if (step1.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (step1.password !== step1.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!step1.terms) newErrors.terms = "You must agree to the Terms & Conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step1]);

  const validateStep2 = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!step2.gstin.trim()) newErrors.gstin = "GSTIN is required";
    else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(step2.gstin)) {
      newErrors.gstin = "Invalid GSTIN format";
    }
    if (!step2.pan.trim()) newErrors.pan = "PAN is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(step2.pan)) newErrors.pan = "Invalid PAN format";
    if (!step2.vendorType) newErrors.vendorType = "Vendor type is required";
    if (!step2.addressLine1.trim()) newErrors.addressLine1 = "Address line 1 is required";
    if (!step2.city.trim()) newErrors.city = "City is required";
    if (!step2.state.trim()) newErrors.state = "State is required";
    if (!step2.country) newErrors.country = "Country is required";
    if (!step2.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    else if (!/^\d{6}$/.test(step2.postalCode)) newErrors.postalCode = "Invalid postal code (6 digits)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step2]);

  const validateStep3 = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!step3.gstCertificate) newErrors.gstCertificate = "GST Certificate is required";
    if (!step3.businessCertificate) newErrors.businessCertificate = "Business Certificate is required";
    if (!step3.panDocument) newErrors.panDocument = "PAN Document is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step3]);

  const handleStep1Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setStep1((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleStep2Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStep2((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (field: keyof Step3Fields, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, [field]: "Only PDF, JPG, PNG files allowed" }));
        return;
      }
      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, [field]: "File size must be less than 5MB" }));
        return;
      }
      setStep3((prev) => ({ ...prev, [field]: file }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (field: keyof Step3Fields, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024;
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, [field]: "Only PDF, JPG, PNG files allowed" }));
        return;
      }
      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, [field]: "File size must be less than 5MB" }));
        return;
      }
      setStep3((prev) => ({ ...prev, [field]: file }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNext = () => {
    let isValid = false;
    if (step === 1) isValid = validateStep1();
    else if (step === 2) isValid = validateStep2();
    if (isValid && step < STEP_COUNT) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitDetails([]);

    try {
      const response = await fetch("/api/seller/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: step1.fullName.trim(),
          fullName: step1.fullName.trim(),
          email: step1.email.trim(),
          password: step1.password,
          confirmPassword: step1.confirmPassword,
          storeName: step1.legalBusinessName.trim(),
          legalBusinessName: step1.legalBusinessName.trim(),
          phoneNumber: step1.phoneNumber.trim(),
          vendorType: step2.vendorType,
          gstin: step2.gstin.trim(),
          pan: step2.pan.trim(),
          addressLine1: step2.addressLine1.trim(),
          addressLine2: step2.addressLine2.trim(),
          city: step2.city.trim(),
          state: step2.state.trim(),
          country: step2.country,
          postalCode: step2.postalCode.trim(),
        }),
      });

      if (response.status === 201) {
        router.push("/seller/dashboard");
        return;
      }

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        details?: unknown;
      };
      const details = Array.isArray(data.details)
        ? data.details.map((detail) => String(detail))
        : [];

      if (response.status === 400 || response.status === 409) {
        setSubmitError(
          data.error ??
            (response.status === 409
              ? "An account with this email already exists"
              : "Please fix the errors below and try again"),
        );
        setSubmitDetails(details);
        setErrors((prev) => ({ ...prev, ...mapDetailsToFields(details) }));
        return;
      }

      setSubmitError(data.error ?? "Something went wrong. Please try again.");
      setSubmitDetails(details);
    } catch {
      setSubmitError("We could not reach the server. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileDropzone = ({
    label,
    description,
    file,
    onFileChange,
    onDragOver,
    onDrop,
    error,
  }: {
    label: string;
    description: string;
    file: File | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    error?: string;
  }) => (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer ${
        file
          ? "border-emerald-400 bg-emerald-50"
          : error
          ? "border-red-400 bg-red-50"
          : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
      }`}
    >
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
      />
      <div className="text-center">
        {!file ? (
          <>
            <Upload className="mx-auto w-12 h-12 text-gray-400 mb-3" />
            <p className="text-lg font-medium text-gray-700">{label}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
            <p className="text-xs text-gray-400 mt-2">Drag & drop or click to browse</p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-lg border border-emerald-200">
            <FileText className="w-10 h-10 text-emerald-600" />
            <div className="text-left">
              <p className="font-medium text-gray-800">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <span className="text-emerald-600">✓ Uploaded</span>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-5">
      <h2 className="text-xl font-medium text-gray-700">Step 1: Account Details</h2>
      <p className="text-gray-500">Create your vendor account</p>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={step1.fullName}
            onChange={handleStep1Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.fullName ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            placeholder="John Doe"
            required
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="legalBusinessName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Legal Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="legalBusinessName"
            name="legalBusinessName"
            value={step1.legalBusinessName}
            onChange={handleStep1Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.legalBusinessName ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Acme Corporation Pvt Ltd"
            required
          />
          {errors.legalBusinessName && (
            <p className="mt-1 text-sm text-red-600">{errors.legalBusinessName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={step1.email}
          onChange={handleStep1Change}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
            errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="john@business.com"
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={step1.phoneNumber}
          onChange={handleStep1Change}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
            errors.phoneNumber ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="+91 98765 12345"
          required
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={step1.password}
            onChange={handleStep1Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            placeholder="••••••••"
            required
            minLength={8}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={step1.confirmPassword}
            onChange={handleStep1Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            placeholder="••••••••"
            required
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="terms"
            checked={step1.terms}
            onChange={handleStep1Change}
            className="mt-1 w-4 h-4 rounded border-gray-300 focus:ring-emerald-500 text-emerald-600"
          />
          <div className="text-sm text-gray-600">
            I agree to the <Link href="/terms" className="text-emerald-600 hover:underline">Terms & Conditions</Link>
            and <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
            <span className="text-red-500">*</span>
          </div>
        </label>
        {errors.terms && <p className="mt-1 text-sm text-red-600 ml-7">{errors.terms}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5">
      <h2 className="text-xl font-medium text-gray-700">Step 2: Business Information</h2>
      <p className="text-gray-500">Provide your business registration and address details</p>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1.5">
            GSTIN / Tax ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="gstin"
            name="gstin"
            value={step2.gstin}
            onChange={handleStep2Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.gstin ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            placeholder="29ABCDE1234F1Z5"
            maxLength={15}
            required
          />
          {errors.gstin && <p className="mt-1 text-sm text-red-600">{errors.gstin}</p>}
        </div>

        <div>
          <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1.5">
            PAN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="pan"
            name="pan"
            value={step2.pan}
            onChange={handleStep2Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.pan ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            placeholder="ABCDE1234F"
            maxLength={10}
            required
          />
          {errors.pan && <p className="mt-1 text-sm text-red-600">{errors.pan}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="vendorType" className="block text-sm font-medium text-gray-700 mb-1.5">
          Vendor Type <span className="text-red-500">*</span>
        </label>
        <select
          id="vendorType"
          name="vendorType"
          value={step2.vendorType}
          onChange={handleStep2Change}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
            errors.vendorType ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          required
        >
          <option value="">Select vendor type</option>
          {VENDOR_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.vendorType && <p className="mt-1 text-sm text-red-600">{errors.vendorType}</p>}
      </div>

      <div>
        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1.5">
          Address Line 1 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="addressLine1"
          name="addressLine1"
          value={step2.addressLine1}
          onChange={handleStep2Change}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
            errors.addressLine1 ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="123 Business Street, Commercial Complex"
          required
        />
        {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
      </div>

      <div>
        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1.5">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          id="addressLine2"
          name="addressLine2"
          value={step2.addressLine2}
          onChange={handleStep2Change}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          placeholder="Floor, Building, Landmark"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={step2.city}
            onChange={handleStep2Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.city ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Mumbai"
            required
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1.5">
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            name="state"
            value={step2.state}
            onChange={handleStep2Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.state ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            required
          >
            <option value="">Select state</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={step2.country}
            onChange={handleStep2Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.country ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            required
          >
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1.5">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={step2.postalCode}
            onChange={handleStep2Change}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.postalCode ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            placeholder="400001"
            maxLength={6}
            required
          />
          {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5">
      <h2 className="text-xl font-medium text-gray-700">Step 3: Document Upload</h2>
      <p className="text-gray-500">Upload required business documents (PDF, JPG, PNG - Max 5MB each)</p>

      <div className="space-y-5">
        <FileDropzone
          label="GST Certificate"
          description="Upload your GST registration certificate"
          file={step3.gstCertificate}
          onFileChange={(e) => handleFileChange("gstCertificate", e)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop("gstCertificate", e)}
          error={errors.gstCertificate}
        />

        <FileDropzone
          label="Business Registration Certificate"
          description="Upload your business incorporation/registration certificate"
          file={step3.businessCertificate}
          onFileChange={(e) => handleFileChange("businessCertificate", e)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop("businessCertificate", e)}
          error={errors.businessCertificate}
        />

        <FileDropzone
          label="PAN Document"
          description="Upload a copy of your PAN card"
          file={step3.panDocument}
          onFileChange={(e) => handleFileChange("panDocument", e)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop("panDocument", e)}
          error={errors.panDocument}
        />
      </div>

      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
        <h4 className="font-medium text-emerald-700 mb-2">Document Requirements:</h4>
        <ul className="text-sm text-emerald-600 space-y-1">
          <li>• GST Certificate: Valid GST registration certificate</li>
          <li>• Business Certificate: Incorporation/Registration certificate</li>
          <li>• PAN Document: Clear copy of PAN card</li>
          <li>• All documents must be in PDF, JPG, or PNG format</li>
          <li>• Maximum file size: 5MB per document</li>
        </ul>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-12">
      <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-bold text-emerald-600 mb-4">Application Submitted!</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Your vendor application has been submitted successfully. Our team will review
        your documentation and get back to you within 3-5 business days.
      </p>
      <button
        onClick={() => router.push("/seller/dashboard")}
        className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
      >
        Continue to Dashboard
      </button>
    </div>
  );

  return (
    <section className="py-12 min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-600">Vendor Onboarding</h1>
            <p className="text-gray-600 mt-2">Join WE-Market as a verified vendor</p>
          </div>

          {/* Step Progress Indicator */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 z-0" />
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                    step > num
                      ? "bg-emerald-600 text-white"
                      : step === num
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > num ? <CheckCircle className="w-5 h-5" /> : num}
                </div>
                <span className="mt-2 text-xs font-medium text-gray-600 text-center w-24">
                  {num === 1 && "Account"}
                  {num === 2 && "Business Info"}
                  {num === 3 && "Documents"}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-700">{submitError}</p>
                {submitDetails.length > 0 && (
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-red-600">
                    {submitDetails.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderSuccess()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 inline mr-1" /> Previous
              </button>
              {step < STEP_COUNT && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Continue <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              )}
              {step === STEP_COUNT && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}