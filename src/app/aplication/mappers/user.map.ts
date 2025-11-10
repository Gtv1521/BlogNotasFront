import { of } from "rxjs";
import { User } from "../../domain/models/user.model";
import { userDto } from "../dtos/user.dto";

export class UserMapper {
    fromDto(dto: userDto): User {
        return {
            id: dto.idUser,
            name: dto.name,
            email: dto.email,
            role: dto.role   
        }
    }

    toDto(user: User): Partial<userDto> {
        return {
            email: user.email,
            name: user.name
         };
    }

    aDto(user: User): userDto {
        if(user.id !== undefined) {
            return {
                idUser: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
        }
        
        return {
            idUser: '',
            name: '',
            email: '',
            role: ''
        };
    }
}
