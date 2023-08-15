function findName() {

}
export function CreateLists({ callbackEvent, inputData }: { callbackEvent: (input: Array<string | object>) => void, inputData: object }) {
  return (
    <ul className="overflow-y-scroll overflow-x-hidden h-full">
      {Object.entries(inputData).map(([key, value]) => {
        let { displayName, shorted } = Array.isArray(value) ? true : value;
        if (Object.prototype.toString.call(value) === '[object Object]' || (Array.isArray(value) && value.length === 1)) {
          return (
            <li className="list-none flex gap-x-1 peer-checked:bg-red-600 cursor-pointer font-medium rounded-t-md p-2 hover:bg-gray-200"
              onClick={() => { callbackEvent([shorted, {}]) }}>
              <img src={`/assets/icons/flags/${key}.png`} alt="Flag" className="w-6 h-6" loading="lazy" />
              <span className="mt-1">{displayName}</span>
              <img
                src="/assets/icons/premium.png"
                alt="Flag"
                className="w-6 h-6 ltr:ml-auto rtl:mr-auto"
                loading="lazy"
              />
              <input type="radio" className="w-6" name="radio" disabled />
            </li>
          )
        } else {
          return (<li>
            <details>
              <summary className="list-none flex gap-x-1 peer-checked:bg-red-600 cursor-pointer font-medium rounded-t-md p-2 hover:bg-gray-200">
                <img
                  src="/assets/icons/flags/us.png"
                  alt="Flag"
                  className="w-6 h-6"
                  loading="lazy"
                />
                <span className="mt-1">displayName</span>
                <img
                  src="/assets/icons/flags/us.png"
                  alt="Flag"
                  className="w-6 h-6 mx-[50%]"
                  loading="lazy"
                />
              </summary>
              <ul className="mt-1">
                <button>
                  <li className="hover:bg-gray-300 rounded-md p-1">
                    <img
                      src="/assets/icons/flags/fast.png"
                      alt="Flag"
                      className="w-6 h-6 inline"
                      loading="lazy"
                    />
                    Server 1
                    <span
                      className="float-right text-green-800 cursor-help"
                      title="ping"
                    >
                      155ms
                    </span>
                    <input type="radio" className="w-6" name="radio" disabled />
                  </li>
                </button>
              </ul>
            </details>
          </li>)
        }

      })}
    </ul>
  );
}
