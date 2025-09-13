import { logEntity, singEntity } from "../../domain/models/log.model";
import { SessionEntity } from "../../domain/models/session.model";
import { logInput } from "../inputs/log.input";
import { singInput } from "../inputs/sing.input";
import { sessionDto } from "../dtos/session.dto";

export class sessionMapper {
    
    public fromDtoLog(dto: logInput): logEntity {
        return {
            mail: dto.mail,
            password: dto.password
        }
    }

    public fromDtoSing(dto: singInput): singEntity {
        return {
            name: dto.name,
            mail: dto.mail,
            password: dto.password,
            role: dto.role
        }
    }

    public toEntity(dto: sessionDto): SessionEntity {
        return {
            idUser: dto.idUser,
            name: dto.name,
            email: dto.email,
            message: dto.message,
            token: dto.token
        }
    }

    public toDto(entity: SessionEntity): sessionDto {
        return {
            idUser: entity.idUser,
            name: entity.name,
            email: entity.email,
            message: entity.message,
            token: entity.token
        }
    }
}