// src/components/SidebarInfo.jsx
import { Lock, ShieldCheck, CreditCard, Truck, FileText } from "lucide-react";
import Visa from "../assets/Atms/visa.svg";
import Master from "../assets/Atms/master.svg";
import Pay from "../assets/Atms/pay.svg";

export default function SidebarInfo() {
  return (
    <aside className="bg-white rounded py-10 px-6 space-y-8 w-full max-w-sm lg:max-w-md">
      
      {/* Payment not charged yet */}
      <div className="flex items-start gap-4">
        <Lock className="text-navy w-6 h-6 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            You will not be charged until you review this order on the next page.
          </p>
        </div>
      </div>

    {/* Safe Payment Options */}
<div className="flex flex-col gap-4">
  <div className="flex items-start gap-4">
    <ShieldCheck className="text-navy w-6 h-6 flex-shrink-0" />
    <div className="flex-1">
      <h4 className="font-semibold">Safe Payment Options</h4>
      <p className="text-sm text-gray-600">
        Sparkborders protects your payment information with PCI DSS standards, encryption, and regular system reviews.
      </p>

      {/* Payment icons row */}
      <div className="flex items-center gap-4 mt-2">
        <img
          src={Visa}
          alt="Visa"
          className="h-6 object-contain"
        />
        <img
          src={Master}
          alt="MasterCard"
          className="h-6 object-contain"
        />
        <img
          src={Pay}
          alt="American Express"
          className="h-6 object-contain"
        />
      </div>
    </div>
  </div>
</div>


      {/* Secure Privacy */}
      <div className="flex items-start gap-4">
        <CreditCard className="text-navy w-6 h-6 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold">Secure Privacy</h4>
          <p className="text-sm text-gray-600">
            Your information is kept secure and uncompromised. We only use it in accordance with our privacy policy.
          </p>
        </div>
      </div>

      {/* Purchase Protection */}
      <div className="flex items-start gap-4">
        <FileText className="text-navy w-6 h-6 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold">Purchase Protection</h4>
          <p className="text-sm text-gray-600">
            Shop confidently knowing if something goes wrong, we've got your back.
          </p>
        </div>
      </div>

      {/* Delivery Guarantee */}
      <div className="flex items-start gap-4">
        <Truck className="text-navy w-6 h-6 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold">Delivery Guarantee</h4>
          <p className="text-sm text-gray-600">
            Your order is safe with us — we guarantee timely and reliable delivery every time.
          </p>
        </div>
      </div>

    </aside>
  );
}
