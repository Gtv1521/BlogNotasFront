export interface INotes {
    _id: string,
    Title: string,
    Contenido: string,
    IdUser: string,
    IdLibreta: string,
    FechaCreacion: string,
    FechaUpdate: string
}

export interface INewNote {
    title: string,
    contenido: string,
    idUser: string,
    idLibreta: string
} 