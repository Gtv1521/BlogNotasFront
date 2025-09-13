import { User } from "../../domain/models/user.model";
import { userDto } from "../dtos/user.dto";

export class UserMapper {
    public fromDto(dto: userDto): User {
        return {
            id: dto.idUser,
            name: dto.name,
            email: dto.email,
            rol: dto.role   
        }
    }

    public toDto(user: User): Partial<userDto> {
        return {
            email: user.email,
            name: user.name
         };
    }
}