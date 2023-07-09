interface Toggle {
  Status: true | false;
  TextValue: string;
  directions?: "rtl" | "ltr";
}
export default function Toggle({
  Status,
  TextValue,
  directions = "rtl",
}: Toggle) {
  return (
    <div
      className={"mt-1 flex gap-x-2 dark:text-white px-2 " + (directions === "rtl" && "flex-row-reverse")}
    >
      <div class="w-12">
        <input className="hidden peer" id="cb2" type="checkbox" />
        <label
          className="peer-checked:peer-active:after:-ml-3 peer-checked:bg-green-500 peer-checked:after:left-1/2 after:transition-[left,padding,margin] after:ease-[cubic-bezier(0.175,0.885,0.32,1.275),ease,ease] after:duration-[0.3s,0.3s,0.3s] peer-active:after:pr-9 transition-[left,padding] duration-[0.4s] ease-in-out w-12 h-6 rounded-full after:rounded-full after:bg-white after:content-[''] after:block after:relative after:w-1/2 after:h-full absolute peer-checked:shadow-sm peer-checked:shadow-green-500 bg-red-700 shadow-sm shadow-red-500 cursor-pointer after:shadow-sm after:shadow-gray-500"
          for="cb2"
        ></label>
      </div>
      <span>{TextValue}</span>
    </div>
  );
}
