
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
  Text = 'text',
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
    [key:string]: {
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

// Types for Drug Dose Calculator
export type AgeGroup = 'adult' | 'senior' | 'puppy_kitten' | 'pregnant_lactating';
export type Comorbidity = 'liver' | 'kidney' | 'heart' | 'gastro';

export interface DoseRange {
  min: number;
  max: number;
  unit: string;
  default: number;
}

export interface Presentation {
  id: string;
  name: string;
  concentration: {
    value: number;
    unit: 'mg/ml' | 'mg/tablet' | '%';
  };
}

export interface AdjustmentFactors {
  senior?: string;
  puppy_kitten?: string;
  pregnant_lactating?: string;
  liver?: string;
  kidney?: string;
  heart?: string;
  gastro?: string;
}

export interface Drug {
  id: string;
  name: string;
  species: Species[];
  doseRange: DoseRange;
  presentations: Presentation[];
  administrationNotes: string;
  adjustmentFactors: AdjustmentFactors;
}

// Type for structured Gemini response
export interface GeminiAnalysis {
  clinicalAnalysis: string;
  actionSuggestions: string;
  importantReminders?: string;
}
