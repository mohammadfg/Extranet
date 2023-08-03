export default function Theme({ handleTheme }: { handleTheme: () => void }) {
  return (
    <div
      onClick={handleTheme}
      className="relative w-5 h-5 rounded-[50%] bg-white cursor-pointer m-1 transition-all duration-[0.5s] before:transition-all before:duration-[0.5s] before:content-[''] before:w-[50%] before:rounded-full before:h-[50%] before:bg-[#ff8d00] before:z-[1] before:absolute before:transform before:translate-y-1/2 before:translate-x-1/2 rtl:before:-translate-x-1/2 after:content-[''] dark:before:bg-[#3f3f4c] dark:before:w-1/2 dark:before:h-3 dark:before:transform dark:before:translate-x-[4%] dark:before:translate-y-[13%] dark:before:rotate-[134deg] after:z-[2] after:absolute after:w-full after:h-full after:rounded-[50%] after:border-dotted dark:after:border-solid after:border-[4px] after:box-border after:border-amber-500 after:transition-all after:duration-[0.5s]  dark:after:border-[#3f3f4c] dark:after:shadow-[0_0_0_2px_#cdcdcd]"
    ></div>
  );
}
