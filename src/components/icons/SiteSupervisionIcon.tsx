import type { SVGProps } from "react";

export function SiteSupervisionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M20 12v.5a3.5 3.5 0 0 1-3.5 3.5h-1" />
      <path d="M4 12v.5A3.5 3.5 0 0 0 7.5 16h1" />
      <path d="M12 18v2" />
      <path d="M12 2a3 3 0 0 1 3 3v1a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
    </svg>
  )
}
