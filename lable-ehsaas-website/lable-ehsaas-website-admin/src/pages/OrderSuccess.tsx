import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
      
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth="2"
          fill="none"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-green-600">
        🎉 Payment Successful!
      </h1>

      {/* Subtitle */}
      <p className="mt-2 text-gray-700">
        Thank you for your purchase!
      </p>

      {/* Order ID */}
      {orderId ? (
        <p className="mt-2 text-gray-500 text-sm">
          Your Order ID: <strong>{orderId}</strong>
        </p>
      ) : (
        <p className="mt-2 text-gray-500 text-sm">
          Order details could not be loaded.
        </p>
      )}

      {/* Go to Order Details */}
      {orderId && (
        <Link
          to={`/order/${orderId}`}
          className="mt-6 bg-black text-white px-5 py-3 rounded text-sm tracking-wide hover:bg-gray-800 transition"
        >
          View Order Details →
        </Link>
      )}

      {/* Go Home */}
      <Link
        to="/"
        className="mt-4 text-blue-600 underline text-sm hover:text-blue-400"
      >
        Back to Home
      </Link>
    </div>
  );
}