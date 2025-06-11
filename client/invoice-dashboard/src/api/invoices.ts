import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import type { Invoice } from "../types/invoice";

export const useInvoices = () =>
  useQuery({
    queryKey: ["invoices"],
    queryFn: async (): Promise<Invoice[]> => {
      const res = await api.get("/invoices");
      return res.data;
    },
  });
