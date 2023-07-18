export interface Advertising {
  image_url: string;
  target_url: string;
  language: string;
  showtime: number;
  expire: number;
  tpye: "banner" | "poster";
  visibility: boolean;
}
export default function Advertising({
  image_url,
  showtime,
  tpye,
  visibility,
}: Advertising) {
  function handleAd() {}
  if (tpye === "banner" && visibility) {
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
  } else if (tpye === "poster" && visibility) {
    return (
      <a href="" target="_blank">
        <img
          src="https://file3.soft98.ir/iranicard12.gif"
          loading="lazy"
          alt="Adveretising"
          class="m-auto w-full px-1 mt-1 rounded-lg"
        />
      </a>
    );
  }
  return null;
}
