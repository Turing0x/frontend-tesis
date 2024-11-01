export interface Service {
  name: string;
  displayName: string;
  files: ServiceFile[];
}

export interface ServiceFile {
  mandatory: boolean;
  name: string;
  folder?: string;
  content: string;
  parameters: string[];
}
