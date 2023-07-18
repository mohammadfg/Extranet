import { JSX, createContext } from "preact";
import { useState } from "preact/hooks";

interface Props {
  children?: JSX.Element | JSX.Element[];
  // any props that come into the component
}
export interface CountryLists {
  displayName: string;
  rtl: boolean;
  language: string;
}
export interface ServerConfig {
    scheme: string;
    host: string;
    username: string;
    password: string;
    port: number;
    type: string;
}
export interface Server<T> {
  [key: string]: T;
}
/*
//  handleVisiblity sending in each request . for use this method in other place please set defult value
//  handleVisiblity is optionaly because if not optionaly, you required call it in other place
//  mabye in after updates change this structure
*/
export interface Context {
  dropdown: {
    dataSheet: Server<CountryLists> | Server<Array<ServerConfig>> | {};
    visibility: boolean;
  };
  handleVisiblity?: (parameter: Context) => void;
}

let contextData: Context = { dropdown: { visibility: false, dataSheet: {} } };
export const Context = createContext(contextData);

export function ContextContoroler({ children }: Props) {
  const [state, setState] = useState(contextData);
  function handleVisiblity(dataSheet: Context) {
    setState((latest) => ({
      ...latest,
      ...dataSheet,
    }));
  }
  return (
    <Context.Provider value={{ ...state, handleVisiblity }}>
      {children}
    </Context.Provider>
  );
}
