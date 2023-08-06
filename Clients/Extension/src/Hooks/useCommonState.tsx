import { useState, useEffect } from "preact/hooks";
import type { Main } from "../Types/Global";

export default function useCommonState() {
    const [state, setState] = useState<Main>({});
    function syncStateWithStorage(key: string, values: any) {
        setState((latest) => ({ ...latest, [key]: values }));
        chrome.storage.local.set(state);
    }
    useEffect(() => {
        storage.local.get((items) => { setState(items) });
    }, [])
    return [state, syncStateWithStorage];
}
