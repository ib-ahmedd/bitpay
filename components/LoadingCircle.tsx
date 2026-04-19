function LoadingCircle({ text }: { text: string }) {
  return (
    <div className="w-full h-[40vh] md:h-[70vh] flex flex-col gap-2 justify-center items-center">
      <div className="w-[5em] md:w-[7em] h-[5em] md:h-[7em] border-[10px] md:border-[15px] border-border-grey border-t-site-orange rounded-full animate-spin" />
      <p className="text-lg text-site-text-gray">{text}...</p>
    </div>
  );
}
export default LoadingCircle;
