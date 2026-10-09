import Link from "next/link";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function VendorPlaceholder({ title, subtitle, children }: PlaceholderPageProps) {
  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <p className="text-xs text-gray-500 mb-2">
          <Link href="/vendor" className="hover:text-emerald-600">Vendor</Link> /{" "}
          <span className="text-gray-700">{title}</span>
        </p>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">{title}</h1>
          <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
          {children ?? (
            <p className="text-sm text-gray-500">
              This section is part of your vendor workspace. Connect your data
              sources to start seeing live figures here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
