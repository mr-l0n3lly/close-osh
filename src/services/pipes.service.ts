import { DataResponse, ICloseClient, Pipeline, IPipesService } from '@types';
import { CloseClient } from '../integrations';
import cache from 'memory-cache';
import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export class PipesService implements IPipesService {
  private readonly client: ICloseClient;

  constructor() {
    this.client = new CloseClient();
  }

  async getPipes(): Promise<DataResponse<Pipeline>> {
    let data = cache.get('pipelines') as DataResponse<Pipeline> | null;

    if (data) {
      return data;
    }

    data = await this.client.getPipelines();
    cache.put('pipelines', data, +process.env.CACHE_DURATION ?? 5000);

    return data;
  }
}

const pipesService = new PipesService();

export { pipesService }
