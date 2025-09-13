import { InjectionToken } from "@angular/core";
import { ISession } from "../../domain/ports/session.port";
import { logEntity, singEntity } from "../../domain/models/log.model";
import { sessionDto } from "../../aplication/dtos/session.dto";

export const SESSION_TOKEN = new InjectionToken<ISession<logEntity, singEntity, sessionDto>>('SESSION_TOKEN');