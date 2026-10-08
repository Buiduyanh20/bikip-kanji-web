import { cn } from "@/lib/utils";

type PageContainerProps = React.ComponentProps<"div"> & {
  /** narrow: màn quiz/form · default: danh sách · wide: dashboard */
  size?: "narrow" | "default" | "wide";
};

const SIZE_CLASS = {
  narrow: "max-w-md",
  default: "max-w-2xl",
  wide: "max-w-4xl",
} as const;

export function PageContainer({
  size = "default",
  className,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 py-6 sm:px-6", SIZE_CLASS[size], className)}
      {...props}
    />
  );
}
