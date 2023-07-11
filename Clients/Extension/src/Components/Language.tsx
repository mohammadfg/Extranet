export default function Language({ handleLanguage }) {
  return (
    <button
      onClick={handleLanguage}
      className="w-14 bg-gray-100 dark:bg-slate-400 rounded-b-md ml-1"
    >
      <span class="text-xs">
        <img src="./assets/icons/earth.svg" class="w-4 inline mr-1 mb-1" />
        EN
      </span>
    </button>
  );
}
