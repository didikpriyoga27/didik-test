import { TCartKeys, TCommonsKeys, TProductsKeys } from "../type";

const cart: Record<TCartKeys, string> = {
  empty: "Keranjang anda kosong",
  goToProducts: "Pergi ke Produk",
};

const commons: Record<TCommonsKeys, string> = {
  cart: "Keranjang",
  products: "Produk",
  search: "Cari",
};

const products: Record<TProductsKeys, string> = {
  productId: "ID Produk",
  image: "Gambar",
  title: "Judul",
  description: "Deskripsi",
  category: "Kategori",
  price: "Harga",
  createdAt: "Ditambahkan pada",
  updatedAt: "Diperbarui pada",
  actions: "Aksi",
  addProduct: "Tambah Produk",
  editProduct: "Edit Produk",
  input: "Masukkan",
};

const id = {
  cart,
  commons,
  products,
};

export default id;
