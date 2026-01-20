import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-400 selection:bg-pink-200 selection:text-gray-900 border-gray-200 h-10 w-full min-w-0 rounded-xl border bg-gray-50 px-4 py-2 text-sm shadow-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-pink-300 focus-visible:ring-pink-200/50 focus-visible:ring-[3px] focus-visible:bg-white",
        "aria-invalid:ring-red-200/50 aria-invalid:border-red-400",
        className
      )}
      {...props}
    />
  )
}

export { Input }
