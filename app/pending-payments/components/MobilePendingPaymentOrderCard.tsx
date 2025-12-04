function MobilePendingPaymentOrderCard() {
  return (
    <article className="flex flex-col bg-site-transparent-blue p-2 border rounded-3xl border-border-grey justify-between">
      <div className="px-2 w-full flex justify-between font-bold border-b border-border-grey">
        <h4>Ahmed Ibrahim</h4>
        <p>N100,367</p>
      </div>
      <div className="flex justify-between my-1 py-1 border-b border-border-grey">
        <span className="flex gap-1 px-2">
          <p>First Bank</p>
          <p>|</p>
          <p>3002466436</p>
        </span>
        <span className="flex gap-1">
          <p>20mins</p>
          <p>|</p>
          <span className="flex">
            <p className="text-green-600 w-7 text-center bg-site-transparent-green">
              20
            </p>
            <p className="text-red-700 w-7 text-center bg-site-transparent-red">
              2
            </p>
          </span>
        </span>
      </div>
      <div className="w-full flex justify-center items-end gap-1 text-sm">
        <button className="bg-site-orange py-1 px-4 rounded-md w-[90px]">
          Pay
        </button>
        <button className="bg-site-transparent-orange border border-site-orange rounded-lg p-1 w-[90px]">
          Mark
        </button>
      </div>
    </article>
  );
}

export default MobilePendingPaymentOrderCard;
