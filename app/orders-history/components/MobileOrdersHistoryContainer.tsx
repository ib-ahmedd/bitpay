"use client";
import { sampleOrdersHistoryArray } from "@app/constants";
import MobileOrdersHistoryCard from "./MobileOrdersHistoryCard";
import { useState } from "react";
import { Order } from "@types";
function MobileOrdersHistoryContainer({ orders }: { orders: Order[] }) {
  const [expandedOrder, setExpandedOrder] = useState("0");

  return (
    <section className="w-full flex md:hidden flex-col gap-2">
      {orders.map((item) => (
        <MobileOrdersHistoryCard
          key={item.orderId}
          {...item}
          expandedOrder={expandedOrder}
          setExpandedOrder={setExpandedOrder}
        />
      ))}
    </section>
  );
}
export default MobileOrdersHistoryContainer;
