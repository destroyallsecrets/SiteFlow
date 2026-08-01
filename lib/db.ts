import Dexie, { Table } from 'dexie';

export interface JobResult {
  id?: number;
  title: string;
  date: string;
  imageBlob?: Blob;
  materialList: string[];
  steps: string[];
  mermaidChart: string;
}

export class SiteFlowDB extends Dexie {
  jobs!: Table<JobResult, number>;

  constructor() {
    super('SiteFlowDB');
    this.version(1).stores({
      jobs: '++id, date, title'
    });
  }
}

export const db = new SiteFlowDB();
