export function CreateLists({ callbackEvent }: { callbackEvent: (input: object) => void }) {
  const fakeData = {
    "us": [
      {
        "scheme": "https",
        "host": "blade6.frankfurt-rack417.nodes.gen4.ninja",
        "username": "",
        "password": "",
        "location": "hesa",
        "port": 9002,
        "type": "free"
      }
    ]
  };
  return (
    <ul className="overflow-y-scroll overflow-x-hidden h-full">
      {Object.entries(fakeData).map((value) => {
        return (
          <li className="list-none flex gap-x-1 peer-checked:bg-red-600 cursor-pointer font-medium rounded-t-md p-2 hover:bg-gray-200"
            >
            <img src="/assets/icons/flags/us.png" alt="Flag" className="w-6 h-6" loading="lazy" />
            <span className="mt-1">{value[0]}</span>
            <img
              src="/assets/icons/flags/us.png"
              alt="Flag"
              className="w-6 h-6 ltr:ml-auto rtl:mr-auto"
              loading="lazy"
            />
            <input type="radio" className="w-6" onClick={() => { callbackEvent(["", value[1]]) }} />
            {/* <label for="uniqid">ikkk</label> */}
          </li>
        )
      })}

      <li>
        <details>
          <summary className="list-none flex gap-x-1 peer-checked:bg-red-600 cursor-pointer font-medium rounded-t-md p-2 hover:bg-gray-200">
            <img
              src="/assets/icons/flags/us.png"
              alt="Flag"
              className="w-6 h-6"
              loading="lazy"
            />
            <span className="mt-1">Neterland</span>
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
              </li>
            </button>
          </ul>
        </details>
      </li>
    </ul>
  );
}
