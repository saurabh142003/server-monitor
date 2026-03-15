import { PartialType } from '@nestjs/mapped-types';
import { CreateLogAnalysisJobDto } from './create-log-analysis-job.dto';

export class UpdateLogAnalysisJobDto extends PartialType(CreateLogAnalysisJobDto) {}
