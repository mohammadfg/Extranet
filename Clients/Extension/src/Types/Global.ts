import type { Advertising as AdvertisingInterface } from "../Components/Advertising";
// import type { Server, ServerConfig } from "../Context/Main";
import { JSX } from "preact";

export interface Main {
  [key: string]: any,
}
// export interface Main {
//   theme: "dark" | "light";
//   language: "fa" | "en";
//   advertising: Array<AdvertisingInterface>;
//   proxylist: Server<Array<ServerConfig>>;
// }
export interface Props {
  // [key: string]:T;
  children?: JSX.Element | JSX.Element[];
  // any props that come into the component
}
export interface Dropdown extends Props {
  visibility: boolean;
  animations?: "slide" | "scale";
  callbackEvent: (input: boolean) => void;
  closer?: boolean
}