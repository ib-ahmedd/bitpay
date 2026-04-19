function ReloadBtn({ handleReload }: ReloadBtnProps) {
  return (
    <div className="md:w-1/3 flex justify-end">
      <button
        className="w-[5em] lg:w-[7em] py-1 md:py-2 border-2 border-border-grey text-center font-bold rounded-full hover:bg-border-grey text-sm md:text-base"
        onClick={handleReload}
      >
        Reload
      </button>
    </div>
  );
}

interface ReloadBtnProps {
  handleReload: () => void;
}
export default ReloadBtn;
