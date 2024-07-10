"use client";
import { usePathname } from "next/navigation";
import { STEPS } from "@/constants/steps";
import { cn } from "@/lib/utils";

const Steps = () => {
  const pathname = usePathname();
  return (
    <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
      {STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url),
        );
        const imgPath = `/snake-${i + 1}.png`;
        return (
          <li key={step.name} className="relative overflow-hidden lg:flex-1">
            <div>
              <span
                className={cn(
                  "absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
                  {
                    "bg-zinc-700": isCurrent,
                    "bg-primary": isCompleted,
                  },
                )}
                aria-hidden="true"
              ></span>
              <span
                className={cn(
                  i !== 0 ? "lg:pl-9" : "",
                  "flex items-center px-6 py-4 text-sm font-medium",
                )}
              >
                <span className="flex-shrink-0">
                  <img
                    src={imgPath}
                    alt={step.name}
                    className={cn("h-20 w-20 object-contain")}
                  />
                </span>
                <span className="ml-4 h-full flex min-w-0 flex-col mt-0.5 justify-center">
                  <span
                    className={cn("text-sm font-semibold text-zinc-700", {
                      "text-primary": isCompleted,
                      "text-zinc-700": isCurrent,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {step.description}
                  </span>
                </span>
              </span>
              {/*separator*/}
              {i > 0 && (
                <div className="absolute inset-0 hidden w-3 lg:block">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 12 82"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0.5 0V31L10.5 41L0.5 51V82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
