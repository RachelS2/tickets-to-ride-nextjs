import { cn } from "@/app/lib/utils";

type BordaDaCartaProps = {
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
  children?: React.ReactNode;
};

export const BordaDaCartaView = ({
  size = "md",
  orientacao = "vertical",
  children
}: BordaDaCartaProps) => {
  const ehHorizontal = orientacao === "horizontal";

  return (
  <div
    className={cn(
      "relative flex items-center justify-center bg-white p-1 shadow transition-all",
      ehHorizontal ? "aspect-[4/2.5]" : "aspect-[2.5/4]",
      size === "responsive" &&
        (ehHorizontal
          ? "w-[full] sm:w-[2rem] h-[3rem] md:w-[3rem] h-[4rem] lg:w-[4rem] h-[5rem] xl:w-[8rem]"
          : "w-[10vw] sm:w-[8vw] md:w-[6vw] lg:w-[5vw] xl:w-[4vw]")
    )}
  >
    {children}
  </div>
  )
 }