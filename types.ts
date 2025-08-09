
export enum Species {
  Dog = 'dog',
  Cat = 'cat',
}

export enum PainType {
  Acute = 'acute',
  Chronic = 'chronic',
}

export enum QuestionType {
  Radio = 'radio',
  Slider = 'slider',
  Custom = 'custom',
}

export interface Option {
  score: number;
  text: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  max?: number; // For sliders
  min?: number; // For sliders
  step?: number; // For sliders
  labelMin?: string; // For sliders
  labelMax?: string; // For sliders
  category?: string; // For grouping questions, e.g., in CBPI
  compositeImageUrl?: string; // For composite images like FGS
}

export interface ScaleDetails {
  accuracy?: string;
  reliability?: string;
  indications: string;
  origin: string;
  studies: string;
  quality: string;
}

export interface Scale {
  id: string;
  name: string;
  description?: string;
  recommended: boolean;
  compositeImageUrl?: string;
  questions: Question[];
  interpretation: (answers: Record<string, number | string>) => {
    score: string;
    analysis: string;
    needsIntervention: boolean;
  };
  details?: ScaleDetails;
}

export interface PainData {
  [key: string]: {
    [key: string]: {
      scales: Scale[];
    };
  };
}

export interface GuideRow {
  state: string;
  considerations: string;
  firstLine: string;
  secondLine: string;
  avoid: string;
}

export interface AnalgesicGuideData {
  [key: string]: {
    title: string;
    headers: string[];
    rows: GuideRow[];
  };
}
