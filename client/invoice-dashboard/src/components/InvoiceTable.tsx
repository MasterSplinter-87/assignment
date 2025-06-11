import { useInvoices } from "../api/invoices";
import type { Invoice } from "../types/invoice";
import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

interface Props {
  onSelect: (invoice: Invoice) => void;
}

const ITEMS_PER_PAGE = 10;

export default function InvoiceTable({ onSelect }: Props) {
  const { data, isLoading } = useInvoices();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const { search } = useSearch();

  const invoices = (data ?? []) as Invoice[];

  const filtered = invoices.filter(
    (inv) =>
      inv.vendor_name.toLowerCase().includes(search.toLowerCase()) ||
      inv.description.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No invoices found.</p>;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setPageInput(String(page));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput);
    if (!isNaN(page)) goToPage(page);
  };

  return (
    <div>
      <table className="w-full bg-gradient-to-b from-indigo-100 to-white shadow-md rounded">
        <thead>
          <tr className="text-white-500 bg-blue-500 text-left">
            <th className="p-2 border border-gray-300">Date</th>
            <th className="p-2 border border-gray-300">Payee</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Due Date</th>
            <th className="p-2 border border-gray-300">Amount</th>
            <th className="p-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((inv, index) => {
            const date = new Date(inv.due_date);
            const formatted = date.toLocaleDateString("en-GB"); // dd/mm/yyyy
            return (
              <tr
                key={inv.id}
                className="hover:bg-gray-100 cursor-pointer text-gray-500"
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    id={`checkbox-${index + 1}`}
                  />
                  <span onClick={() => onSelect(inv)}>{formatted}</span>
                </td>
                <td
                  onClick={() => onSelect(inv)}
                  className="p-2 border border-gray-300"
                >
                  {inv.vendor_name}
                </td>
                <td
                  onClick={() => onSelect(inv)}
                  className="p-2 border border-gray-300"
                >
                  {inv.description}
                </td>
                <td
                  onClick={() => onSelect(inv)}
                  className="p-2 border border-gray-300"
                >
                  {formatted}
                </td>
                <td
                  onClick={() => onSelect(inv)}
                  className="p-2 border border-gray-300"
                >
                  $ {inv.amount}
                </td>
                <td
                  onClick={() => onSelect(inv)}
                  className="p-2 border border-gray-300"
                >
                  {inv.paid ? "Paid" : "Open"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {invoices.length > 10 && (
        <div className="w-[300px] flex items-center justify-between mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <form
            onSubmit={handleInputSubmit}
            className="flex items-center gap-2"
          >
            <span>Page</span>
            <input
              type="number"
              value={pageInput}
              onChange={handleInputChange}
              className="w-16 text-center border border-gray-300 rounded text-blue-500"
            />
            <span>of {totalPages}</span>
          </form>

          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
