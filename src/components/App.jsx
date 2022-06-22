import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './modal228';

import s from './App.module.css';

const API_KEY = '28110044-3839a7ba2829cb27452711db2';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    searchQuery: '',
    data: [],
    loading: false,
    page: 0,
    showModal: false,
    largeImageURL: '',
    isVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevPage !== nextPage || prevQuery !== nextQuery) {
      this.setState({ loading: true });
      fetch(
        `${BASE_URL}?q=${this.state.searchQuery}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (!response.ok) {
            throw Error('Oops, there is no image with your search query');
          }
          return response.json();
        })
        .then(response => {
          if (response.totalHits - this.state.page * 12 < 12) {
            this.setState({ isVisible: false });
          }
          if (response.hits.length === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            this.setState({ loading: false });
            return;
          }
          this.setState(prevState => ({
            data: [...prevState.data, ...response.hits],
            loading: false,
          }));
        })
        .catch(error => toast.error(`${error}`));
    }
  }


  handleFormSubmit = ({ searchQuery }) => {
    this.setState({ searchQuery, data: [], page: 1, isVisible: true });
  };

  handleButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = largeImageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: largeImageURL,
    }));
  };


  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.data.length !== 0 && (
          <ImageGallery data={this.state.data} onClick={this.toggleModal} />
        )}
        <div className={s.centeredBox}>
          {this.state.loading && <Loader />}
          {this.state.isVisible && (
            <Button onClick={this.handleButtonClick} />
          )}
        </div>
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            alt={this.state.searchQuery}
            onClose={this.toggleModal}
          />
        )}
        <ToastContainer autoClose={1500} position="top-center" />
      </div>
    );
  }
}

export default App;

