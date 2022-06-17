import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import s from './App.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28110044-3839a7ba2829cb27452711db2';

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
            throw Error('Oops, there is no image with your search query')
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
            data: [...prevState.data, ...response.hits], \
            loading: false,
          }))
        })
        .catch(error => toast.error(`${error}`));
    }
  }
  handleFormSubmit = ({ searchQuery }) => {
    this.setState({ searchQuery, data: [], page: 1, isVisible: true });
  };
  handleButtonClick = () => {
    this.setState(prevState.page + 1)
  }
}
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
