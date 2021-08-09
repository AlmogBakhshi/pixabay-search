import React from 'react';
import { useHistory } from 'react-router-dom';
import { IImage } from '../../../store/Images';
import ImageDetails from './image_details';

interface Props {
    image?: IImage,
    onDelete?: (id: number) => void,
    onAdd?: (image: IImage) => void,
    addImage?: boolean,
}

const Card: React.FC<Props> = ({ image, onDelete, onAdd, addImage }) => {
    const history = useHistory();

    const ShowAddImage = () => {
        return (
            <div className='card__add' onClick={() => history.push('/search')}>Add Image</div>
        );
    }

    return (
        <div className='card' >
            <ImageDetails image={image} onDelete={onDelete} onAdd={onAdd} />
            {addImage && <ShowAddImage />}
        </div>
    );
}

export default Card;