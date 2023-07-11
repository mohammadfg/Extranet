import { useState } from "preact/hooks";

const country = [
  { displayName: "فارسی - ایران", CountryFlag: "ir", language: "fa" },
  { displayName: "English - United States", CountryFlag: "us", language: "en" },
];
interface CountryList {
  displayName: string;
  CountryFlag: string;
  key: string;
}

export default function Dorpdown() {
  const [visibility, setVisibity] = useState(false);
  function handleVisiblity() {
    setVisibity(!visibility);
  }
  return (
    <div
      className={
        "test shadow-xl rounded-t-md dark:text-white p-1 absolute w-[95%] bg-white z-[2] h-full justify-self-center " +
        (!visibility
          ? "animate-[moveUptoDown_0.5s_1] top-full invisible"
          : "animate-[moveDowntoUp_0.5s_1] top-1")
      }
    >
      <ul>
        <li className="text-right">
          <button
            className="text-red-700 p-2 pb-0 text-2xl"
            onClick={handleVisiblity}
          >
            X
          </button>
        </li>
        {country.map(({ displayName, CountryFlag }) => (
          <li className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer even:border-b border-gray-100 ">
            <img
              src={`/assets/icons/flags/${CountryFlag}.png`}
              alt=""
              className="w-6 inline mr-1"
            />
            {displayName}
            {/* <img
              src="/assets/icons/flags/fast.png"
              alt=""
              className="w-6 inline float-right"
            /> */}
          </li>
        ))}

        {/* <li className="rounded-t-md p-2 hover:bg-gray-200 cursor-pointer">
          <img src="" alt="" />
          <label
            id="aaa"
            for="County_id"
            className=" after:ml-2 peer-checked:bg-red-600"
          >
            Neterland
          </label>
          <input type="checkbox" class="peer hidden" id="County_id" />
          <ul
            for="ssss"
            className="m-auto p-[revert] hidden peer-checked:block"
          >
            <li>
              <img
                src="/assets/icons/flags/fast.png"
                alt=""
                className="w-6 inline"
              />
              Server 1
            </li>
            <li>
              <img src="" alt="" />
              Server 2
            </li>
          </ul>
        </li> */}
      </ul>
    </div>
  );
}
