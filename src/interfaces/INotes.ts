export interface INotes {
    idNote: string | null,
    title: string,
    contenido: string,
    idUser: string | null,
    idLibreta: string,
    fechaCreacion: string | null,
    fechaUpdate: string | null
}

export interface INewNote {
    title: string,
    contenido: string,
    idUser: string,
    idLibreta: string
} 