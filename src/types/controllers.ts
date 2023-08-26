import { DataResponse } from '@types';

export type Pipeline = {
  id: string;
  name: string;
  organizationId: string;
  statuses: PipelineStatus[];
  updatedBy: string;
  createdBy: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export type PipelineStatus = {
  id: string;
  label: string;
  type: string;
}

export interface IPipesController {
  getAll: (skip: number, limit: number) => Promise<DataResponse<Pipeline>>
}

export interface IOpportunitiesController {
  getFiltered: (pipelineId: string) => Promise<DataResponse<Opportunity>>
}

export type Opportunity = {
  id: string;
  organizationId: string;
  leadId: string;
  dateWon?: Date,
  confidence: number;
  value: number;
  valuePeriod: string;
  valueFormatted: string;
  valueCurrency: string;
  expectedValue: number;
  annualizedValue: number;
  annualizedExpectedValue: number,
  note: string;
  statusId: string;
  contactId?: string,
  userId: string;
  createdBy?: Date;
  updatedBy?: Date;
  dateCreated: Date;
  dateUpdated: Date;
}
