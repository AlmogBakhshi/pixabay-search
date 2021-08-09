import { makeAutoObservable } from 'mobx';

export interface IImage {
    id: number,
    previewURL: string,
    user: string
}

class Images {
    constructor() {
        makeAutoObservable(this);

        const imagesStorage = localStorage.getItem('images');
        if (this.images.length === 0) {
            imagesStorage && this.setFavoriteImages(JSON.parse(imagesStorage));
        }
    }

    images: IImage[] = [];
    totalHits: number = 0;
    selectedPage: number = 1;
    totalPerPage: number = 30;
    searchText: string = '';
    favoriteImages: IImage[] = [];

    setSelectedPage = (page: number) => {
        this.selectedPage = page;
    }

    addImage = (image: IImage) => {
        this.favoriteImages = [...this.favoriteImages, image];
        this.updataLocalStorage(this.favoriteImages);
    }

    deleteImage = (id: number) => {
        this.favoriteImages = this.favoriteImages.filter(data => data.id !== id);
        this.updataLocalStorage(this.favoriteImages);
    }

    setImages = (images: IImage[]) => {
        this.images = [...images];
    }

    setTotalHits = (count: number) => {
        this.totalHits = count;
    }

    setFavoriteImages = (images: IImage[]) => {
        this.favoriteImages = [...images];
    }

    setSerchText = (text: string) => {
        this.searchText = text;
        this.setSelectedPage(1);
    }

    fetchImages = (pager?: boolean) => {
        fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=${this.searchText}&image_type=photo&per_page=${this.totalPerPage}&page=${pager ? this.selectedPage : '1'}`)
            .then(res => res.json())
            .then((res: any) => {
                const images: IImage[] = res.hits.map((data: any) => ({
                    id: data.id,
                    previewURL: data.previewURL,
                    user: data.user
                }))
                this.setImages(images)
                this.setTotalHits(res.totalHits);
            })
            .catch(err => console.error(err))
    }

    updataLocalStorage = (images: IImage[]) => {
        localStorage.setItem('images', JSON.stringify(images));
    }
}

export default new Images();