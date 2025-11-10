import { InjectionToken } from "@angular/core";
import { ReferenceEntity, ReferenceWithNoteEntity } from "@app/domain/models/reference.model";
import { IReference } from "@app/domain/ports/crud.port";

export const REFERENCE_TOKEN = new InjectionToken<IReference<ReferenceEntity, ReferenceWithNoteEntity>>('REFERENCE_TOKEN'); 