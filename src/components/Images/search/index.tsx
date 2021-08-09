import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import Store from '../../../store';
import { IImage } from '../../../store/Images';
import { FaSearch } from 'react-icons/fa';
import Container from '../../container'
import Button from '../../button';
import Card from '../card';

const SearchImages = () => {
    const history = useHistory();
    const { imagesStore } = Store;

    const handleSetSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        imagesStore.setSerchText(e.target.value);
    }

    const handleSearch = () => {
        imagesStore.fetchImages();
    }

    const handleDeleteImage = (id: number) => {
        imagesStore.deleteImage(id);
    }

    const handleAddImage = (image: IImage) => {
        imagesStore.addImage(image);
    }

    const handleSelectPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleSelectPageSize(e, 1);
        imagesStore.setSelectedPage(parseInt(e.target.value));
        imagesStore.fetchImages(true);
    }

    const handleSelectPageSize = (e: React.ChangeEvent<HTMLSelectElement>, size: number) => {
        e.currentTarget.size = size;
    }

    return (
        <Container title='Search Images' className='search_images' goBackTo={() => history.replace('/')}>
            <div className='search_images__search'>
                <input type='text' placeholder='Search Text' value={imagesStore.searchText} onChange={handleSetSearchText} />
                <Button title='Search' icon={<FaSearch size='1em' />} onClick={handleSearch} />
            </div>
            <div className='search_images__images'>
                {imagesStore.images.map(image =>
                    imagesStore.favoriteImages.some(favoritImage => favoritImage.id === image.id) ?
                        <Card key={image.id} image={image} onDelete={handleDeleteImage} /> :
                        <Card key={image.id} image={image} onAdd={handleAddImage} />
                )}
            </div>
            <div className='search_images__pageing'>
                {imagesStore.totalHits > 0 &&
                    <select value={imagesStore.selectedPage} onFocus={e => handleSelectPageSize(e, 4)}
                        onBlur={e => handleSelectPageSize(e, 1)} onChange={handleSelectPage}>
                        {[...Array(Math.ceil(imagesStore.totalHits / imagesStore.totalPerPage))].map((item, index) =>
                            <option key={index} value={index + 1} >{index + 1}</option>)}
                    </select>}
            </div>
        </Container>
    );
}

export default observer(SearchImages);