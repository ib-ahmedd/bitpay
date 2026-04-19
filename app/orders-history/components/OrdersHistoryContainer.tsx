import OrderHistoryCard from "./OrderHistoryCard";
import { Order } from "@types";

function OrdersHistoryContainer({ orders }: { orders: Order[] }) {
  return (
    <section className="w-full hidden md:flex flex-col gap-2 rounded-3xl border border-border-grey bg-site-lighter-grey p-4">
      <table className="border border-white">
        <thead>
          <tr className="border border-border-grey h-12">
            <th className="text-center">Type</th>
            <th className="text-center">Status</th>
            <th className="text-center">Amount</th>
            <th className="text-center">Account Name</th>
            <th className="text-center">Time</th>
            <th className="text-center">Price</th>
            <th className="text-center">Order ID</th>
            <th className="text-center">Messages</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <OrderHistoryCard key={item.orderId} {...item} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default OrdersHistoryContainer;
