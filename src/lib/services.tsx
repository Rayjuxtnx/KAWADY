import React from 'react';
import { FileText, SearchCheck, Replace, TestTube, CheckCheck, School, ShieldCheck, Warehouse } from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageId: string;
};

export const services: Service[] = [
  {
    title: 'WPS Development & Qualification',
    description: 'We design, write, and qualify custom Welding Procedure Specifications (WPS) for your projects, ensuring strong, compliant, and defect-free welds.',
    icon: <FileText className="w-8 h-8 text-accent" />,
    imageId: 'service-wps',
  },
  {
    title: 'Root Cause Failure Analysis',
    description: 'We conduct forensic metallurgical investigations to identify the exact cause of component failure and provide definitive solutions.',
    icon: <SearchCheck className="w-8 h-8 text-accent" />,
    imageId: 'service-failure-analysis',
  },
  {
    title: 'Material Selection & Substitution',
    description: 'We guide you in selecting the most cost-effective and appropriate grade of mild steel, or help you safely substitute materials.',
    icon: <Replace className="w-8 h-8 text-accent" />,
    imageId: 'service-material-selection',
  },
  {
    title: 'Fabrication Process Optimization',
    description: 'We analyze your workflows to identify bottlenecks, reduce waste, and lower production costs.',
    icon: <TestTube className="w-8 h-8 text-accent" />,
    imageId: 'project-1', // Placeholder
  },
  {
    title: 'On-Site Weld & Fabrication Audits',
    description: 'Our experts visit your facility to audit fabrication quality, verify compliance, and provide real-time corrective actions.',
    icon: <CheckCheck className="w-8 h-8 text-accent" />,
    imageId: 'project-2', // Placeholder
  },
  {
    title: 'Technical Staff Training',
    description: 'We offer customized training modules for your engineers and welders on mild steel properties and best practices.',
    icon: <School className="w-8 h-8 text-accent" />,
    imageId: 'project-3', // Placeholder
  },
  {
    title: 'Corrosion Prevention Strategy',
    description: 'We recommend durable and economical corrosion protection systems for your steel to significantly extend its service life.',
    icon: <ShieldCheck className="w-8 h-8 text-accent" />,
    imageId: 'project-4', // Placeholder
  },
  {
    title: 'Supplier Quality & Material Verification',
    description: 'We independently audit your material suppliers and conduct inspection tests to verify mild steel quality.',
    icon: <Warehouse className="w-8 h-8 text-accent" />,
    imageId: 'project-5', // Placeholder
  },
];
