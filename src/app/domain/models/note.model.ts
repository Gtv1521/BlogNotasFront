export interface NoteEntity {
    readonly idNote: string | null,
    title: string,
    contenido: string,
    idUser: string,
    idLibreta: string | null,
    fechaCreacion: Date | null,
    fechaUpdate: Date | null
}