import { useContext } from "preact/hooks";
import { Context } from "../Context/Main";
export default function Language() {
  const { handleVisiblity = () => null } = useContext(Context);
  return (
    <button
      onClick={() => {
        handleVisiblity({
          dropdown: {
            dataSheet: {
              ir: { displayName: "فارسی - ایران", rtl: true, language: "fa" },
              us: {
                displayName: "English - United States",
                rtl: false,
                language: "en",
              },
            },
            visibility: true,
          },
        });
      }}
      className="w-14 bg-gray-100 dark:bg-slate-400 rounded-b-md ml-1"
    >
      <span class="text-xs">
        <img src="./assets/icons/earth.svg" class="w-4 inline mr-1 mb-1" />
        EN
      </span>
    </button>
  );
}
