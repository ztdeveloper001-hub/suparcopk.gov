
import { Language } from '../translations';

export interface Job {
  id: string;
  title: string;
  department: 'Engineering' | 'Space Operations' | 'Science' | 'Administration' | 'IT & Cyber';
  location: 'Karachi' | 'Islamabad' | 'Lahore' | 'Remote';
  type: 'Full-time' | 'Contract' | 'Internship';
  clearance: 'None' | 'Secret' | 'Top Secret';
  experience: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

const JOBS_DATA: Job[] = [
  {
    id: 'SUP-2024-001',
    title: 'Senior Flight Dynamics Engineer',
    department: 'Space Operations',
    location: 'Karachi',
    type: 'Full-time',
    clearance: 'Top Secret',
    experience: '7+ Years',
    salaryRange: 'Competitive Agency Grade 19',
    description: 'Lead orbital determination and maneuver planning for the PRSS-2 constellation. You will be responsible for precise trajectory modeling and collision avoidance protocols.',
    requirements: [
      'PhD/MS in Aerospace Engineering or Physics',
      'Expertise in GMAT or STK software suites',
      'Experience with LEO/GEO orbital mechanics',
      'Strong C++/Python skills for flight software optimization'
    ],
    postedDate: '2024-10-15'
  },
  {
    id: 'SUP-2024-002',
    title: 'Hyperspectral Data Scientist',
    department: 'Science',
    location: 'Islamabad',
    type: 'Full-time',
    clearance: 'Secret',
    experience: '3-5 Years',
    salaryRange: 'Grade 17/18',
    description: 'Analyze multispectral imagery from PRSS-1 to support national agricultural planning and disaster management. Develop ML models for automated crop classification.',
    requirements: [
      'MS in Remote Sensing, GIS, or Data Science',
      'Advanced knowledge of ENVI/ERDAS or Google Earth Engine',
      'Proven track record with TensorFlow/PyTorch',
      'Experience in environmental impact reporting'
    ],
    postedDate: '2024-10-20'
  },
  {
    id: 'SUP-2024-003',
    title: 'Satellite Cybersecurity Specialist',
    department: 'IT & Cyber',
    location: 'Karachi',
    type: 'Full-time',
    clearance: 'Top Secret',
    experience: '5+ Years',
    salaryRange: 'High Agency Tier',
    description: 'Defend national space assets from cyber threats. You will design secure uplink/downlink protocols and perform penetration testing on ground station infrastructure.',
    requirements: [
      'Bachelors in Computer Science or Cyber Security',
      'Certifications like CISSP or OSCP',
      'Knowledge of CCSDS protocol security standards',
      'Experience with encrypted telemetry handling'
    ],
    postedDate: '2024-10-22'
  },
  {
    id: 'SUP-2024-004',
    title: 'Propulsion Systems Technician',
    department: 'Engineering',
    location: 'Lahore',
    type: 'Full-time',
    clearance: 'Secret',
    experience: '2-4 Years',
    salaryRange: 'Technical Grade 16',
    description: 'Assist in the assembly and testing of sounding rocket motors and cold-gas thruster systems. Maintenance of high-pressure test stands.',
    requirements: [
      'DAE in Mechanical or Aerospace',
      'Hands-on experience with precision machining',
      'Knowledge of cryogenics and high-pressure safety',
      'Ability to read complex technical blueprints'
    ],
    postedDate: '2024-10-24'
  }
];

export const JobService = {
  getJobs: async (filters?: { department?: string; location?: string }): Promise<Job[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    let filtered = [...JOBS_DATA];
    if (filters?.department && filters.department !== 'All') {
      filtered = filtered.filter(j => j.department === filters.department);
    }
    if (filters?.location && filters.location !== 'All') {
      filtered = filtered.filter(j => j.location === filters.location);
    }
    return filtered;
  },

  getJobById: async (id: string): Promise<Job | undefined> => {
    return JOBS_DATA.find(j => j.id === id);
  },

  submitApplication: async (jobId: string, data: any): Promise<boolean> => {
    console.log(`Submitting application for ${jobId}:`, data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return true; // Simulate success
  }
};
