import { create } from "zustand";

export const useAppStore = create((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),

  products: [
    {
      id: 1,
      image: "/celana.jpeg",
      name: "Men's Casual Pants",
      category: "Clothing",
      description:
        "Comfortable and stylish casual pants, perfect for everyday wear.",
      price: 450000,
      stock: 35,
      brand: "Uniqlo",
      tags: "pants, casual, clothing",
      color: "Grey",
      size: "M",
      sales: 129,
    },
    {
      id: 2,
      image: "/hoddie.jpeg",
      name: "Oversized Hoodie",
      category: "Clothing",
      description:
        "Cozy oversized hoodie, ideal for chilly days and a relaxed look.",
      price: 180000,
      stock: 56,
      brand: "Adidas",
      tags: "hoodie, oversized, clothing",
      color: "Black",
      size: "L",
      sales: 300,
    },
    {
      id: 3,
      image: "/nike.jpeg",
      name: "Nike Air Max 270",
      category: "Shoes",
      description: "Lightweight and durable shoes for casual and stylish wear.",
      price: 455000,
      stock: 40,
      brand: "Zara",
      tags: "shirt, formal",
      color: "White",
      size: "L",
      sales: 220,
    },
  ],
  setProducts: (newProduct) =>
    set((state) => ({ products: [newProduct, ...state.products] })),

  customers: [
    {
      id: 1,
      image: "/anime.jpeg",
      name: "John Doe",
      email: "jhone@gmail.com",
      phone: "081234567890",
      address: "Jakarta, Indonesia",
      created_at: "2022-01-01",
      status: "active",
      orders: 5,
    },
    {
      id: 1,
      image: "/anime.jpeg",

      name: "Zoe sean",
      email: "zoe@gmail.com",
      phone: "083876543210",
      address: "Medan, Indonesia",
      created_at: "2024-08-12",
      status: "inactive",
      orders: 10,
    },
  ],

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
