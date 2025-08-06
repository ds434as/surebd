import React from "react";
import { FiSettings, FiSearch } from "react-icons/fi";
import Header from "../common/Header";

const contentData = [
  { name: "About Us", slug: "about-us" },
  { name: "Banned Page", slug: "banned-page" },
  { name: "Banner", slug: "banner" },
  { name: "Blog", slug: "blog" },
  { name: "Brand", slug: "brand" },
  { name: "Breadcrumb", slug: "breadcrumb" },
  { name: "Contact", slug: "contact" },
  { name: "Counter", slug: "counter" },
  { name: "FAQ", slug: "faq" },
  { name: "Features", slug: "features" },
  { name: "Footer", slug: "footer" },
  { name: "Header", slug: "header" },
  { name: "KYC Content", slug: "kyc-content" },
  { name: "Login", slug: "login" },
  { name: "Plan", slug: "plan" },
  { name: "Policy Pages", slug: "policy-pages" },
  { name: "Register", slug: "register" },
  { name: "Social Icons", slug: "social-icons" },
  { name: "Testimonial", slug: "testimonial" }
];

export default function FrontendContentPage() {
  return (
    <section className="font-baji w-full overflow-y-auto">
        <Header/>
<div className=" bg-gray-50 p-6 w-full">
      <h1 className="text-lg font-medium text-gray-700 mb-6">Manage Frontend Content</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Content Management Options
          </h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {contentData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-md px-4 py-3 shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-800 font-medium">{item.name}</span>
              <button className="p-1.5 bg-gray-100 rounded">
                <FiSettings className="text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}
