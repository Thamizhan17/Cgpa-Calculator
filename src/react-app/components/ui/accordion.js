import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "@/react-app/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
function Accordion({ className, ...props }) {
    return (_jsx(AccordionPrimitive.Root, { "data-slot": "accordion", className: cn("overflow-hidden rounded-2xl border flex w-full flex-col", className), ...props }));
}
function AccordionItem({ className, ...props }) {
    return (_jsx(AccordionPrimitive.Item, { "data-slot": "accordion-item", className: cn("data-[state=open]:bg-muted/50 [&:not(:last-child)]:border-b", className), ...props }));
}
function AccordionTrigger({ className, children, ...props }) {
    return (_jsx(AccordionPrimitive.Header, { className: "flex", children: _jsxs(AccordionPrimitive.Trigger, { "data-slot": "accordion-trigger", className: cn("[&_[data-slot=accordion-trigger-icon]]:text-muted-foreground gap-6 p-4 text-left text-sm font-medium hover:underline [&_[data-slot=accordion-trigger-icon]]:ml-auto [&_[data-slot=accordion-trigger-icon]]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50", className), ...props, children: [children, _jsx(ChevronDown, { "data-slot": "accordion-trigger-icon", className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" }), _jsx(ChevronUp, { "data-slot": "accordion-trigger-icon", className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" })] }) }));
}
function AccordionContent({ className, children, ...props }) {
    return (_jsx(AccordionPrimitive.Content, { "data-slot": "accordion-content", className: "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up px-4 text-sm overflow-hidden", ...props, children: _jsx("div", { className: cn("pt-0 pb-4 [&_a]:hover:text-foreground h-[--radix-accordion-content-height] [&_a]:underline [&_a]:underline-offset-4 [&_p:not(:last-child)]:mb-4", className), children: children }) }));
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
