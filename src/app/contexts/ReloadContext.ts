import { createContext } from "react";

export interface ReloadProps {
    reload: boolean;
    setReload: (reload: boolean) => void;
}

export const ReloadContext = createContext<ReloadProps>({
    reload: false,
    setReload: () => {},
});
