import * as React from 'react';
import { forwardRef, HTMLAttributes } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Check, ChevronDown, X } from 'lucide-react';

// 기본이 되는 타입 정의
type BaseProps = HTMLAttributes<HTMLElement> & {
  className?: string;
};

// 카드 컴포넌트
export const Card = forwardRef<HTMLDivElement, BaseProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, BaseProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, BaseProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardContent = forwardRef<HTMLDivElement, BaseProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
CardContent.displayName = 'CardContent';

// 선택 컴포넌트
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

// SelectTrigger 타입 정의
type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  className: string;
};

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className = '', children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={`flex h-10 items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className='h-4 w-4 opacity-50' />
    </SelectPrimitive.Trigger>
  ),
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  className?: string;
  position?: 'popper' | 'item-aligned';
};

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className = '', children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className='p-1'>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  className?: string;
};

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className = '', children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <Check className='h-4 w-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

// 대화상자 컴포넌트
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = DialogPrimitive.Overlay;

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  className?: string;
};

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay className='fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
      <DialogPrimitive.Content
        ref={ref}
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full ${className}`}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
          <X className='h-4 w-4' />
          <span className='sr-only'>닫기</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const DialogHeader = ({ className = '', ...props }: DialogHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  className?: string;
};

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
