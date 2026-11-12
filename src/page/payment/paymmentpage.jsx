import React, { useState } from "react";
import {
  MapPin,
  CalendarDays,
  CreditCard,
  Landmark,
  Smartphone,
  Lock,
  CheckCircle,
  Wallet,
} from "lucide-react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // Sample booking details
  const booking = {
    vehicle: "Sedan · AC",
    tripName: "Konark Day Trip",
    pickup: "Bhubaneswar",
    destination: "Konark",
    pickupDate: "20 Oct 2026, 09:00 AM",
    dropDate: "20 Oct 2026",
    baseFare: 2200,
    distanceCharge: 600,
    serviceFee: 200,
  };

  const total = booking.baseFare + booking.distanceCharge + booking.serviceFee;

  const handlePayment = async () => {
    if (paymentMethod === "upi" && !upiId.trim()) {
      alert("Please enter your UPI ID");
      return;
    }

    if (paymentMethod === "card" && !cardNumber.trim()) {
      alert("Please enter your card number");
      return;
    }

    setLoading(true);

    try {
      // Connect your payment gateway API here.
      console.log("Payment method:", paymentMethod);
      console.log("Booking amount:", total);

      alert("Connect your payment gateway API to complete payment.");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#1E3A2B]">
      {/* Main */}
      <main className="max-w-7xl mx-auto px-5 md:px-10 py-10">
        <h2 className="text-3xl font-bold mb-8">Payment Details</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <section className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">
              Select Payment Method
            </h3>

            <div className="space-y-4">
              {/* UPI */}
              <div
                onClick={() => setPaymentMethod("upi")}
                className={`border rounded-xl p-5 cursor-pointer transition ${
                  paymentMethod === "upi"
                    ? "border-[#1E3A2B] bg-[#F4F8F4]"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="accent-[#1E3A2B] w-5 h-5"
                  />

                  <Smartphone size={22} />

                  <span className="font-semibold">Pay via UPI</span>
                </div>

                {paymentMethod === "upi" && (
                  <div className="mt-5 ml-8">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter your UPI ID"
                      className="w-full md:w-3/4 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1E3A2B]"
                    />

                    <p className="text-sm text-gray-400 mt-4">
                      Popular UPI Apps
                    </p>

                    <div className="flex gap-6 mt-3 text-sm font-medium text-gray-600">
                      <span>PhonePe</span>
                      <span>Google Pay</span>
                      <span>Paytm</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card */}
              <div
                onClick={() => setPaymentMethod("card")}
                className={`border rounded-xl p-5 cursor-pointer transition ${
                  paymentMethod === "card"
                    ? "border-[#1E3A2B] bg-[#F4F8F4]"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-[#1E3A2B] w-5 h-5"
                  />

                  <CreditCard size={22} />

                  <span className="font-semibold">Pay by Card</span>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-5 ml-8">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Enter card number"
                      maxLength={19}
                      className="w-full md:w-3/4 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1E3A2B]"
                    />
                  </div>
                )}
              </div>

              {/* Net Banking */}
              <div
                onClick={() => setPaymentMethod("netbanking")}
                className={`border rounded-xl p-5 cursor-pointer transition ${
                  paymentMethod === "netbanking"
                    ? "border-[#1E3A2B] bg-[#F4F8F4]"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "netbanking"}
                    onChange={() => setPaymentMethod("netbanking")}
                    className="accent-[#1E3A2B] w-5 h-5"
                  />

                  <Landmark size={22} />

                  <span className="font-semibold">Pay by Net Banking</span>
                </div>

                {paymentMethod === "netbanking" && (
                  <div className="mt-5 ml-8">
                    <select className="w-full md:w-3/4 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1E3A2B]">
                      <option value="">Select your bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-6 bg-[#1E3A2B] hover:bg-[#294c39] text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3 transition disabled:opacity-60"
            >
              <Lock size={18} />
              {loading ? "Processing..." : `Pay Now ₹${total}`}
            </button>

            <p className="text-center text-gray-400 text-sm mt-4 flex justify-center items-center gap-2">
              <CheckCircle size={16} />
              Secure payment experience
            </p>
          </section>

          {/* Booking Summary */}
          <aside className="bg-[#F8EBDD] rounded-2xl p-6 md:p-7 h-fit">
            <p className="text-xs font-semibold text-gray-500 tracking-wider">
              YOUR TRIP
            </p>

            <h3 className="text-2xl font-bold mt-2">{booking.tripName}</h3>

            <p className="text-sm font-medium mt-2 text-gray-600">
              {booking.vehicle}
            </p>

            <div className="border-b border-[#d8c8b8] my-6" />

            {/* Pickup */}
            <div className="flex gap-4 mb-5">
              <div className="bg-white p-3 rounded-full h-fit">
                <MapPin size={20} />
              </div>

              <div>
                <p className="font-semibold">{booking.pickup}</p>
                <p className="text-sm text-gray-500">Pickup Location</p>
              </div>
            </div>

            {/* Pickup Date */}
            <div className="flex gap-4 mb-5">
              <div className="bg-white p-3 rounded-full h-fit">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="font-semibold">{booking.pickupDate}</p>
                <p className="text-sm text-gray-500">Pickup Time</p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex gap-4 mb-5">
              <div className="bg-white p-3 rounded-full h-fit">
                <MapPin size={20} />
              </div>

              <div>
                <p className="font-semibold">{booking.destination}</p>
                <p className="text-sm text-gray-500">Drop Location</p>
              </div>
            </div>

            {/* Drop Date */}
            <div className="flex gap-4 mb-6">
              <div className="bg-white p-3 rounded-full h-fit">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="font-semibold">{booking.dropDate}</p>
                <p className="text-sm text-gray-500">Trip Date</p>
              </div>
            </div>

            <div className="border-t border-[#d8c8b8] pt-5 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Fare</span>
                <span className="font-semibold">₹{booking.baseFare}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Distance Charge</span>
                <span className="font-semibold">₹{booking.distanceCharge}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-semibold">₹{booking.serviceFee}</span>
              </div>
            </div>

            <div className="border-t border-[#d8c8b8] mt-6 pt-5 flex justify-between items-center">
              <span className="text-lg font-bold">Total Amount</span>

              <span className="text-2xl font-bold text-[#1E3A2B]">
                ₹{total}
              </span>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E3A2B] text-white mt-10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">
              <span className="text-[#D96B43]">Travel</span>mate
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore Odisha Together
            </p>
          </div>

          <div className="text-sm text-gray-300">
            <p className="font-semibold text-white mb-2">Support</p>
            <p>Contact Us</p>
            <p>FAQs</p>
            <p>Terms & Conditions</p>
          </div>

          <div className="text-sm text-gray-300">
            <p className="font-semibold text-white mb-2">Quick Links</p>
            <p>Fleet</p>
            <p>Tours</p>
            <p>Offers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentPage;
