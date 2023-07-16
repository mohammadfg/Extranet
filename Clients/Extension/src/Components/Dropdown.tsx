import { createContext } from "preact";
import { useState, useContext } from "preact/hooks";

interface CountryLists {
  displayName: string;
  CountryFlag: string;
  language: string;
}
interface ServerConfig {
  scheme: string;
  host: string;
  username: string;
  password: string;
  port: number;
  type: string;
}
interface Server<T> {
  [key: string]: T[];
}
interface Dorpdown {
  dataSheet: Array<CountryLists> | Server<ServerConfig>;
  handleVisiblity: () => void;
  visibility: boolean;
}

export const DropdownContext = createContext(null);

export function DropdownContoroler({ children }) {
  const [state, setState] = useState({ visibility: false });
  function handleVisiblity(dataSheet) {
    setState((latest) => ({
      visibility: !latest.visibility,
      dataSheet: dataSheet,
    }));
  }
  return (
    <DropdownContext.Provider value={{ handleVisiblity, ...state }}>
      {children}
    </DropdownContext.Provider>
  );
}
export default function Dorpdown() {
  const { visibility, handleVisiblity, dataSheet } = useContext<Dorpdown>(DropdownContext);
  function createLists(parameter: Array<CountryLists> | Server<ServerConfig>) {
    let dataTypeCheck;
    let jsx = [];

    if (Array.isArray(parameter)) {
      dataTypeCheck = parameter;
    } else {
      dataTypeCheck = Object.entries(parameter);
    }
    console.log(dataTypeCheck)
    for (const iterator of dataTypeCheck) {
      //  if (!Array.isArray(iterator)) {
     // const { displayName, CountryFlag, language } = iterator;
        const [ CountryFlag,information ] = iterator;

      jsx.push(
        <li className="rounded-md p-2 dark:border-b-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer even:border-b border-gray-100 ">
          <img
            src={`/assets/icons/flags/${CountryFlag}.png`}
            alt=""
            className="w-6 inline mr-1"
          />
          {CountryFlag}
          {/* <img
              src="/assets/icons/flags/fast.png"
              alt=""
              className="w-6 inline float-right"
            /> */}
        </li>
      );
    }
    return jsx;
  }
  return (
    <div
      className={
        "shadow-xl dark:bg-slate-950 rounded-t-md dark:text-white p-1 absolute w-[95%] bg-white z-[2] h-full justify-self-center " +
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
        {dataSheet && createLists(dataSheet)}

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
