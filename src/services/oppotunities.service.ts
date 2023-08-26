import { DataResponse, ICloseClient, IOpportunitiesService, Opportunity } from '@types';
import { CloseClient } from '../integrations';
import cache from 'memory-cache';
import * as process from 'process';

export class OpportunitiesService implements IOpportunitiesService {
  private readonly client: ICloseClient;

  constructor() {
    this.client = new CloseClient();
  }

  async getByPipelineId(pipelineId: string): Promise<DataResponse<Opportunity>> {
    let o = cache.get(pipelineId);

    if (!o) {
      o = await this.client.getOpportunities({
        pipelineId
      });

      cache.put(pipelineId, o, +process.env.CACHE_DURATION | 5000);

    }

    return {
      items: o,
      total: o.length,
    };
  }
}

const opportunitiesService = new OpportunitiesService();

export { opportunitiesService }
