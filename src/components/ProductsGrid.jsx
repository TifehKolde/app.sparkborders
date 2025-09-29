import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }
  if (halfStar) {
    stars.push(<Star key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500 opacity-50" />);
  }
  while (stars.length < 5) {
    stars.push(<Star key={`empty-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }
  return stars;
};

export default function ProductsGrid({ products, addToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className=" p-4 flex flex-col rounded-xl  hover:shadow-lg transition">
          
          {/* Wrap image and title in Link */}
          <Link to={`/distributors/${p.distributorId}/products/${p.id}`} className="flex flex-col flex-1">
            <img src={p.image} alt={p.name} className="w-full h-58 object-contain mb-3 rounded" />
            <h4 className="font-semibold text-gray-800 mb-1">{p.name}</h4>
          </Link>
          
          <p className="text-gray-600 text-sm mb-2">{p.desc}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-navy text-lg">₦{p.price}/pack</span>
            <span className="text-navy text-lg font-semibold">MOQ-50</span>
          </div>
          <div className="flex mb-3">{renderStars(4)}</div>
          <button
            onClick={() => addToCart(p)}
            className="bg-primary text-navy font-semibold px-4 py-2 rounded flex items-center justify-center gap-2 mt-auto hover:bg-primary/90"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
