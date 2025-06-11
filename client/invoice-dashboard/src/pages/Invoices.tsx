import { useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import InvoiceModal from "../components/InvoiceModal";
import type { Invoice } from "../types/invoice";

export default function Invoices() {
  const [selected, setSelected] = useState<Invoice | null>(null);

  const handleSelect = (invoice: Invoice) => setSelected(invoice); // ✅ Typed correctly

  return (
    <>
      <InvoiceTable onSelect={handleSelect} />
      <InvoiceModal invoice={selected} onClose={() => setSelected(null)} />
    </>
  );
}
