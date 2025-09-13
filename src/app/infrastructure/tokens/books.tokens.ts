import { InjectionToken } from "@angular/core";
import { IBook } from "../../domain/ports/crud.port";
import { BookEntity } from "../../domain/models/noteBooks.model";

export const BOOK_TOKEN = new InjectionToken<IBook<BookEntity>>('BOOK_TOKEN');