export interface Data {
    id: string,
    created_at: string,
    user: {
        name: string
    },
    likes: number,
    alt_description: string,
    urls: {
        small: string,
        regular: string
    }

}

export type SelectedImage = {
    url: string,
    alt: string,
    date: string,
    like: number,
    username: string
}

export type ButtonProps = {
    onSubmit: () => Promise<void>
}

export type Response = {
    results: Data[]
}

export type SearchBarProps = {
    onSubmit: (newQuery: string, page?: number) => Promise<void>
}

export type ImageGalleryProps = {
  data: Data[]; 
  onImageClick: (imageUrl: SelectedImage) => void;
};

export type ImageModalProps = {
    isOpen: boolean,
    onRequestClose: () => void,
    image: SelectedImage | null 
}