import s from "./Searchbar.module.css";
import { toast } from "react-toastify";
import { Component } from 'react';

class Searchbar extends Component {
    state = {
        searchQuery: ''
    };

    handleQueryChange = event => {
        this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.searchQuery.trim() === '') {
            toast.info('Enter your query for searching')
            return;
        }
        this.props.onSubmit(this.state);
        this.setState({ searchQuery: '' });
    }


render(){
return (
<header className={s.searchbar}>
    <form className={s.form} onSubmit={this.handleSubmit}>
    <button type="submit" className={s.button}>
        <span className={s.label}>Search</span>
    </button>

        <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
        />
    </form>
</header>
)}
};

export default Searchbar;