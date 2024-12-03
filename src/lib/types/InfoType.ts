export interface InfoType {
  title: string;
  description: string;
  updatedAt: string;
  language: string;
  template: (...args: any[]) => string;
}
