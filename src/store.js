import { create } from "zustand";

export const useAppStore = create((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),

  isModalDelete: false,
  setIsModalDelete: (isModalDelete) => set({ isModalDelete }),

  orders: [
    {
      id: 1,
      order_id: "ORD123456",
      customer_id: "CUST001",
      name_customer: "John Doe",
      products: [
        {
          image: "/celana.jpeg",
          name: "Men's Casual Pants",
          quantity: 2,
          price_per_item: 450000,
        },
        {
          image: "/casio.jpeg",
          name: "Casio Analog Watch",
          quantity: 1,
          price_per_item: 350000,
        },
      ],
      total_price: 1450000,
      order_date: "2024-09-07",
      order_status: "diproses",
      shipping_cost: 50000,
      shipping_address: "Jl. Mawar No. 10, Jakarta, 10110",
      payment_method: "Indomaret",
    },
    {
      id: 2,
      order_id: "ORD123457",
      customer_id: "CUST002",
      name_customer: "Zoe sean",

      products: [
        {
          image: "/hoddie.jpeg",
          name: "Oversized Hoodie",
          quantity: 1,
          price_per_item: 1500000,
        },
      ],
      total_price: 1500000,
      order_date: "2024-09-06",
      order_status: "dikirim",
      shipping_cost: 0,
      shipping_address: "Jl. Anggrek No. 20, Bandung, 40123",
      payment_method: "Bank Transfer",
    },
  ],
}));
