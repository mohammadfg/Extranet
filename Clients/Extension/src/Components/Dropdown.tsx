export default function Dopdown() {
  return (
    <div className="shadow-xl rounded-t-md dark:text-white p-1">
      <ul>
        <li className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer">
          <img
            src="../assets/icons/flags/fast.png"
            alt=""
            className="w-6 inline"
          />
          Random
          <img src="/icons/flags/fast.png" alt="" className="w-6 inline" />
        </li>
        <li className="rounded-md p-2 hover:bg-gray-200 cursor-pointer">
          <img src="" alt="" />
          Fast
        </li>
        <li className="rounded-t-md p-2 hover:bg-gray-200 cursor-pointer">
          <img src="" alt="" />
          <label
          id="aaa"
            for="County_id"
            className="after:content-['⌵'] after:ml-2 peer-checked:bg-red-600"
          >
            Neterland
          </label>
          <input type="checkbox" class="peer hidden" id="County_id" />
          <ul
            for="ssss"
            className="m-auto p-[revert] hidden peer-checked:block"
          >
            <li>
              <img src="/icons/flags/fast.png" alt="" className="w-6 inline" />
              Server 1
            </li>
            <li>
              <img src="" alt="" />
              Server 2
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
