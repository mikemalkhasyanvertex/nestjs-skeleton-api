import { plainToClass } from 'class-transformer'
import {
    IsEnum,
    IsNumber,
    IsString,
    validateSync,
} from 'class-validator'
import {logger} from "../../logger/winston";

enum Environment {
    Development = 'dev',
    Stage = 'stage',
    Production = 'prod',
    Local = 'local',
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment

    @IsString()
    APP_HOST: string

    @IsNumber()
    APP_PORT: number

    @IsString()
    MATCHES_IN_2000_ENDPOINT: string

    @IsString()
    MATCHES_IN_2001_ENDPOINT: string
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true }
    )

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    })

    if (errors.length > 0) {
        logger.error(errors.toString())
        process.kill(process.pid, 'SIGTERM')
    }

    return validatedConfig
}
