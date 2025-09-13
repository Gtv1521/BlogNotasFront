// infrastructure/tokens/crud.token.ts
import { InjectionToken } from '@angular/core';
import IUser from '../../domain/ports/crud.port';
import { User } from '../../domain/models/user.model';
import { userDto } from '../../aplication/dtos/user.dto';

export const USER_CRUD_TOKEN = new InjectionToken<IUser<User>>('USER_CRUD_TOKEN');
