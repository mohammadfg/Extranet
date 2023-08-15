export interface Advertising {
  image_url: string;
  target_url: string;
  location: string;
  showtime: number;
  expire: number;
  message: string;
  tpye: "banner" | "poster";
  visibility: boolean;
}
export default function Advertising({ image_url, target_url, tpye, visibility, message }: Advertising) {
  function handleAd() { }
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
          src={image_url}
          loading="lazy"
          alt="Adveretising"
        />
        <a
          className="absolute text-center bottom-0 bg-[#ffffff29] backdrop-blur-md w-full rounded-t-lg p-3"
          href={target_url}
          target="_blank"
        >
          {message}
        </a>
      </div>
    );
  } else if (tpye === "poster" && visibility) {
    return (
      <a href={target_url} target="_blank">
        <img
          src={image_url}
          loading="lazy"
          alt="Adveretising"
          class="m-auto w-full px-1 mt-1 rounded-lg"
        />
      </a>
    );
  }
  return null;
}
