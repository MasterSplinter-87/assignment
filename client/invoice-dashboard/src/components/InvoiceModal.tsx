import type { Invoice } from "../types/invoice";

interface Props {
  invoice: Invoice | null;
  onClose: () => void;
}

export default function InvoiceModal({ invoice, onClose }: Props) {
  if (!invoice) return null;

  return (
    <div className="invoice-modal bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow w-1/2">
        <h2 className="text-xl font-bold mb-2">Invoice #{invoice.id}</h2>
        <p>
          <strong>Vendor:</strong> {invoice.vendor_name}
        </p>
        <p>
          <strong>Amount:</strong> ${invoice.amount}
        </p>
        <p>
          <strong>Description:</strong> {invoice.description}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
