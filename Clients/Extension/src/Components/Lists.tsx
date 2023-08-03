export function CreateLists() {
  return (
    <ul className="overflow-y-scroll overflow-x-hidden h-full">
      <li className="list-none flex gap-x-1 peer-checked:bg-red-600 cursor-pointer font-medium rounded-t-md p-2 hover:bg-gray-200">
      <button>
        <img src="/assets/icons/flags/us.png" alt="Flag" className="w-6 h-6" />
        <span className="mt-1">Neterland</span>
        <img
          src="/assets/icons/flags/us.png"
          alt="Flag"
          className="w-6 h-6 mx-[50%]"
        />
        </button>
      </li>
      <li>
        <details>
          <summary className="list-none flex gap-x-1 peer-checked:bg-red-600 cursor-pointer font-medium rounded-t-md p-2 hover:bg-gray-200">
            <img
              src="/assets/icons/flags/us.png"
              alt="Flag"
              className="w-6 h-6"
            />
            <span className="mt-1">Neterland</span>
            <img
              src="/assets/icons/flags/us.png"
              alt="Flag"
              className="w-6 h-6 mx-[50%]"
            />
          </summary>
          <ul className="mt-1">
            <button>
            <li className="hover:bg-gray-300 rounded-md p-1">
              <img
                src="/assets/icons/flags/fast.png"
                alt="Flag"
                className="w-6 h-6 inline"
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
