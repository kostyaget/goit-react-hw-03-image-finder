import s from "./Searchbar.module.css";
import { toast } from "react-toastify";
import { Component } from 'react';

class Searchbar extends Component {
    state = {
        searchQuery: ''
    };

    handleQueryChange = event => {
        this.setStage({ searchQuery: event.currentTarget.value.toLoverCase() });
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
        <span className={s.button-label}>Search</span>
    </button>

        <input
            className={s.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
        />
    </form>
</header>
)}
}