import Link from "next/link"

type Props = {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductCard({ id, name, price, image }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <img src={image} className="h-48 w-full object-cover rounded-lg" />
      <h2 className="mt-3 font-semibold">{name}</h2>
      <p className="text-red-600 font-bold">{price} บาท</p>
      <Link
        href={`/products/${id}`}
        className="block mt-2 bg-amber-600 text-white text-center py-2 rounded-lg"
      >
        ดูรายละเอียด
      </Link>
    </div>
  )
}