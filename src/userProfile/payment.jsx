// import { CreditCard, IndianRupee, ReceiptText } from "lucide-react";

// const transactions = [
//   {
//     id: "PAY-1001",
//     booking: "OD-1001",
//     date: "12 Oct 2026",
//     amount: "₹4,500",
//     status: "Paid",
//   },
//   {
//     id: "PAY-1002",
//     booking: "OD-1002",
//     date: "20 Sep 2026",
//     amount: "₹9,000",
//     status: "Paid",
//   },
//   {
//     id: "PAY-1003",
//     booking: "OD-1003",
//     date: "05 Aug 2026",
//     amount: "₹7,500",
//     status: "Paid",
//   },
// ];

// const Payments = () => (
//   <div className="space-y-6">
//     <div>
//       <p className="text-sm font-semibold text-[#D96B43]">TRANSACTION CENTRE</p>
//       <h1 className="mt-1 text-3xl font-bold text-[#1E3A2B]">Payments</h1>
//       <p className="mt-2 text-gray-500">Review your payment history.</p>
//     </div>

//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//       <div className="rounded-2xl bg-[#1E3A2B] p-6 text-white">
//         <IndianRupee size={26} />
//         <p className="mt-5 text-sm text-gray-200">Total Paid</p>
//         <h2 className="mt-1 text-3xl font-bold">₹21,000</h2>
//         <p className="mt-2 text-xs text-gray-300">Sample amount</p>
//       </div>

//       <div className="rounded-2xl bg-white p-6 shadow-sm">
//         <CreditCard size={26} className="text-[#D96B43]" />
//         <p className="mt-5 text-sm text-gray-500">Payment Methods</p>
//         <h2 className="mt-1 text-xl font-bold text-[#1E3A2B]">
//           Secure Payments
//         </h2>
//         <p className="mt-2 text-sm text-gray-500">
//           Your payment options will appear here.
//         </p>
//       </div>
//     </div>

//     <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
//       <div className="flex items-center gap-3 p-5">
//         <ReceiptText className="text-[#D96B43]" />
//         <h2 className="text-lg font-bold text-[#1E3A2B]">
//           Transaction History
//         </h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[580px] text-left text-sm">
//           <thead className="bg-[#F4EFEA] text-gray-600">
//             <tr>
//               <th className="p-4">Transaction ID</th>
//               <th className="p-4">Booking ID</th>
//               <th className="p-4">Date</th>
//               <th className="p-4">Amount</th>
//               <th className="p-4">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((item) => (
//               <tr key={item.id} className="border-t border-gray-100">
//                 <td className="p-4 font-medium">{item.id}</td>
//                 <td className="p-4">{item.booking}</td>
//                 <td className="whitespace-nowrap p-4">{item.date}</td>
//                 <td className="p-4 font-semibold">{item.amount}</td>
//                 <td className="p-4">
//                   <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
//                     {item.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>

//     <p className="text-xs text-gray-400">
//       Demo transactions. Connect your payment API for real records.
//     </p>
//   </div>
// );

// export default Payments;

import { useMemo, useState } from "react";
import {
  CreditCard,
  IndianRupee,
  ReceiptText,
  Search,
  ArrowDownToLine,
  ArrowRight,
  CalendarDays,
  CircleCheck,
} from "lucide-react";

const transactions = [
  {
    id: "PAY-1001",
    booking: "OD-1001",
    date: "12 Oct 2026",
    amount: 4500,
    status: "Paid",
    method: "UPI",
  },
  {
    id: "PAY-1002",
    booking: "OD-1002",
    date: "20 Sep 2026",
    amount: 9000,
    status: "Paid",
    method: "Credit Card",
  },
  {
    id: "PAY-1003",
    booking: "OD-1003",
    date: "05 Aug 2026",
    amount: 7500,
    status: "Paid",
    method: "UPI",
  },
];

const formatAmount = (amount) => `₹${amount.toLocaleString("en-IN")}`;

const Payments = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.booking.toLowerCase().includes(query) ||
        item.method.toLowerCase().includes(query);

      const matchesFilter = filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalPaid = transactions
    .filter((item) => item.status === "Paid")
    .reduce((total, item) => total + item.amount, 0);

  const paidCount = transactions.filter(
    (item) => item.status === "Paid",
  ).length;

  const downloadCSV = () => {
    const headers = [
      "Transaction ID",
      "Booking ID",
      "Date",
      "Amount",
      "Payment Method",
      "Status",
    ];

    const rows = filteredTransactions.map((item) => [
      item.id,
      item.booking,
      item.date,
      item.amount,
      item.method,
      item.status,
    ]);

    const escapeCSV = (value) => `"${String(value).replace(/"/g, '""')}"`;

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "odishadrive-payments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-w-0 space-y-7 bg-white text-black">
      {/* Page heading */}
      <section className="border-b border-gray-200 pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
          Transaction centre
        </p>

        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Payments
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review your transactions and payment history.
            </p>
          </div>

          <span className="flex items-center gap-2 text-sm text-gray-500">
            <ReceiptText size={17} />
            {transactions.length} transactions
          </span>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total paid</span>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200">
              <IndianRupee size={20} strokeWidth={1.5} />
            </div>
          </div>

          <p className="mt-5 text-2xl font-normal tracking-tight text-black">
            {formatAmount(totalPaid)}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Across {paidCount} successful transactions
          </p>
        </article>

        <article className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Payment records</span>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200">
              <CreditCard size={20} strokeWidth={1.5} />
            </div>
          </div>

          <p className="mt-5 text-2xl font-normal text-black">
            {transactions.length}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            All recorded transactions
          </p>
        </article>
      </section>

      {/* Transaction history */}
      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200">
              <ReceiptText size={19} strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="text-base font-medium">Transaction History</h2>

              <p className="mt-1 text-xs text-gray-500">
                Your payment records and booking references
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={downloadCSV}
            disabled={filteredTransactions.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowDownToLine size={16} />
            Export CSV
          </button>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-gray-300 px-3.5 py-2.5 focus-within:border-black">
            <Search size={17} className="shrink-0 text-gray-500" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transaction or booking ID..."
              aria-label="Search transactions"
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter by payment status"
            className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-black outline-none focus:border-black"
          >
            <option value="All">All statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Responsive transaction table */}
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-normal text-gray-600">
                <tr>
                  <th className="px-5 py-3.5 font-medium">Transaction</th>
                  <th className="px-5 py-3.5 font-medium">Booking ID</th>
                  <th className="px-5 py-3.5 font-medium">Date</th>
                  <th className="px-5 py-3.5 font-medium">Method</th>
                  <th className="px-5 py-3.5 font-medium">Amount</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-black">
                      {item.id}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {item.booking}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={15} className="text-gray-500" />
                        {item.date}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {item.method}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-normal text-black">
                      {formatAmount(item.amount)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-700">
                        <CircleCheck size={15} strokeWidth={1.5} />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-5 py-14 text-center">
            <ReceiptText
              size={30}
              strokeWidth={1.3}
              className="mx-auto text-gray-500"
            />

            <h3 className="mt-4 text-base font-medium">
              No transactions found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or change the payment status filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="border-t border-gray-200 px-4 py-3.5 sm:px-5">
          <p className="text-xs text-gray-500">
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transactions
          </p>
        </div>
      </section>

      {/* Payment information */}
      <section className="flex items-start gap-3 border-t border-gray-200 pt-5">
        <CreditCard
          size={19}
          strokeWidth={1.5}
          className="mt-0.5 shrink-0 text-gray-600"
        />

        <div>
          <h3 className="text-sm font-medium">Payment information</h3>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            These are demonstration records. Connect your payment provider and
            backend API to display verified transactions for the signed-in
            customer.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Payments;
