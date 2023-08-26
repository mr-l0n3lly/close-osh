import { DataResponse, Opportunity, Pipeline } from '@types';

export interface IPipesService {
  getPipes: () => Promise<DataResponse<Pipeline>>
}

export interface IOpportunitiesService {
  getByPipelineId: (pipelineId: string) => Promise<DataResponse<Opportunity>>
}
