import { DataResponse, Opportunity, Pipeline } from '@types';

export interface ICloseClient {
  getPipelines: () => Promise<DataResponse<Pipeline>>;
  getOpportunities: (filters: OpportunitiesFilter) => Promise<Opportunity[]>;
}

export type OpportunitiesFilter = {
  pipelineId: string;
}
