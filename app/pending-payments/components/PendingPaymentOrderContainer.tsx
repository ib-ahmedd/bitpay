import PageTitleBar from "@components/PageTitleBar";
import MobilePendingPaymentOrderCard from "./MobilePendingPaymentOrderCard";
import PendingPaymentOrderCard from "./PendingPaymentOrderCard";

function PendingPaymentOrderContainer() {
  return (
    <>
      <PageTitleBar page="Pending Payments">
        <div className="flex gap-2 text-sm xl:text-base">
          <p className="bg-site-lighter-grey p-2 rounded-2xl border border-border-grey">
            Orders: 3
          </p>
          <button className="bg-site-orange py-2 px-3 rounded-2xl border border-border-grey">
            Reload
          </button>
        </div>
      </PageTitleBar>
      <section className="w-full hidden md:flex flex-col gap-2 rounded-3xl border border-border-grey bg-site-lighter-grey p-4">
        <div className="w-full">
          <div className="flex justify-between w-full px-4 pb-2 font-bold">
            <h4 className="w-1/5">Name</h4>
            <h4 className="w-1/5">Bank Details</h4>
            <h4 className="w-1/5">Remarks</h4>
            <h4 className="w-1/5">Amounts</h4>
            <h4 className="w-1/5"></h4>
          </div>
          <div className="w-full flex flex-col gap-2">
            <PendingPaymentOrderCard />
            <PendingPaymentOrderCard />
            <PendingPaymentOrderCard />
          </div>
        </div>
      </section>
      <section className="w-full flex gap-2 md:hidden flex-col rounded-3xl border border-border-grey bg-site-lighter-grey p-2">
        <MobilePendingPaymentOrderCard />
        <MobilePendingPaymentOrderCard />
        <MobilePendingPaymentOrderCard />
      </section>
    </>
  );
}

export default PendingPaymentOrderContainer;
