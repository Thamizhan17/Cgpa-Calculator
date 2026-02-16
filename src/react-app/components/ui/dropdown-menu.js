import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cn } from "@/react-app/lib/utils";
import { Check, ChevronRight } from "lucide-react";
function DropdownMenu({ ...props }) {
    return _jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuPortal({ ...props }) {
    return (_jsx(DropdownMenuPrimitive.Portal, { "data-slot": "dropdown-menu-portal", ...props }));
}
function DropdownMenuTrigger({ ...props }) {
    return (_jsx(DropdownMenuPrimitive.Trigger, { "data-slot": "dropdown-menu-trigger", ...props }));
}
function DropdownMenuContent({ className, align = "start", sideOffset = 4, ...props }) {
    return (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.Content, { "data-slot": "dropdown-menu-content", sideOffset: sideOffset, align: align, className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/5 bg-popover text-popover-foreground min-w-48 rounded-2xl p-1 shadow-2xl ring-1 duration-100 z-50 max-h-[--radix-dropdown-menu-content-available-height] w-[--radix-dropdown-menu-trigger-width] origin-[--radix-dropdown-menu-content-transform-origin] overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden", className), ...props }) }));
}
function DropdownMenuGroup({ ...props }) {
    return (_jsx(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props }));
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
    return (_jsx(DropdownMenuPrimitive.Item, { "data-slot": "dropdown-menu-item", "data-inset": inset, "data-variant": variant, className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:[&_svg]:text-destructive gap-2.5 rounded-xl px-3 py-2 text-sm [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props }));
}
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    return (_jsxs(DropdownMenuPrimitive.CheckboxItem, { "data-slot": "dropdown-menu-checkbox-item", className: cn("focus:bg-accent focus:text-accent-foreground focus:[&_*]:text-accent-foreground gap-2.5 rounded-xl py-2 pr-8 pl-3 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), checked: checked, ...props, children: [_jsx("span", { className: "pointer-events-none absolute right-2 flex items-center justify-center pointer-events-none", "data-slot": "dropdown-menu-checkbox-item-indicator", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(Check, {}) }) }), children] }));
}
function DropdownMenuRadioGroup({ ...props }) {
    return (_jsx(DropdownMenuPrimitive.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...props }));
}
function DropdownMenuRadioItem({ className, children, ...props }) {
    return (_jsxs(DropdownMenuPrimitive.RadioItem, { "data-slot": "dropdown-menu-radio-item", className: cn("focus:bg-accent focus:text-accent-foreground focus:[&_*]:text-accent-foreground gap-2.5 rounded-xl py-2 pr-8 pl-3 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute right-2 flex items-center justify-center pointer-events-none", "data-slot": "dropdown-menu-radio-item-indicator", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(Check, {}) }) }), children] }));
}
function DropdownMenuLabel({ className, inset, ...props }) {
    return (_jsx(DropdownMenuPrimitive.Label, { "data-slot": "dropdown-menu-label", "data-inset": inset, className: cn("text-muted-foreground px-3 py-2.5 text-xs data-[inset]:pl-8", className), ...props }));
}
function DropdownMenuSeparator({ className, ...props }) {
    return (_jsx(DropdownMenuPrimitive.Separator, { "data-slot": "dropdown-menu-separator", className: cn("bg-border/50 -mx-1 my-1 h-px", className), ...props }));
}
function DropdownMenuShortcut({ className, ...props }) {
    return (_jsx("span", { "data-slot": "dropdown-menu-shortcut", className: cn("text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest", className), ...props }));
}
function DropdownMenuSub({ ...props }) {
    return _jsx(DropdownMenuPrimitive.Sub, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return (_jsxs(DropdownMenuPrimitive.SubTrigger, { "data-slot": "dropdown-menu-sub-trigger", "data-inset": inset, className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground gap-2 rounded-xl px-3 py-2 text-sm [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-none select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props, children: [children, _jsx(ChevronRight, { className: "ml-auto" })] }));
}
function DropdownMenuSubContent({ className, ...props }) {
    return (_jsx(DropdownMenuPrimitive.SubContent, { "data-slot": "dropdown-menu-sub-content", className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/5 bg-popover text-popover-foreground min-w-36 rounded-2xl p-1 shadow-2xl ring-1 duration-100 z-50 origin-[--radix-dropdown-menu-content-transform-origin] overflow-hidden", className), ...props }));
}
export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };
