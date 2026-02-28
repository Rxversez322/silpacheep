type Props = {
  name: string
  price: number
  image: string
  description: string
}

export default function ProductDetail({
  name,
  price,
  image,
  description,
}: Props) {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      <img src={image} className="rounded-xl" />
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-red-600 text-xl mt-2">{price} บาท</p>
        <p className="mt-4">{description}</p>
        <button className="mt-4 bg-amber-600 text-white px-6 py-2 rounded-lg">
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  )
}