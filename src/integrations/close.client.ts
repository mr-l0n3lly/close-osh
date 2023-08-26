import { DataResponse, ICloseClient, OpportunitiesFilter, Opportunity, Pipeline, PipelineStatus } from '@types';
import * as process from 'process';
import axios, { AxiosError, AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { InternalServerError, logger, NotFoundError } from '../utils';
import e from 'express';

dotenv.config()

export class CloseClient implements ICloseClient {
  private readonly baseUrl: string = process.env.CLOSE_API_ENDPOINT;
  private readonly apiKey: string = process.env.CLOSE_API_KEY;
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 4000,
      headers: {
        'Authorization': `Basic ${this.apiKey}`,
      },
    })
  }

  async getPipelines(): Promise<DataResponse<Pipeline>> {
    try {
      const response = await this.axiosInstance
        .get('/pipeline')

      const responseData = response.data;

      return {
        items: responseData.data.map((p: any) => ({
          id: p?.id,
          name: p?.name,
          organizationId: p['organization_id'],
          statuses: p?.statuses,
          updatedBy: p['updated_by'],
          createdBy: p['created_by'],
          dateCreated: p['date_created'],
          dateUpdated: p['date_updated'],
        })),
        total: responseData.data.length
      }
    }
    catch (err: any) {
      logger.error((err as AxiosError).message)

      throw new InternalServerError('Could not get pipelines');
    }
  }

  async getPipelineById(pipelineId: string): Promise<Pipeline> {
    try {
      const response = await this.axiosInstance
        .get(`pipeline/${pipelineId}`, {
          params: {
            id: pipelineId,
          }
        })

      const p = response.data;

      return {
        id: p?.id,
        name: p?.name,
        organizationId: p['organization_id'],
        statuses: p?.statuses,
        updatedBy: p['updated_by'],
        createdBy: p['created_by'],
        dateCreated: p['date_created'],
        dateUpdated: p['date_updated']
      }
    } catch (e) {
      logger.error((e as AxiosError).message)
      throw new NotFoundError(`Pipeline with id(${pipelineId}) not found`);
    }
  }

  // TODO: Need to think on more abstract approach
  async getOpportunities(filters: OpportunitiesFilter): Promise<Opportunity[]> {
    try {
      const pipeline = await this.getPipelineById(filters.pipelineId);

      const statusIds = pipeline.statuses.map(s => s.id);

      const promises = statusIds.map(s => this.axiosInstance
        .post(`opportunity`, {
          _params: {
            status_id: s,
          },
        }, {
          headers: {
            'x-http-method-override': 'GET',
          }
        }))

      const response = (await Promise.all(promises)).map(r => r.data);
      let result: Opportunity[] = []

      response.forEach(r => result = result.concat(r.data.map((o: any) => ({
        id: o?.id,
        organizationId: o['organization_id'],
        leadId: o['lead_id'],
        dateWon: o['date_won'],
        confidence: o?.confidence,
        value: o?.value,
        valuePeriod: o['value_period'],
        valueFormatted: o['value_formatted'],
        valueCurrency: o['value_currency'],
        expectedValue: o['expected_value'],
        annualizedValue: o['annualized_value'],
        annualizedExpectedValue: o['annualized_expected_value'],
        note: o?.note,
        statusId: o['status_id'],
        contactId: o['contact_id'],
        userId: o['user_id'],
        createdBy: o['created_by'],
        updatedBy: o['updated_by'],
        dateCreated: o['date_created'],
        dateUpdated: o['date_updated'],
      }))))

      return result;
    } catch (err: any) {
      logger.error((err as AxiosError).message);

      throw err
    }
  }
}

