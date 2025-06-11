import { createSlice } from "@reduxjs/toolkit";
const invoiceSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    setInvoices: (_state, action) => action.payload,
  },
});
export const { setInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
