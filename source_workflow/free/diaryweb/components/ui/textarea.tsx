import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-gray-200 placeholder:text-gray-400 focus-visible:border-pink-300 focus-visible:ring-pink-200/50 aria-invalid:ring-red-200/50 aria-invalid:border-red-400 flex field-sizing-content min-h-16 w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm shadow-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
