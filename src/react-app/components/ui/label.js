import { jsx as _jsx } from "react/jsx-runtime";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/react-app/lib/utils";
function Label({ className, ...props }) {
    return (_jsx(LabelPrimitive.Root, { "data-slot": "label", className: cn("gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed", className), ...props }));
}
export { Label };
