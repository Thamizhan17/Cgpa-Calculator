import { jsx as _jsx } from "react/jsx-runtime";
import { Separator as SeparatorPrimitive } from "radix-ui";
import { cn } from "@/react-app/lib/utils";
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
    return (_jsx(SeparatorPrimitive.Root, { "data-slot": "separator", decorative: decorative, orientation: orientation, className: cn("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch", className), ...props }));
}
export { Separator };
