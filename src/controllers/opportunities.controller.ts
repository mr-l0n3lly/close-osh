import { DataResponse, IOpportunitiesController, Opportunity } from '../types';
import { Get, Query, Route, Tags } from 'tsoa';
import { opportunitiesService } from '../services';

@Route('opportunities')
@Tags('Opportunities')
export class OpportunitiesController implements IOpportunitiesController {
  @Get()
  async getFiltered(@Query() pipelineId: string): Promise<DataResponse<Opportunity>> {
    return opportunitiesService.getByPipelineId(pipelineId);
  }
}
