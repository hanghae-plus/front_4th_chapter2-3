type CardProps = React.ComponentProps<"div">;

export const Card = ({ className, ref, ...props }: CardProps) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
);

type CardHeaderProps = React.ComponentProps<"div">;

export const CardHeader = ({ className, ref, ...props }: CardHeaderProps) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

type CardTitle = React.ComponentProps<"h3">;

export const CardTitle = ({ className, ref, ...props }: CardTitle) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
);

type CardContentProps = React.ComponentProps<"div">;

export const CardContent = ({ className, ref, ...props }: CardContentProps) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
);
