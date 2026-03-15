import { IsEnum, IsNotEmpty, IsObject, IsString } from "class-validator";
import { LogSourceType } from "../entities/log-source.entity";

export class CreateLogSourceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsEnum(LogSourceType)
    type: LogSourceType;

    @IsNotEmpty()
    @IsObject()
    config: Record<string, any>;
}
