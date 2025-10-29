import type { SVGProps } from "react";

export function CostEstimationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.worg/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="12" x2="12" y1="10" y2="18" />
      <line x1="16" x2="8" y1="10" y2="10" />
      <line x1="16" x2="8" y1="14" y2="14" />
    </svg>
  )
}
