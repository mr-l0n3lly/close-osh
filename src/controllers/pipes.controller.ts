import { DataResponse, Pipeline, IPipesController } from '../types';
import { Get, Route, Tags } from 'tsoa';
import { pipesService } from '../services';

@Route('pipelines')
@Tags('Pipelines')
export class PipesController implements IPipesController {

  @Get('/')
  async getAll(): Promise<DataResponse<Pipeline>> {
    return await pipesService.getPipes()
  }
}

const pipeController = new PipesController();

export { pipeController }
