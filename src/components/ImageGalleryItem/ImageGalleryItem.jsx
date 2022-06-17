import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, alt, onClick }) => (
    <li class={s.gallery_item} onClick={() => onClick(largeImageURL)}>
        <img className={s.image} src={webformatURL} alt={alt} />
    </li>
);

ImageGalleryItem.PropTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;