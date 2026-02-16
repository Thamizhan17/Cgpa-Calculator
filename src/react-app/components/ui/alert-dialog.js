import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { cn } from "@/react-app/lib/utils";
import { Button } from "@/react-app/components/ui/button";
function AlertDialog({ ...props }) {
    return _jsx(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({ ...props }) {
    return (_jsx(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props }));
}
function AlertDialogPortal({ ...props }) {
    return (_jsx(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props }));
}
function AlertDialogOverlay({ className, ...props }) {
    return (_jsx(AlertDialogPrimitive.Overlay, { "data-slot": "alert-dialog-overlay", className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-black/80 duration-100 supports-[backdrop-filter]:backdrop-blur-[2px] fixed inset-0 z-50", className), ...props }));
}
function AlertDialogContent({ className, size = "default", ...props }) {
    return (_jsxs(AlertDialogPortal, { children: [_jsx(AlertDialogOverlay, {}), _jsx(AlertDialogPrimitive.Content, { "data-slot": "alert-dialog-content", "data-size": size, className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 bg-background ring-foreground/5 gap-6 rounded-4xl p-6 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-md group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none", className), ...props })] }));
}
function AlertDialogHeader({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-dialog-header", className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-[[data-slot=alert-dialog-media]]:grid-rows-[auto_auto_1fr] has-[[data-slot=alert-dialog-media]]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-[[data-slot=alert-dialog-media]]:grid-rows-[auto_1fr]", className), ...props }));
}
function AlertDialogFooter({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-dialog-footer", className: cn("flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className), ...props }));
}
function AlertDialogMedia({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-dialog-media", className: cn("bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-full sm:group-data-[size=default]/alert-dialog-content:row-span-2 [&_svg:not([class*='size-'])]:size-8", className), ...props }));
}
function AlertDialogTitle({ className, ...props }) {
    return (_jsx(AlertDialogPrimitive.Title, { "data-slot": "alert-dialog-title", className: cn("text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-[[data-slot=alert-dialog-media]]/alert-dialog-content:col-start-2", className), ...props }));
}
function AlertDialogDescription({ className, ...props }) {
    return (_jsx(AlertDialogPrimitive.Description, { "data-slot": "alert-dialog-description", className: cn("text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-4", className), ...props }));
}
function AlertDialogAction({ className, variant = "default", size = "default", ...props }) {
    return (_jsx(Button, { variant: variant, size: size, asChild: true, children: _jsx(AlertDialogPrimitive.Action, { "data-slot": "alert-dialog-action", className: cn(className), ...props }) }));
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
    return (_jsx(Button, { variant: variant, size: size, asChild: true, children: _jsx(AlertDialogPrimitive.Cancel, { "data-slot": "alert-dialog-cancel", className: cn(className), ...props }) }));
}
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, };
