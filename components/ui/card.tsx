import type * as React from "react"

function Card({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`} {...props} />
}

function CardHeader({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`p-6 pb-4 ${className}`} {...props} />
}

function CardTitle({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`font-semibold text-lg ${className}`} {...props} />
}

function CardDescription({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`text-gray-600 text-sm ${className}`} {...props} />
}

function CardContent({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}

function CardFooter({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
