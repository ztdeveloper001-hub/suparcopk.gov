
export interface Mission {
  id: string;
  name: string;
  status: 'Active' | 'Planned' | 'Decommissioned';
  launchDate: string;
  description: string;
  category: 'Earth Observation' | 'Communications' | 'Scientific';
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  image: string;
}

export interface MultimediaContent {
  id: string;
  title: string;
  type: 'video' | 'image';
  thumbnail: string;
  url: string;
}

export enum Page {
  Home = 'Home',
  Missions = 'Missions',
  Science = 'Science',
  News = 'News',
  Multimedia = 'Multimedia',
  SuparcoPlus = 'SUPARCO+',
  About = 'About',
  Careers = 'Careers',
  Contact = 'Contact'
}
