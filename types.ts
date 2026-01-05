
export enum SignatureStyle {
  MODERN = 'modern',
  CLASSIC = 'classic',
  MINIMAL = 'minimal',
  CORPORATE = 'corporate'
}

export enum FrameStyle {
  NONE = 'none',
  SOLID = 'solid',
  DOUBLE = 'double',
  DASHED = 'dashed',
  GRADIENT = 'gradient'
}

export interface UserInfo {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  avatar: string | null;
}

export interface DesignConfig {
  style: SignatureStyle;
  frame: FrameStyle;
  frameColor: string;
  accentColor: string;
  textColor: string;
  fontSize: number;
}
