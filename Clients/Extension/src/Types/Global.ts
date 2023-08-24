import { JSX } from "preact";

export interface Main {
  internal?: {[key: string]: any};
  external?: { [key: string]: any }
}
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