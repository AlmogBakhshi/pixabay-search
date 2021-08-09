import React from 'react';
import { observer } from 'mobx-react';
import Store from '../../store';
import Container from '../container';
import Card from './card';

const Images = () => {
    const { imagesStore } = Store;

    const handleDeleteImage = (id: number) => {
        imagesStore.deleteImage(id);
    }

    return (
        <Container title='Favorite Images' className='favorite_images'>
            {imagesStore.favoriteImages.map(image => <Card key={image.id} image={image} onDelete={handleDeleteImage} />)}
            <Card addImage />
        </Container>
    );
}

export default observer(Images);