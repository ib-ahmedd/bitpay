function PendingPaymentOrderCard() {
  return (
    <article className="flex justify-between items-center bg-site-transparent-blue box-border px-4 py-2 rounded-3xl border border-border-grey">
      <h4 className="text-base xl:text-xl font-bold w-1/5 box-border p-2">
        Ahmed Ibrahim
      </h4>
      <div className="w-1/5">
        <p>Kuda</p>
        <p>3002466436</p>
      </div>
      <div className="flex flex-col items- pl-2 w-1/5">
        <span className="font-bold flex">
          <p className="text-green-600 w-7 text-center bg-site-transparent-green">
            20
          </p>
          <p className="text-red-700 w-7 text-center bg-site-transparent-red">
            2
          </p>
        </span>
        <p>20mins</p>
      </div>

      <div className="w-1/5">
        <p className="font-bold text-lg xl:text-xl">N37,430</p>
        <p className="font-bold text-base xl:text-lg">$34.74</p>
      </div>
      <div className="flex flex-col items-end gap-1 w-1/5">
        <button className="bg-site-orange py-1 px-4 rounded-md w-[150px]">
          Pay
        </button>
        <button className="bg-site-transparent-orange border border-site-orange rounded-lg p-1 w-[150px]">
          Mark Paid
        </button>
      </div>
    </article>
  );
}
export default PendingPaymentOrderCard;
