import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Make Money with Us",
    links: [
      { label: "Mission & Vision", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Advertising", href: "/advertise" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Blog", href: "/blog" },
      { label: "Plans & Pricing", href: "/pricing" },
      { label: "Knowledge Base", href: "/help" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Office Center", href: "/office" },
      { label: "News & Events", href: "/news" },
    ],
  },
  {
    title: "Vendor & Supplier",
    links: [
      { label: "Vendor Registration", href: "/vendor/register" },
      { label: "Manufacturer Association", href: "/vendor/register" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Editor Help", href: "/help/editor" },
      { label: "Community", href: "/community" },
      { label: "Live Chatting", href: "/chat" },
      { label: "Contact Us", href: "/contact" },
      { label: "Support Center", href: "/support" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    href: "#",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const PAYMENT_METHODS = [
  { label: "Visa", color: "bg-blue-700" },
  { label: "Mastercard", color: "bg-red-500" },
  { label: "PayPal", color: "bg-blue-500" },
  { label: "Apple Pay", color: "bg-gray-800" },
  { label: "Amex", color: "bg-blue-600" },
  { label: "Discover", color: "bg-orange-500" },
];

const TAGS_ELECTRONIC = [
  "Cell Phones", "Headphones", "Television & Video", "Game Controller",
  "Apple Watch", "HTC", "iPad", "Keyboard", "Samsung", "Wireless Speaker",
  "Samsung Galaxy", "Gaming Mouse", "eBook Readers", "Service Plans",
  "Home Audio", "Office Electronics", "Lenovo", "MacBook Pro M1", "HD Video Player",
];

const TAGS_FURNITURE = [
  "Sofa", "Chair", "Dining Table", "Living Room", "Table Lamp",
  "Night Stand", "Computer Desk", "Bar Table", "Pillow", "Radio",
  "Clock", "Bed Room", "Stool", "Television", "Wardrobe",
  "Living Room Tables", "Dressers", "Patio Sofas", "Nursery", "Kitchen",
  "Accent Furniture", "Replacement Parts",
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                Get all the latest information on events, sales and offers. Sign up for newsletter:
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="flex flex-1 lg:w-[400px]">
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your email address..."
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-3 rounded-r-md transition-colors flex items-center gap-2 shrink-0">
                  Subscribe <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Contact Column */}
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex gap-3">
                <MapPin size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>502 New Design Str, Melbourne, San Francisco, CA 94110, United States</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>(+01) 123-456-789</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>support@wemarket.com</span>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>8:00 - 17:00, Mon - Sat</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-2 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-base font-bold text-gray-900 mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App & Payment Column */}
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-6">App & Payment</h4>
            <p className="text-sm text-gray-600 mb-4">
              Download our Apps and get extra 15% Discount on your first Order!
            </p>

            {/* App Store Badges */}
            <div className="flex gap-2 mb-6">
              <a href="#" className="bg-gray-900 text-white rounded-lg px-4 py-2.5 flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] leading-none">Download on the</div>
                  <div className="text-sm font-semibold leading-none">App Store</div>
                </div>
              </a>
              <a href="#" className="bg-gray-900 text-white rounded-lg px-4 py-2.5 flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 0 1 0 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] leading-none">Get it on</div>
                  <div className="text-sm font-semibold leading-none">Google Play</div>
                </div>
              </a>
            </div>

            <p className="text-sm font-medium text-gray-600 mb-3">Secured Payment Gateways</p>
            <div className="flex flex-wrap gap-1.5">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method.label}
                  className={`${method.color} text-white text-[10px] font-bold px-2.5 py-1 rounded`}
                >
                  {method.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Tag Clouds + Copyright */}
      <div className="border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 py-8">
          {/* Tag Clouds */}
          <div className="space-y-5 mb-8">
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <h6 className="text-sm font-bold text-gray-900 shrink-0">Electronic:</h6>
                <div className="flex flex-wrap gap-1.5">
                  {TAGS_ELECTRONIC.map((tag) => (
                    <Link
                      key={tag}
                      href={`/shop?tag=${encodeURIComponent(tag)}`}
                      className="text-xs text-gray-500 hover:text-emerald-600 border border-gray-200 rounded-full px-3 py-1 transition-colors hover:border-emerald-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <h6 className="text-sm font-bold text-gray-900 shrink-0">Furniture:</h6>
                <div className="flex flex-wrap gap-1.5">
                  {TAGS_FURNITURE.map((tag) => (
                    <Link
                      key={tag}
                      href={`/shop?tag=${encodeURIComponent(tag)}`}
                      className="text-xs text-gray-500 hover:text-emerald-600 border border-gray-200 rounded-full px-3 py-1 transition-colors hover:border-emerald-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright + Legal */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Copyright &copy; 2026 WE Market. All rights reserved.
            </span>
            <ul className="flex gap-6">
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                  Conditions of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                  Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/ads" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                  Interest-Based Ads
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}