import { IsEnum, IsOptional, IsString, IsNotEmpty } from "class-validator";
import { LogAnalysisJobType } from "../entities/log-analysis-job.entity";

export class CreateLogAnalysisJobDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(LogAnalysisJobType)
    type: LogAnalysisJobType;

    @IsString()
    @IsOptional()
    logSourceId: string;

    @IsString()
    @IsNotEmpty()
    remoteServerId: string;
}