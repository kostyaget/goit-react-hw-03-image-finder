import ImageGalleryItem from 'components/ImageGalleryItem';
import propTypes from 'prop-types';
import React from 'react';
import s from './ImageGallery.module.css';

const ImageGallery = ({ data, onClick }) => (
    <ul className={s.gallery}>
        {data.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                alt={tags}
                onClick={onClick}
            />
        ))}
    </ul>
);
ImageGallery.propTypes = {
    data: propTypes.array.isRequired,
    onClick: propTypes.func.isRequired,
};

export default ImageGallery;