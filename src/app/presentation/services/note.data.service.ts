export class NoteDataService {
  private storageKey = 'noteData';

  private data: initNota = {
    idLibreta: '',
    idNota: ''
  };

  constructor() {
    const saved = sessionStorage.getItem(this.storageKey);
    if (saved) {
      this.data = JSON.parse(saved);
    }
  }

  setNote(data: initNota) {
    this.data = data;
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getNote() {
    return this.data;
  }

  clearNote() {
    this.data = { idLibreta: '', idNota: '' };
    sessionStorage.removeItem(this.storageKey);
  }
}

export class initNota {
  constructor(
    public idNota: string | null,
    public idLibreta: string
  ) {}
}