import { ModalProvider } from "@/contexts/modal";
import { Children } from "@/interfaces/children";

export default function Providers({ children }: Children) {
    return <ModalProvider>{children}</ModalProvider>;
}
