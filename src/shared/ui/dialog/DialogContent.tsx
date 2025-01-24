import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../../shared/lib/utils/cn";
import { dialogStyles } from "./Dialog.styles";
import { DialogContentProps } from "./Dialog.types";

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
 <DialogPrimitive.Portal>
   <DialogPrimitive.Overlay 
    ref={ref}
    className={cn(dialogStyles.overlay, className)}
    {...props}
  />
   <DialogPrimitive.Content
     ref={ref}
     className={cn(dialogStyles.content, className)}      
     {...props}
   >
     {children}
     <DialogPrimitive.Close className={cn(dialogStyles.close, className)}>
       <X className="h-4 w-4" />
       <span className="sr-only">닫기</span>
     </DialogPrimitive.Close>
   </DialogPrimitive.Content>
 </DialogPrimitive.Portal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;