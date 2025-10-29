import React from 'react';
import { ProjectManagementIcon } from '@/components/icons/ProjectManagementIcon';
import { CostEstimationIcon } from '@/components/icons/CostEstimationIcon';
import { StructuralConsultancyIcon } from '@/components/icons/StructuralConsultancyIcon';
import { SiteSupervisionIcon } from '@/components/icons/SiteSupervisionIcon';
import { FeasibilityStudiesIcon } from '@/components/icons/FeasibilityStudiesIcon';
import { BuildingIcon } from '@/components/icons/BuildingIcon';

export type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const services: Service[] = [
  {
    title: 'Project Management',
    description: 'Expert oversight from initiation to completion, ensuring your project is delivered on time, within budget, and to the highest quality standards.',
    icon: <ProjectManagementIcon className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Cost Estimation',
    description: 'Accurate and detailed cost assessments to provide you with a realistic budget, helping you make informed financial decisions.',
    icon: <CostEstimationIcon className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Structural Consultancy',
    description: 'Innovative and efficient structural design solutions that ensure the safety, stability, and longevity of your building projects.',
    icon: <StructuralConsultancyIcon className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Site Supervision',
    description: 'Diligent on-site monitoring to guarantee that construction aligns with design specifications, quality benchmarks, and safety regulations.',
    icon: <SiteSupervisionIcon className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Feasibility Studies',
    description: 'Comprehensive analysis of project viability, covering technical, economic, and legal aspects to mitigate risks before investment.',
    icon: <FeasibilityStudiesIcon className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Architectural Design',
    description: 'Creative and functional architectural planning that balances aesthetic appeal with practical usability for your space.',
    icon: <BuildingIcon className="w-8 h-8 text-accent" />,
  },
];
