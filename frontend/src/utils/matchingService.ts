// Matching Service for calculating candidate compatibility
export interface JobRequirements {
  role: string;
  requiredSkills: string[];
  experienceLevel: string;
  preferredSkills?: string[];
}

export interface MatchResult {
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
  roleScore: number;
  breakdown: {
    matchedSkills: string[];
    missingSkills: string[];
    experienceMatch: boolean;
    roleMatch: boolean;
  };
}

// Define skill categories and their relationships
const SKILL_CATEGORIES = {
  frontend: ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'tailwind', 'bootstrap', 'sass', 'next.js', 'nuxt.js'],
  backend: ['node.js', 'express', 'python', 'django', 'flask', 'java', 'spring', 'spring boot', 'php', 'laravel', 'ruby', 'rails', '.net', 'c#'],
  database: ['mongodb', 'mysql', 'postgresql', 'redis', 'sqlite', 'firebase', 'dynamodb', 'cassandra'],
  cloud: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'heroku', 'vercel', 'netlify'],
  tools: ['git', 'github', 'gitlab', 'jenkins', 'travis', 'circleci', 'webpack', 'vite', 'babel'],
  mobile: ['react native', 'flutter', 'ionic', 'xamarin', 'swift', 'kotlin', 'android', 'ios']
};

// Comprehensive role-based skill requirements for all available roles
const ROLE_REQUIREMENTS: Record<string, JobRequirements> = {
  // Engineering / Development
  'Frontend Developer': {
    role: 'Frontend Developer',
    requiredSkills: ['javascript', 'html', 'css', 'react', 'git'],
    experienceLevel: 'mid',
    preferredSkills: ['typescript', 'vue', 'angular', 'sass', 'webpack', 'tailwind']
  },
  'Backend Developer': {
    role: 'Backend Developer',
    requiredSkills: ['node.js', 'api', 'database', 'git', 'rest'],
    experienceLevel: 'mid',
    preferredSkills: ['python', 'java', 'mongodb', 'postgresql', 'docker', 'aws']
  },
  'Full Stack Developer': {
    role: 'Full Stack Developer',
    requiredSkills: ['javascript', 'react', 'node.js', 'database', 'git'],
    experienceLevel: 'mid',
    preferredSkills: ['typescript', 'mongodb', 'aws', 'docker', 'express', 'next.js']
  },
  'Mobile App Developer': {
    role: 'Mobile App Developer',
    requiredSkills: ['mobile development', 'react native', 'javascript', 'git'],
    experienceLevel: 'mid',
    preferredSkills: ['flutter', 'swift', 'kotlin', 'firebase', 'app store', 'android studio']
  },
  'Software Engineer': {
    role: 'Software Engineer',
    requiredSkills: ['programming', 'algorithms', 'data structures', 'git', 'testing'],
    experienceLevel: 'mid',
    preferredSkills: ['java', 'python', 'c++', 'system design', 'agile', 'ci/cd']
  },
  'DevOps Engineer': {
    role: 'DevOps Engineer',
    requiredSkills: ['aws', 'docker', 'kubernetes', 'linux', 'ci/cd'],
    experienceLevel: 'senior',
    preferredSkills: ['jenkins', 'terraform', 'ansible', 'monitoring', 'bash', 'python']
  },
  'Cloud Engineer': {
    role: 'Cloud Engineer',
    requiredSkills: ['aws', 'cloud architecture', 'terraform', 'docker', 'networking'],
    experienceLevel: 'mid',
    preferredSkills: ['azure', 'gcp', 'kubernetes', 'serverless', 'security', 'monitoring']
  },
  'Site Reliability Engineer': {
    role: 'Site Reliability Engineer',
    requiredSkills: ['monitoring', 'incident response', 'automation', 'linux', 'scripting'],
    experienceLevel: 'senior',
    preferredSkills: ['prometheus', 'grafana', 'kubernetes', 'python', 'go', 'elasticsearch']
  },
  'Embedded Systems Engineer': {
    role: 'Embedded Systems Engineer',
    requiredSkills: ['c', 'c++', 'microcontrollers', 'embedded systems', 'hardware'],
    experienceLevel: 'mid',
    preferredSkills: ['rtos', 'arm', 'iot', 'sensors', 'protocols', 'debugging']
  },
  'Firmware Developer': {
    role: 'Firmware Developer',
    requiredSkills: ['c', 'assembly', 'microcontrollers', 'debugging', 'hardware'],
    experienceLevel: 'mid',
    preferredSkills: ['rtos', 'bootloaders', 'drivers', 'protocols', 'testing', 'optimization']
  },
  'Game Developer': {
    role: 'Game Developer',
    requiredSkills: ['game development', 'unity', 'c#', 'game design', 'programming'],
    experienceLevel: 'mid',
    preferredSkills: ['unreal engine', 'c++', '3d graphics', 'physics', 'optimization', 'mobile games']
  },
  'Security Engineer': {
    role: 'Security Engineer',
    requiredSkills: ['cybersecurity', 'network security', 'vulnerability assessment', 'incident response'],
    experienceLevel: 'senior',
    preferredSkills: ['penetration testing', 'siem', 'encryption', 'compliance', 'forensics', 'python']
  },
  'Blockchain Developer': {
    role: 'Blockchain Developer',
    requiredSkills: ['blockchain', 'solidity', 'smart contracts', 'web3', 'cryptocurrency'],
    experienceLevel: 'mid',
    preferredSkills: ['ethereum', 'bitcoin', 'defi', 'nft', 'rust', 'javascript']
  },
  'AR/VR Developer': {
    role: 'AR/VR Developer',
    requiredSkills: ['ar/vr', 'unity', 'c#', '3d graphics', 'spatial computing'],
    experienceLevel: 'mid',
    preferredSkills: ['oculus', 'hololens', 'unreal engine', 'webxr', 'mobile ar', 'computer vision']
  },
  'QA Engineer': {
    role: 'QA Engineer',
    requiredSkills: ['testing', 'quality assurance', 'test planning', 'bug tracking', 'manual testing'],
    experienceLevel: 'mid',
    preferredSkills: ['automation testing', 'selenium', 'api testing', 'performance testing', 'agile', 'jira']
  },
  'Test Automation Engineer': {
    role: 'Test Automation Engineer',
    requiredSkills: ['test automation', 'selenium', 'programming', 'testing frameworks', 'ci/cd'],
    experienceLevel: 'mid',
    preferredSkills: ['python', 'java', 'api testing', 'performance testing', 'docker', 'jenkins']
  },

  // Data & AI
  'Data Scientist': {
    role: 'Data Scientist',
    requiredSkills: ['python', 'machine learning', 'statistics', 'pandas', 'numpy'],
    experienceLevel: 'mid',
    preferredSkills: ['tensorflow', 'pytorch', 'r', 'sql', 'jupyter', 'scikit-learn']
  },
  'Data Analyst': {
    role: 'Data Analyst',
    requiredSkills: ['sql', 'excel', 'data analysis', 'statistics', 'data visualization'],
    experienceLevel: 'mid',
    preferredSkills: ['python', 'r', 'tableau', 'power bi', 'pandas', 'business intelligence']
  },
  'Business Intelligence Analyst': {
    role: 'Business Intelligence Analyst',
    requiredSkills: ['sql', 'data analysis', 'business intelligence', 'reporting', 'excel'],
    experienceLevel: 'mid',
    preferredSkills: ['tableau', 'power bi', 'data warehouse', 'etl', 'analytics', 'dashboard']
  },
  'Data Engineer': {
    role: 'Data Engineer',
    requiredSkills: ['python', 'sql', 'etl', 'data pipeline', 'database'],
    experienceLevel: 'mid',
    preferredSkills: ['spark', 'kafka', 'airflow', 'aws', 'hadoop', 'scala']
  },
  'Big Data Engineer': {
    role: 'Big Data Engineer',
    requiredSkills: ['hadoop', 'spark', 'scala', 'big data', 'distributed systems'],
    experienceLevel: 'senior',
    preferredSkills: ['kafka', 'hive', 'hdfs', 'yarn', 'elasticsearch', 'nosql']
  },
  'Data Architect': {
    role: 'Data Architect',
    requiredSkills: ['data architecture', 'database design', 'data modeling', 'sql', 'etl'],
    experienceLevel: 'senior',
    preferredSkills: ['data warehouse', 'cloud platforms', 'big data', 'governance', 'security', 'analytics']
  },
  'Machine Learning Engineer': {
    role: 'Machine Learning Engineer',
    requiredSkills: ['machine learning', 'python', 'tensorflow', 'model deployment', 'algorithms'],
    experienceLevel: 'mid',
    preferredSkills: ['pytorch', 'kubernetes', 'mlops', 'cloud platforms', 'deep learning', 'statistics']
  },
  'AI Engineer': {
    role: 'AI Engineer',
    requiredSkills: ['artificial intelligence', 'machine learning', 'deep learning', 'python', 'algorithms'],
    experienceLevel: 'mid',
    preferredSkills: ['tensorflow', 'pytorch', 'computer vision', 'nlp', 'neural networks', 'cloud ai']
  },
  'AI Researcher': {
    role: 'AI Researcher',
    requiredSkills: ['research', 'machine learning', 'deep learning', 'mathematics', 'publications'],
    experienceLevel: 'senior',
    preferredSkills: ['phd', 'neural networks', 'computer vision', 'nlp', 'pytorch', 'academic writing']
  },
  'NLP Engineer': {
    role: 'NLP Engineer',
    requiredSkills: ['nlp', 'natural language processing', 'python', 'machine learning', 'linguistics'],
    experienceLevel: 'mid',
    preferredSkills: ['transformers', 'bert', 'spacy', 'nltk', 'tensorflow', 'text mining']
  },
  'Computer Vision Engineer': {
    role: 'Computer Vision Engineer',
    requiredSkills: ['computer vision', 'opencv', 'python', 'image processing', 'deep learning'],
    experienceLevel: 'mid',
    preferredSkills: ['tensorflow', 'pytorch', 'cnn', 'object detection', 'image recognition', 'cuda']
  },
  'Statistician': {
    role: 'Statistician',
    requiredSkills: ['statistics', 'r', 'statistical analysis', 'mathematics', 'data analysis'],
    experienceLevel: 'mid',
    preferredSkills: ['python', 'sas', 'spss', 'experimental design', 'hypothesis testing', 'modeling']
  },

  // Product & Design
  'Product Manager': {
    role: 'Product Manager',
    requiredSkills: ['product management', 'roadmap planning', 'stakeholder management', 'analytics', 'strategy'],
    experienceLevel: 'mid',
    preferredSkills: ['agile', 'scrum', 'user research', 'a/b testing', 'sql', 'wireframing']
  },
  'Technical Product Manager': {
    role: 'Technical Product Manager',
    requiredSkills: ['product management', 'technical knowledge', 'api design', 'system architecture', 'engineering'],
    experienceLevel: 'senior',
    preferredSkills: ['programming', 'database', 'cloud platforms', 'microservices', 'devops', 'security']
  },
  'Product Owner': {
    role: 'Product Owner',
    requiredSkills: ['product ownership', 'agile', 'scrum', 'user stories', 'backlog management'],
    experienceLevel: 'mid',
    preferredSkills: ['stakeholder management', 'user research', 'analytics', 'wireframing', 'business analysis']
  },
  'UX Designer': {
    role: 'UX Designer',
    requiredSkills: ['ux design', 'user research', 'wireframing', 'prototyping', 'usability testing'],
    experienceLevel: 'mid',
    preferredSkills: ['figma', 'sketch', 'adobe xd', 'user personas', 'information architecture', 'design thinking']
  },
  'UI Designer': {
    role: 'UI Designer',
    requiredSkills: ['ui design', 'visual design', 'figma', 'prototyping', 'design systems'],
    experienceLevel: 'mid',
    preferredSkills: ['sketch', 'adobe creative suite', 'typography', 'color theory', 'responsive design', 'css']
  },
  'UX Researcher': {
    role: 'UX Researcher',
    requiredSkills: ['user research', 'usability testing', 'data analysis', 'research methods', 'psychology'],
    experienceLevel: 'mid',
    preferredSkills: ['survey design', 'interview techniques', 'analytics', 'statistics', 'personas', 'journey mapping']
  },
  'Design Lead': {
    role: 'Design Lead',
    requiredSkills: ['design leadership', 'team management', 'design strategy', 'mentoring', 'design systems'],
    experienceLevel: 'senior',
    preferredSkills: ['ux/ui design', 'stakeholder management', 'design thinking', 'cross-functional collaboration', 'hiring']
  },
  'Graphic Designer': {
    role: 'Graphic Designer',
    requiredSkills: ['graphic design', 'adobe creative suite', 'typography', 'branding', 'visual communication'],
    experienceLevel: 'mid',
    preferredSkills: ['illustrator', 'photoshop', 'indesign', 'print design', 'web design', 'logo design']
  },
  'Motion Designer': {
    role: 'Motion Designer',
    requiredSkills: ['motion graphics', 'after effects', 'animation', 'video editing', 'visual storytelling'],
    experienceLevel: 'mid',
    preferredSkills: ['cinema 4d', 'premiere pro', '3d animation', 'compositing', 'sound design', 'creative direction']
  },
  'Interaction Designer': {
    role: 'Interaction Designer',
    requiredSkills: ['interaction design', 'prototyping', 'user flows', 'usability', 'design patterns'],
    experienceLevel: 'mid',
    preferredSkills: ['figma', 'principle', 'framer', 'micro-interactions', 'accessibility', 'user testing']
  },

  // Marketing & Growth
  'Marketing Manager': {
    role: 'Marketing Manager',
    requiredSkills: ['marketing strategy', 'campaign management', 'analytics', 'brand management', 'digital marketing'],
    experienceLevel: 'mid',
    preferredSkills: ['google analytics', 'social media', 'content marketing', 'seo', 'email marketing', 'budget management']
  },
  'Digital Marketing Specialist': {
    role: 'Digital Marketing Specialist',
    requiredSkills: ['digital marketing', 'google ads', 'facebook ads', 'analytics', 'seo'],
    experienceLevel: 'mid',
    preferredSkills: ['content marketing', 'email marketing', 'conversion optimization', 'social media', 'marketing automation']
  },
  'Growth Hacker': {
    role: 'Growth Hacker',
    requiredSkills: ['growth hacking', 'analytics', 'a/b testing', 'user acquisition', 'data analysis'],
    experienceLevel: 'mid',
    preferredSkills: ['sql', 'python', 'marketing automation', 'conversion optimization', 'viral marketing', 'retention']
  },
  'SEO Specialist': {
    role: 'SEO Specialist',
    requiredSkills: ['seo', 'keyword research', 'on-page optimization', 'link building', 'analytics'],
    experienceLevel: 'mid',
    preferredSkills: ['technical seo', 'content optimization', 'google search console', 'semrush', 'ahrefs', 'local seo']
  },
  'Content Writer': {
    role: 'Content Writer',
    requiredSkills: ['content writing', 'copywriting', 'seo writing', 'research', 'editing'],
    experienceLevel: 'mid',
    preferredSkills: ['content strategy', 'blogging', 'social media writing', 'email copy', 'wordpress', 'cms']
  },
  'Content Strategist': {
    role: 'Content Strategist',
    requiredSkills: ['content strategy', 'content planning', 'editorial calendar', 'brand voice', 'analytics'],
    experienceLevel: 'mid',
    preferredSkills: ['seo', 'content marketing', 'social media strategy', 'user research', 'project management']
  },
  'Brand Manager': {
    role: 'Brand Manager',
    requiredSkills: ['brand management', 'brand strategy', 'marketing campaigns', 'brand positioning', 'market research'],
    experienceLevel: 'mid',
    preferredSkills: ['creative direction', 'digital marketing', 'public relations', 'budget management', 'stakeholder management']
  },
  'Social Media Manager': {
    role: 'Social Media Manager',
    requiredSkills: ['social media marketing', 'content creation', 'community management', 'social media strategy', 'analytics'],
    experienceLevel: 'mid',
    preferredSkills: ['paid social advertising', 'influencer marketing', 'video content', 'graphic design', 'social listening']
  },
  'Email Marketing Specialist': {
    role: 'Email Marketing Specialist',
    requiredSkills: ['email marketing', 'marketing automation', 'campaign management', 'analytics', 'a/b testing'],
    experienceLevel: 'mid',
    preferredSkills: ['mailchimp', 'hubspot', 'segmentation', 'personalization', 'deliverability', 'html/css']
  },
  'Product Marketing Manager': {
    role: 'Product Marketing Manager',
    requiredSkills: ['product marketing', 'go-to-market strategy', 'messaging', 'competitive analysis', 'sales enablement'],
    experienceLevel: 'mid',
    preferredSkills: ['product management', 'content marketing', 'customer research', 'pricing strategy', 'launch management']
  },
  'Performance Marketer': {
    role: 'Performance Marketer',
    requiredSkills: ['performance marketing', 'paid advertising', 'conversion optimization', 'analytics', 'roi analysis'],
    experienceLevel: 'mid',
    preferredSkills: ['google ads', 'facebook ads', 'programmatic advertising', 'attribution modeling', 'marketing mix modeling']
  },
  'PR Manager': {
    role: 'PR Manager',
    requiredSkills: ['public relations', 'media relations', 'press releases', 'crisis communication', 'brand reputation'],
    experienceLevel: 'mid',
    preferredSkills: ['media outreach', 'event management', 'social media', 'content creation', 'stakeholder management']
  },

  // Sales & Customer
  'Sales Executive': {
    role: 'Sales Executive',
    requiredSkills: ['sales', 'lead generation', 'customer relationship management', 'negotiation', 'closing'],
    experienceLevel: 'mid',
    preferredSkills: ['crm software', 'sales process', 'account management', 'prospecting', 'presentation skills']
  },
  'Sales Manager': {
    role: 'Sales Manager',
    requiredSkills: ['sales management', 'team leadership', 'sales strategy', 'coaching', 'performance management'],
    experienceLevel: 'senior',
    preferredSkills: ['sales forecasting', 'territory management', 'pipeline management', 'hiring', 'training']
  },
  'Account Executive': {
    role: 'Account Executive',
    requiredSkills: ['account management', 'sales', 'client relationships', 'business development', 'negotiation'],
    experienceLevel: 'mid',
    preferredSkills: ['crm', 'upselling', 'cross-selling', 'contract negotiation', 'customer success']
  },
  'Account Manager': {
    role: 'Account Manager',
    requiredSkills: ['account management', 'customer relationships', 'client retention', 'upselling', 'project management'],
    experienceLevel: 'mid',
    preferredSkills: ['customer success', 'cross-selling', 'contract management', 'stakeholder management', 'problem solving']
  },
  'Business Development Executive': {
    role: 'Business Development Executive',
    requiredSkills: ['business development', 'partnership development', 'market research', 'lead generation', 'networking'],
    experienceLevel: 'mid',
    preferredSkills: ['sales strategy', 'relationship building', 'proposal writing', 'market analysis', 'strategic planning']
  },
  'Lead Generation Specialist': {
    role: 'Lead Generation Specialist',
    requiredSkills: ['lead generation', 'prospecting', 'cold outreach', 'qualification', 'crm'],
    experienceLevel: 'mid',
    preferredSkills: ['email marketing', 'social selling', 'research skills', 'data analysis', 'sales automation']
  },
  'Customer Success Manager': {
    role: 'Customer Success Manager',
    requiredSkills: ['customer success', 'account management', 'relationship building', 'problem solving', 'retention'],
    experienceLevel: 'mid',
    preferredSkills: ['upselling', 'customer onboarding', 'data analysis', 'project management', 'communication']
  },
  'Customer Support Specialist': {
    role: 'Customer Support Specialist',
    requiredSkills: ['customer support', 'problem solving', 'communication', 'ticketing systems', 'product knowledge'],
    experienceLevel: 'junior',
    preferredSkills: ['technical troubleshooting', 'documentation', 'empathy', 'multitasking', 'crm']
  },
  'Inside Sales Representative': {
    role: 'Inside Sales Representative',
    requiredSkills: ['inside sales', 'phone sales', 'lead qualification', 'crm', 'sales process'],
    experienceLevel: 'junior',
    preferredSkills: ['cold calling', 'email outreach', 'sales scripts', 'objection handling', 'pipeline management']
  },
  'Field Sales Representative': {
    role: 'Field Sales Representative',
    requiredSkills: ['field sales', 'territory management', 'client meetings', 'relationship building', 'travel'],
    experienceLevel: 'mid',
    preferredSkills: ['presentation skills', 'negotiation', 'account planning', 'market knowledge', 'crm']
  },

  // HR & People
  'HR Manager': {
    role: 'HR Manager',
    requiredSkills: ['human resources', 'employee relations', 'recruitment', 'performance management', 'hr policies'],
    experienceLevel: 'mid',
    preferredSkills: ['hris', 'compensation', 'benefits', 'training', 'compliance', 'labor law']
  },
  'Recruiter': {
    role: 'Recruiter',
    requiredSkills: ['recruitment', 'talent acquisition', 'interviewing', 'candidate sourcing', 'ats'],
    experienceLevel: 'mid',
    preferredSkills: ['boolean search', 'linkedin recruiting', 'employer branding', 'candidate experience', 'diversity hiring']
  },
  'Technical Recruiter': {
    role: 'Technical Recruiter',
    requiredSkills: ['technical recruiting', 'tech talent acquisition', 'technical screening', 'programming knowledge', 'ats'],
    experienceLevel: 'mid',
    preferredSkills: ['coding assessment', 'github', 'stack overflow', 'technical interviewing', 'developer communities']
  },
  'Talent Acquisition Specialist': {
    role: 'Talent Acquisition Specialist',
    requiredSkills: ['talent acquisition', 'recruitment strategy', 'candidate sourcing', 'employer branding', 'recruitment metrics'],
    experienceLevel: 'mid',
    preferredSkills: ['ats', 'crm', 'social recruiting', 'diversity hiring', 'talent pipeline', 'recruitment marketing']
  },
  'HR Business Partner': {
    role: 'HR Business Partner',
    requiredSkills: ['hr business partnering', 'strategic hr', 'change management', 'organizational development', 'stakeholder management'],
    experienceLevel: 'senior',
    preferredSkills: ['consulting', 'leadership coaching', 'talent management', 'succession planning', 'culture transformation']
  },
  'HR Generalist': {
    role: 'HR Generalist',
    requiredSkills: ['human resources', 'recruitment', 'employee relations', 'hr administration', 'compliance'],
    experienceLevel: 'mid',
    preferredSkills: ['hris', 'payroll', 'benefits administration', 'training coordination', 'policy development']
  },
  'HR Coordinator': {
    role: 'HR Coordinator',
    requiredSkills: ['hr administration', 'employee onboarding', 'record keeping', 'scheduling', 'communication'],
    experienceLevel: 'junior',
    preferredSkills: ['hris', 'filing systems', 'event coordination', 'data entry', 'customer service']
  },
  'Employee Relations Specialist': {
    role: 'Employee Relations Specialist',
    requiredSkills: ['employee relations', 'conflict resolution', 'investigations', 'policy interpretation', 'mediation'],
    experienceLevel: 'mid',
    preferredSkills: ['labor law', 'documentation', 'coaching', 'training delivery', 'case management']
  },
  'Learning & Development Manager': {
    role: 'Learning & Development Manager',
    requiredSkills: ['learning and development', 'training design', 'curriculum development', 'instructional design', 'performance improvement'],
    experienceLevel: 'mid',
    preferredSkills: ['lms', 'e-learning', 'training delivery', 'assessment', 'learning analytics', 'change management']
  },

  // Finance & Legal
  'Financial Analyst': {
    role: 'Financial Analyst',
    requiredSkills: ['financial analysis', 'excel', 'financial modeling', 'budgeting', 'forecasting'],
    experienceLevel: 'mid',
    preferredSkills: ['sql', 'power bi', 'tableau', 'valuation', 'variance analysis', 'financial reporting']
  },
  'Accountant': {
    role: 'Accountant',
    requiredSkills: ['accounting', 'bookkeeping', 'financial statements', 'gaap', 'tax preparation'],
    experienceLevel: 'mid',
    preferredSkills: ['quickbooks', 'excel', 'accounts payable', 'accounts receivable', 'reconciliation', 'audit support']
  },
  'Auditor': {
    role: 'Auditor',
    requiredSkills: ['auditing', 'risk assessment', 'compliance', 'internal controls', 'financial analysis'],
    experienceLevel: 'mid',
    preferredSkills: ['gaap', 'sox compliance', 'audit software', 'documentation', 'analytical skills', 'attention to detail']
  },
  'Controller': {
    role: 'Controller',
    requiredSkills: ['financial reporting', 'accounting management', 'budgeting', 'compliance', 'team leadership'],
    experienceLevel: 'senior',
    preferredSkills: ['gaap', 'sox compliance', 'erp systems', 'audit coordination', 'financial planning', 'process improvement']
  },
  'Chief Financial Officer (CFO)': {
    role: 'Chief Financial Officer (CFO)',
    requiredSkills: ['financial strategy', 'executive leadership', 'financial planning', 'investor relations', 'risk management'],
    experienceLevel: 'lead',
    preferredSkills: ['fundraising', 'm&a', 'board reporting', 'strategic planning', 'team building', 'public company experience']
  },
  'Tax Consultant': {
    role: 'Tax Consultant',
    requiredSkills: ['tax preparation', 'tax planning', 'compliance', 'tax research', 'client advisory'],
    experienceLevel: 'mid',
    preferredSkills: ['cpa', 'tax software', 'entity taxation', 'international tax', 'tax controversy', 'client management']
  },
  'Legal Counsel': {
    role: 'Legal Counsel',
    requiredSkills: ['legal analysis', 'contract review', 'regulatory compliance', 'risk assessment', 'legal research'],
    experienceLevel: 'senior',
    preferredSkills: ['corporate law', 'employment law', 'intellectual property', 'litigation management', 'negotiation']
  },
  'Corporate Lawyer': {
    role: 'Corporate Lawyer',
    requiredSkills: ['corporate law', 'contract negotiation', 'mergers and acquisitions', 'securities law', 'governance'],
    experienceLevel: 'senior',
    preferredSkills: ['due diligence', 'regulatory filings', 'board advisory', 'capital markets', 'compliance programs']
  },
  'Compliance Officer': {
    role: 'Compliance Officer',
    requiredSkills: ['regulatory compliance', 'risk management', 'policy development', 'training', 'monitoring'],
    experienceLevel: 'mid',
    preferredSkills: ['audit support', 'investigation', 'reporting', 'legal knowledge', 'documentation', 'ethics']
  },

  // Operations & Admin
  'Operations Manager': {
    role: 'Operations Manager',
    requiredSkills: ['operations management', 'process improvement', 'team leadership', 'project management', 'budgeting'],
    experienceLevel: 'mid',
    preferredSkills: ['lean six sigma', 'supply chain', 'quality management', 'data analysis', 'vendor management']
  },
  'Supply Chain Analyst': {
    role: 'Supply Chain Analyst',
    requiredSkills: ['supply chain analysis', 'data analysis', 'inventory management', 'forecasting', 'excel'],
    experienceLevel: 'mid',
    preferredSkills: ['sql', 'erp systems', 'logistics', 'procurement', 'vendor management', 'cost analysis']
  },
  'Procurement Manager': {
    role: 'Procurement Manager',
    requiredSkills: ['procurement', 'vendor management', 'contract negotiation', 'cost analysis', 'supplier relationships'],
    experienceLevel: 'mid',
    preferredSkills: ['strategic sourcing', 'risk management', 'category management', 'e-procurement', 'spend analysis']
  },
  'Inventory Analyst': {
    role: 'Inventory Analyst',
    requiredSkills: ['inventory management', 'demand planning', 'forecasting', 'data analysis', 'excel'],
    experienceLevel: 'mid',
    preferredSkills: ['erp systems', 'warehouse management', 'optimization', 'reporting', 'supply chain knowledge']
  },
  'Logistics Coordinator': {
    role: 'Logistics Coordinator',
    requiredSkills: ['logistics coordination', 'shipping', 'inventory tracking', 'vendor communication', 'documentation'],
    experienceLevel: 'junior',
    preferredSkills: ['transportation management', 'warehouse operations', 'customs clearance', 'tracking systems', 'problem solving']
  },
  'Office Manager': {
    role: 'Office Manager',
    requiredSkills: ['office administration', 'facility management', 'vendor coordination', 'budget management', 'team coordination'],
    experienceLevel: 'mid',
    preferredSkills: ['event planning', 'procurement', 'hr support', 'accounting support', 'project coordination']
  },
  'Administrative Assistant': {
    role: 'Administrative Assistant',
    requiredSkills: ['administrative support', 'scheduling', 'communication', 'document preparation', 'office software'],
    experienceLevel: 'junior',
    preferredSkills: ['calendar management', 'travel coordination', 'filing systems', 'customer service', 'multitasking']
  },
  'Executive Assistant': {
    role: 'Executive Assistant',
    requiredSkills: ['executive support', 'calendar management', 'travel coordination', 'meeting planning', 'confidentiality'],
    experienceLevel: 'mid',
    preferredSkills: ['project coordination', 'stakeholder communication', 'event planning', 'expense management', 'presentation preparation']
  },

  // Leadership & Strategy
  'Chief Executive Officer (CEO)': {
    role: 'Chief Executive Officer (CEO)',
    requiredSkills: ['executive leadership', 'strategic planning', 'business strategy', 'team building', 'stakeholder management'],
    experienceLevel: 'lead',
    preferredSkills: ['fundraising', 'board management', 'public speaking', 'vision setting', 'change management', 'p&l responsibility']
  },
  'Chief Technology Officer (CTO)': {
    role: 'Chief Technology Officer (CTO)',
    requiredSkills: ['technology leadership', 'technical strategy', 'team management', 'architecture', 'innovation'],
    experienceLevel: 'lead',
    preferredSkills: ['cloud platforms', 'scalability', 'security', 'agile methodologies', 'hiring', 'technical vision']
  },
  'Chief Operating Officer (COO)': {
    role: 'Chief Operating Officer (COO)',
    requiredSkills: ['operations leadership', 'process optimization', 'strategic execution', 'team management', 'performance management'],
    experienceLevel: 'lead',
    preferredSkills: ['change management', 'scaling operations', 'cross-functional leadership', 'metrics', 'efficiency improvement']
  },
  'Chief Marketing Officer (CMO)': {
    role: 'Chief Marketing Officer (CMO)',
    requiredSkills: ['marketing leadership', 'brand strategy', 'digital marketing', 'team management', 'roi optimization'],
    experienceLevel: 'lead',
    preferredSkills: ['growth strategy', 'customer acquisition', 'marketing analytics', 'public relations', 'partnership development']
  },
  'Chief Product Officer (CPO)': {
    role: 'Chief Product Officer (CPO)',
    requiredSkills: ['product leadership', 'product strategy', 'roadmap planning', 'user experience', 'team management'],
    experienceLevel: 'lead',
    preferredSkills: ['product analytics', 'design thinking', 'agile methodologies', 'market research', 'innovation management']
  },
  'Chief Design Officer (CDO)': {
    role: 'Chief Design Officer (CDO)',
    requiredSkills: ['design leadership', 'design strategy', 'user experience', 'creative direction', 'team management'],
    experienceLevel: 'lead',
    preferredSkills: ['design systems', 'brand development', 'design thinking', 'user research', 'cross-functional collaboration']
  },
  'VP of Engineering': {
    role: 'VP of Engineering',
    requiredSkills: ['engineering leadership', 'technical management', 'team scaling', 'architecture decisions', 'delivery management'],
    experienceLevel: 'lead',
    preferredSkills: ['agile methodologies', 'hiring', 'performance management', 'technical strategy', 'cross-functional collaboration']
  },
  'VP of Product': {
    role: 'VP of Product',
    requiredSkills: ['product leadership', 'strategic planning', 'roadmap management', 'stakeholder management', 'team leadership'],
    experienceLevel: 'lead',
    preferredSkills: ['product analytics', 'user research', 'go-to-market strategy', 'agile methodologies', 'competitive analysis']
  },
  'VP of Sales': {
    role: 'VP of Sales',
    requiredSkills: ['sales leadership', 'revenue growth', 'team management', 'sales strategy', 'pipeline management'],
    experienceLevel: 'lead',
    preferredSkills: ['sales operations', 'crm management', 'forecasting', 'territory planning', 'customer success']
  },
  'Strategy Manager': {
    role: 'Strategy Manager',
    requiredSkills: ['strategic planning', 'business analysis', 'market research', 'financial modeling', 'presentation skills'],
    experienceLevel: 'senior',
    preferredSkills: ['consulting', 'competitive analysis', 'data analysis', 'project management', 'stakeholder management']
  },

  // Others / Miscellaneous
  'Technical Writer': {
    role: 'Technical Writer',
    requiredSkills: ['technical writing', 'documentation', 'content creation', 'api documentation', 'user guides'],
    experienceLevel: 'mid',
    preferredSkills: ['markdown', 'git', 'software knowledge', 'editing', 'information architecture', 'cms']
  },
  'IT Support Specialist': {
    role: 'IT Support Specialist',
    requiredSkills: ['technical support', 'troubleshooting', 'hardware support', 'software support', 'customer service'],
    experienceLevel: 'junior',
    preferredSkills: ['windows', 'mac', 'networking', 'active directory', 'remote support tools', 'ticketing systems']
  },
  'System Administrator': {
    role: 'System Administrator',
    requiredSkills: ['system administration', 'server management', 'networking', 'security', 'backup management'],
    experienceLevel: 'mid',
    preferredSkills: ['linux', 'windows server', 'virtualization', 'monitoring', 'scripting', 'cloud platforms']
  },
  'Network Engineer': {
    role: 'Network Engineer',
    requiredSkills: ['network engineering', 'routing', 'switching', 'firewall management', 'network security'],
    experienceLevel: 'mid',
    preferredSkills: ['cisco', 'juniper', 'vpn', 'load balancing', 'network monitoring', 'troubleshooting']
  },
  'Ethical Hacker': {
    role: 'Ethical Hacker',
    requiredSkills: ['ethical hacking', 'penetration testing', 'vulnerability assessment', 'security tools', 'reporting'],
    experienceLevel: 'mid',
    preferredSkills: ['ceh', 'oscp', 'kali linux', 'metasploit', 'burp suite', 'social engineering']
  },
  'Penetration Tester': {
    role: 'Penetration Tester',
    requiredSkills: ['penetration testing', 'vulnerability assessment', 'security testing', 'exploit development', 'reporting'],
    experienceLevel: 'mid',
    preferredSkills: ['oscp', 'kali linux', 'metasploit', 'nmap', 'burp suite', 'scripting']
  },
  'Scrum Master': {
    role: 'Scrum Master',
    requiredSkills: ['scrum', 'agile coaching', 'facilitation', 'team leadership', 'process improvement'],
    experienceLevel: 'mid',
    preferredSkills: ['csm', 'jira', 'confluence', 'kanban', 'retrospectives', 'stakeholder management']
  },
  'Agile Coach': {
    role: 'Agile Coach',
    requiredSkills: ['agile coaching', 'organizational change', 'team coaching', 'agile methodologies', 'facilitation'],
    experienceLevel: 'senior',
    preferredSkills: ['scaling agile', 'safe', 'lean', 'coaching certification', 'transformation management', 'metrics']
  },
  'Project Manager': {
    role: 'Project Manager',
    requiredSkills: ['project management', 'planning', 'risk management', 'stakeholder management', 'budget management'],
    experienceLevel: 'mid',
    preferredSkills: ['pmp', 'agile', 'ms project', 'gantt charts', 'resource management', 'communication']
  },
  'Program Manager': {
    role: 'Program Manager',
    requiredSkills: ['program management', 'strategic planning', 'cross-functional leadership', 'portfolio management', 'governance'],
    experienceLevel: 'senior',
    preferredSkills: ['pmp', 'change management', 'stakeholder alignment', 'risk management', 'metrics', 'scaling']
  },
  'Facilities Manager': {
    role: 'Facilities Manager',
    requiredSkills: ['facilities management', 'vendor management', 'budget management', 'maintenance coordination', 'safety compliance'],
    experienceLevel: 'mid',
    preferredSkills: ['project management', 'space planning', 'sustainability', 'emergency planning', 'contract negotiation']
  },
  'Training Coordinator': {
    role: 'Training Coordinator',
    requiredSkills: ['training coordination', 'curriculum development', 'scheduling', 'learning management', 'assessment'],
    experienceLevel: 'mid',
    preferredSkills: ['lms', 'instructional design', 'e-learning', 'training delivery', 'evaluation', 'reporting']
  }
};

// Experience level mapping (for future use)
// const EXPERIENCE_LEVELS = {
//   'Entry Level (0-2 years)': 'junior',
//   'Mid Level (2-5 years)': 'mid',
//   'Senior Level (5-8 years)': 'senior',
//   'Lead/Principal (8+ years)': 'lead'
// };

export class CandidateMatchingService {
  
  // Normalize skills for comparison
  private normalizeSkill(skill: string): string {
    return skill.toLowerCase().trim().replace(/[^\w\s.-]/g, '');
  }

  // More precise skill matching to avoid false positives
  private isSkillMatch(candidateSkill: string, requiredSkill: string): boolean {
    // Exact match
    if (candidateSkill === requiredSkill) return true;
    
    // Handle common variations
    const candWords = candidateSkill.split(/\s+/);
    const reqWords = requiredSkill.split(/\s+/);
    
    // For single word skills, require exact match or meaningful substring
    if (reqWords.length === 1 && candWords.length === 1) {
      // Only match if one contains the other AND the substring is meaningful (at least 3 chars)
      if (reqWords[0].length >= 3 && candWords[0].includes(reqWords[0])) return true;
      if (candWords[0].length >= 3 && reqWords[0].includes(candWords[0])) return true;
      return false;
    }
    
    // For multi-word skills, check if key words match
    if (reqWords.length > 1) {
      const keyWords = reqWords.filter(word => word.length >= 3); // Skip short words like "a", "the", "of"
      const matchedWords = keyWords.filter(word => 
        candWords.some(candWord => candWord.includes(word) || word.includes(candWord))
      );
      // Require at least 50% of key words to match
      return matchedWords.length >= Math.ceil(keyWords.length * 0.5);
    }
    
    // For candidate multi-word skills against single required skill
    if (candWords.length > 1 && reqWords.length === 1) {
      return candWords.some(word => 
        (word.length >= 3 && reqWords[0].includes(word)) || 
        (reqWords[0].length >= 3 && word.includes(reqWords[0]))
      );
    }
    
    return false;
  }

  // Calculate skills match score
  private calculateSkillsScore(candidateSkills: string[], requirements: JobRequirements): {
    score: number;
    matched: string[];
    missing: string[];
  } {
    const normalizedCandidateSkills = candidateSkills.map(skill => this.normalizeSkill(skill));
    const normalizedRequiredSkills = requirements.requiredSkills.map(skill => this.normalizeSkill(skill));
    const normalizedPreferredSkills = (requirements.preferredSkills || []).map(skill => this.normalizeSkill(skill));

    // Find exact matches - return the CANDIDATE skills that match, not the required skills
    const exactMatchedCandidateSkills: string[] = [];
    const exactMatchedRequiredSkills: string[] = [];
    
    for (const reqSkill of normalizedRequiredSkills) {
      for (const candSkill of normalizedCandidateSkills) {
        // More precise matching: either exact match or meaningful substring match
        const isMatch = this.isSkillMatch(candSkill, reqSkill);
        if (isMatch) {
          exactMatchedCandidateSkills.push(candSkill);
          exactMatchedRequiredSkills.push(reqSkill);
          break; // Only count each required skill once
        }
      }
    }

    // Find related skills (from same category) - return candidate skills that provide coverage
    const relatedMatchResult = this.findRelatedSkills(normalizedCandidateSkills, normalizedRequiredSkills);
    
    // Find preferred skill matches - return candidate skills that match
    const preferredMatchedCandidateSkills: string[] = [];
    for (const prefSkill of normalizedPreferredSkills) {
      for (const candSkill of normalizedCandidateSkills) {
        if (this.isSkillMatch(candSkill, prefSkill)) {
          preferredMatchedCandidateSkills.push(candSkill);
          break; // Only count each preferred skill once
        }
      }
    }

    const totalRequiredMatches = exactMatchedRequiredSkills.length + relatedMatchResult.coveredRequiredSkills.length;
    const requiredSkillsCount = normalizedRequiredSkills.length;
    
    // Base score from required skills
    let skillsScore = (totalRequiredMatches / requiredSkillsCount) * 100;
    
    // Bonus for preferred skills (up to 15% bonus)
    const preferredBonus = Math.min((preferredMatchedCandidateSkills.length / (normalizedPreferredSkills.length || 1)) * 15, 15);
    skillsScore = Math.min(skillsScore + preferredBonus, 100);

    // Return the CANDIDATE skills that provided matches, not the required skills
    const allMatchedCandidateSkills = [
      ...exactMatchedCandidateSkills, 
      ...relatedMatchResult.matchedCandidateSkills, 
      ...preferredMatchedCandidateSkills
    ];
    
    const missingRequiredSkills = normalizedRequiredSkills.filter(skill => 
      !exactMatchedRequiredSkills.includes(skill) && 
      !relatedMatchResult.coveredRequiredSkills.includes(skill)
    );

    return {
      score: Math.round(skillsScore),
      matched: [...new Set(allMatchedCandidateSkills)], // Candidate skills that matched
      missing: [...new Set(missingRequiredSkills)]       // Required skills that are missing
    };
  }

  // Find related skills from same category
  private findRelatedSkills(candidateSkills: string[], requiredSkills: string[]): {
    matchedCandidateSkills: string[];
    coveredRequiredSkills: string[];
  } {
    const matchedCandidateSkills: string[] = [];
    const coveredRequiredSkills: string[] = [];
    
    for (const reqSkill of requiredSkills) {
      for (const skills of Object.values(SKILL_CATEGORIES)) {
        if (skills.includes(reqSkill)) {
          // Check if candidate has other skills from same category
          const categoryMatches = candidateSkills.filter(candSkill => 
            skills.includes(candSkill) && candSkill !== reqSkill
          );
          if (categoryMatches.length > 0) {
            matchedCandidateSkills.push(...categoryMatches);
            coveredRequiredSkills.push(reqSkill);
            break;
          }
        }
      }
    }
    
    return {
      matchedCandidateSkills: [...new Set(matchedCandidateSkills)],
      coveredRequiredSkills: [...new Set(coveredRequiredSkills)]
    };
  }

  // Calculate experience level match
  private calculateExperienceScore(candidateExperience: string[], targetRole: string): number {
    const roleRequirements = ROLE_REQUIREMENTS[targetRole];
    if (!roleRequirements) return 50; // Default score if role not found

    // Estimate experience level from experience array length and content
    const experienceCount = candidateExperience.length;
    const experienceText = candidateExperience.join(' ').toLowerCase();
    
    // Look for experience indicators
    const seniorIndicators = ['senior', 'lead', 'principal', 'architect', 'manager', 'head of'];
    const juniorIndicators = ['junior', 'intern', 'associate', 'entry', 'graduate'];

    let estimatedLevel = 'mid'; // default
    
    if (seniorIndicators.some(indicator => experienceText.includes(indicator)) || experienceCount >= 4) {
      estimatedLevel = 'senior';
    } else if (juniorIndicators.some(indicator => experienceText.includes(indicator)) || experienceCount <= 1) {
      estimatedLevel = 'junior';
    }

    const requiredLevel = roleRequirements.experienceLevel;
    
    // Score based on level match
    if (estimatedLevel === requiredLevel) return 100;
    if ((estimatedLevel === 'mid' && requiredLevel === 'senior') || 
        (estimatedLevel === 'senior' && requiredLevel === 'mid')) return 80;
    if ((estimatedLevel === 'junior' && requiredLevel === 'mid') || 
        (estimatedLevel === 'mid' && requiredLevel === 'junior')) return 70;
    
    return 50; // Significant mismatch
  }

  // Calculate role alignment score
  private calculateRoleScore(candidateRole: string, targetRole: string): number {
    const candRole = candidateRole.toLowerCase();
    const targRole = targetRole.toLowerCase();
    
    // Exact match
    if (candRole === targRole) return 100;
    
    // Partial matches
    const roleKeywords = targRole.split(' ');
    const matches = roleKeywords.filter(keyword => candRole.includes(keyword)).length;
    const partialScore = (matches / roleKeywords.length) * 80;
    
    // Role family matches
    const roleFamilies = {
      'developer': ['developer', 'engineer', 'programmer'],
      'full stack': ['full stack', 'fullstack', 'full-stack'],
      'frontend': ['frontend', 'front-end', 'front end', 'ui', 'client'],
      'backend': ['backend', 'back-end', 'back end', 'server', 'api']
    };
    
    for (const roles of Object.values(roleFamilies)) {
      if (roles.some(role => targRole.includes(role)) && 
          roles.some(role => candRole.includes(role))) {
        return Math.max(partialScore, 70);
      }
    }
    
    return Math.max(partialScore, 30);
  }

  // Main matching function
  public calculateMatch(
    candidateSkills: string[],
    candidateExperience: string[],
    candidateRole: string,
    targetRole: string = 'Full Stack Developer'
  ): MatchResult {
    const requirements = ROLE_REQUIREMENTS[targetRole] || ROLE_REQUIREMENTS['Full Stack Developer'];
    
    // Calculate individual scores
    const skillsResult = this.calculateSkillsScore(candidateSkills, requirements);
    const experienceScore = this.calculateExperienceScore(candidateExperience, targetRole);
    const roleScore = this.calculateRoleScore(candidateRole, targetRole);
    
    // Weighted overall score
    const overallScore = Math.round(
      (skillsResult.score * 0.6) +
      (experienceScore * 0.25) +
      (roleScore * 0.15)
    );
    
    return {
      overallScore: Math.min(overallScore, 100),
      skillsScore: skillsResult.score,
      experienceScore,
      roleScore,
      breakdown: {
        matchedSkills: skillsResult.matched,
        missingSkills: skillsResult.missing,
        experienceMatch: experienceScore >= 70,
        roleMatch: roleScore >= 70
      }
    };
  }

  // Get match description
  public getMatchDescription(score: number): {
    level: string;
    description: string;
    color: string;
  } {
    if (score >= 85) {
      return {
        level: 'Excellent Match',
        description: 'Highly qualified candidate with strong skill alignment',
        color: 'green'
      };
    } else if (score >= 70) {
      return {
        level: 'Good Match',
        description: 'Well-qualified candidate with good potential',
        color: 'blue'
      };
    } else if (score >= 50) {
      return {
        level: 'Moderate Match',
        description: 'Some relevant skills, may need additional training',
        color: 'yellow'
      };
    } else {
      return {
        level: 'Low Match',
        description: 'Limited alignment with requirements',
        color: 'red'
      };
    }
  }
}

// Allow customization of role requirements
export const updateRoleRequirements = (role: string, requirements: Partial<JobRequirements>) => {
  ROLE_REQUIREMENTS[role] = {
    ...ROLE_REQUIREMENTS[role],
    ...requirements,
    role // Ensure role name is always set
  };
};

// Get current role requirements
export const getRoleRequirements = (role: string): JobRequirements | undefined => {
  return ROLE_REQUIREMENTS[role];
};

// Get all available roles
export const getAvailableRoles = (): string[] => {
  return Object.keys(ROLE_REQUIREMENTS);
};

// Export singleton instance
export const matchingService = new CandidateMatchingService();
