import { create } from 'zustand';

interface BoardStore {
    title: string;
    contents: string;
    images: File[];

    setTitle: (title: string) => void;
    setContents: (contents: string) => void;
    setImages: (images: File[]) => void;

    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    title: '',
    contents: '',
    images: [],

    setTitle: (title: string) => {set((state) => ({ ...state, title }))},
    setContents: (contents: string) => {set((state) => ({ ...state, contents }))},
    setImages: (images: File[]) => {set((state) => ({ ...state, images }))},

    resetBoard: () => {set((state) => ({ ...state, title: '', contents: '', images: [] }))}
}));

export default useBoardStore;