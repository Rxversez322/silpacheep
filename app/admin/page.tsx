"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async () => {
    await supabase.from("products").insert([
      { name, price: Number(price), image, description },
    ])
    alert("เพิ่มสินค้าเรียบร้อย")
  }

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">เพิ่มสินค้า</h1>

      <input
        placeholder="ชื่อสินค้า"
        className="border p-2 w-full mb-3"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="ราคา"
        className="border p-2 w-full mb-3"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="URL รูปภาพ"
        className="border p-2 w-full mb-3"
        onChange={(e) => setImage(e.target.value)}
      />

      <textarea
        placeholder="รายละเอียด"
        className="border p-2 w-full mb-3"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-amber-600 text-white w-full py-2 rounded"
      >
        บันทึก
      </button>
    </div>
  )
}