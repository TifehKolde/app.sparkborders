import { useState } from "react";
import { Search, Filter, Download, ShoppingCart } from "lucide-react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import AddMoneyModal from "../components/WalletModals/AddMoneyModal";
import WithdrawModal from "../components/WalletModals/WithdrawModal";
import Footer from "../components/Footer";

export default function WalletPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Manage which modal is open
  const [activeModal, setActiveModal] = useState(null); 
  // values: "addMoney", "withdraw", null

  // Mock transactions
  const transactions = [
    { id: "TXN001", purchase: "Chivita Juice", date: "2025-09-01 10:30 AM", status: "Success" },
    { id: "TXN002", purchase: "Payment to Vendor", date: "2025-09-02 02:45 PM", status: "Pending" },
    { id: "TXN003", purchase: "Refund", date: "2025-09-03 09:15 AM", status: "Failed" },
    { id: "TXN004", purchase: "Groceries", date: "2025-09-04 11:00 AM", status: "Success" },
    { id: "TXN005", purchase: "Electronics", date: "2025-09-05 03:30 PM", status: "Success" },
    { id: "TXN006", purchase: "Books", date: "2025-09-06 12:20 PM", status: "Pending" },
    { id: "TXN007", purchase: "Clothes", date: "2025-09-07 01:45 PM", status: "Success" },
    { id: "TXN008", purchase: "Furniture", date: "2025-09-08 04:00 PM", status: "Failed" },
  ];

  // Filter transactions
  const filteredTx = transactions
    .filter((tx) => tab === "all" || tx.status.toLowerCase() === tab)
    .filter((tx) => tx.purchase.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filteredTx.length / itemsPerPage);
  const currentTx = filteredTx.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
   <>
    <div className="pt-16">
      <Navbar />

      {/* Hero / Balance Section */}
      <section className="bg-navy text-white py-20 flex flex-col items-center text-center">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Checkout", to: "/checkout" },
            { label: "Wallet" },
          ]}
          className="text-gray-300 mb-4 text-lg"
        />

        <p className="mt-2 text-lg">Standard Chartered : 5004636730</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold mt-4">₦500,000.00</h2>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <button
            onClick={() => setActiveModal("addMoney")}
            className="flex-1 px-10 py-2 bg-primary text-navy rounded hover:bg-primary/90 whitespace-nowrap flex-shrink-0"
          >
            Add Money
          </button>

          <button className="flex-1 px-10 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 whitespace-nowrap flex-shrink-0">
            Make Payment
          </button>

          <button
            onClick={() => setActiveModal("withdraw")}
            className="flex-1 px-10 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 whitespace-nowrap flex-shrink-0"
          >
            Withdraw
          </button>
        </div>

        {/* Modals */}
        {activeModal === "addMoney" && (
          <AddMoneyModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === "withdraw" && (
          <WithdrawModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
          />
        )}
      </section>

      {/* Transactions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-4 flex-wrap">
          {["all", "pending", "success", "failed"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 font-semibold ${
                tab === t
                  ? "border-b-2 border-navy text-navy"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold">{filteredTx.length} transactions</span>

            {/* Search Input with Icon */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="p-2 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-300">
              <Download size={16} /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-300">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Transaction Table / Cards */}
        <div className="overflow-x-auto">
          {filteredTx.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="bg-[#E6E6F3] rounded-full p-6">
                <ShoppingCart className="text-navy w-12 h-12" />
              </div>
              <p className="text-gray-500 text-lg">
                No transactions found in your wallet.
              </p>
              <button className="mt-4 px-6 py-2 bg-primary text-navy rounded hover:bg-navy/90 hover:text-white">
                Go to Store
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <table className="w-full text-left border-collapse hidden md:table">
                <thead>
                  <tr className="bg-[#E6E6F3]">
                    <th className="px-4 py-4">Transaction ID</th>
                    <th className="px-4 py-4">Purchase</th>
                    <th className="px-4 py-4">Date & Time</th>
                    <th className="px-4 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTx.map((tx, idx) => (
                    <tr
                      key={tx.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <td className="px-4 py-6">{tx.id}</td>
                      <td className="px-4 py-6">{tx.purchase}</td>
                      <td className="px-4 py-6">{tx.date}</td>
                      <td className="px-4 py-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            tx.status === "Success"
                              ? "bg-green-100 text-green-800"
                              : tx.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="flex flex-col gap-4 md:hidden">
                {currentTx.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-white rounded-lg shadow p-4 border border-gray-200"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{tx.id}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          tx.status === "Success"
                            ? "bg-green-100 text-green-800"
                            : tx.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                    <div className="text-gray-600">{tx.purchase}</div>
                    <div className="text-gray-500 text-sm mt-1">{tx.date}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1
                    ? "bg-navy text-white"
                    : "bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
    <Footer/>
   </>
  );
}
