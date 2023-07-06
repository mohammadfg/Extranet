interface Advertising {
  link: string;
  title: string;
  counter:number
}
export default function Advertising({ title, link ,counter }:Advertising) {
  function handleAd() {}
  return (
    <div className="relative">
      <button
        className="absolute right-3 font-bold bg-[#00000085] px-2 mt-2 rounded-md text-red-600"
        onClick={handleAd}
      >
        X
      </button>
      <img
        src="https://unsplash.it/288/470"
        loading="lazy"
        alt="Adveretising"
      />
      <a
        className="absolute text-center bottom-0 bg-[#ffffff29] backdrop-blur-md w-full rounded-t-lg p-3"
        href="#"
        target="_blank"
      >
        🌐 رفتن به صفحه موردنظر
      </a>
    </div>
  );
}
