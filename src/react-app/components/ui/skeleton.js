import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/react-app/lib/utils";
function Skeleton({ className, ...props }) {
    return (_jsx("div", { "data-slot": "skeleton", className: cn("bg-muted rounded-xl animate-pulse", className), ...props }));
}
export { Skeleton };
