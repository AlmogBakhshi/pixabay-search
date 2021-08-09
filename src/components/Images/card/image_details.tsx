import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IImage } from '../../../store/Images';

interface Props {
    image?: IImage,
    onDelete?: (id: number) => void,
    onAdd?: (image: any) => void,
}

const Details: React.FC<Props> = ({ image, onDelete, onAdd }) => {
    const ShowOnDelete = () => {
        return (
            onDelete ? <>
                <FaRegTrashAlt className='card__details__delete' size='1em' onClick={() => onDelete(image?.id || 0)} />
                <div className='card__details__owner'>{image?.user}</div>
            </> : null
        );
    }

    const ShowOnAdd = () => {
        return (
            onAdd ? <div className='card__details__add' onClick={() => onAdd(image || null)}>Add</div> : null
        );
    }

    return (
        onDelete || onAdd ? <>
            <img src={image?.previewURL} alt={image?.user || ''} />
            <div className='card__details'>
                <ShowOnDelete />
                <ShowOnAdd />
            </div>
        </> : null
    );
}

export default Details;