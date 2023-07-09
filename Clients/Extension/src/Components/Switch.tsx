export default function Switch() {
  return (
    <div className="flex after:last:gap-2 justify-center mt-5">
      {/** add loading class */}
      <input type="checkbox" id="vpn" className="peer hidden" />
      <label
        for="vpn"
        className="peer-checked:bg-green-600 peer-checked:shadow-green-500 peer-checked:before:w-1 relative w-20 h-20 bg-[#fd1015] rounded-full cursor-pointer block shadow-red-600 shadow-[0_9px_15px_0_#ff0008a6] transition-all before:content-[''] before:w-10 before:h-10 before:absolute before:left-5 before:top-5 peer-checked:before:left-8 before:transition-all before:rounded-full  before:border-white before:animate-none before:border-solid before:border-[9px] peer-[.loading]:before:border-dashed peer-[.loading]:before:animate-[spin_8s_linear_infinite]"
      ></label>
      <div className="group-checked:bg-red-700 before:content-['/'] before:text-gray-400 before:absolute before:text-8xl before:top-8 before:left-[7.75rem] ml-9">
        <div class="ml-4 mt-2 dark:text-white">
          <p>ip : 1.1.1.1</p>
          <p className="-ml-4">type: free</p>
          <p className="-ml-7">country: IRAN</p>
        </div>
      </div>
    </div>
  );
}
