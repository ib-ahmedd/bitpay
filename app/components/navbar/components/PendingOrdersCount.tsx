function PendingOrdersCount({ count }: { count: number }) {
  return <p className={`${count > 0 && "text-site-orange"}`}>({count})</p>;
}
export default PendingOrdersCount;
