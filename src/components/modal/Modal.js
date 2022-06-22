import { Component } from 'react';
import { createPortal }  from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    }

componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
}
handleKeyDown = event => {
    if (event.code === 'Escape') {
    this.props.onClose();
    }
};

handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
    this.props.onClose();
    }
    };

    render() {
    return createPortal(
        <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
        <img src={this.props.largeImageURL} alt={this.props.alt} />
        </div>
        </div>,
        modalRoot
    );
    }
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Modal;