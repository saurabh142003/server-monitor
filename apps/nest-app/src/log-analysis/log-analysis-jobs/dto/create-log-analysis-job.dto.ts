import { IsEnum, IsOptional, IsString, IsNotEmpty, IsObject } from "class-validator";
import { LogAnalysisJobType } from "../entities/log-analysis-job.entity";

export class CreateLogAnalysisJobDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsObject()
    @IsOptional()
    ticketingSystemConfig?: Record<string, any>;

    @IsEnum(LogAnalysisJobType)
    type: LogAnalysisJobType;

    @IsString()
    @IsOptional()
    logSourceId: string;

    @IsString()
    @IsNotEmpty()
    remoteServerId: string;
}