import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function isSearched(searchTerm) {
  return function (item) {
  return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
  }
class App extends Component {
 constructor(props){
        super(props);
        this.state = {
            items : [],
            searchTerm: '',
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    onSearchChange(event) {
      this.setState({ searchTerm: event.target.value });
    }    
    componentWillMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then( data => this.setState({ items : data }) );
    }

    render() {

       const { items } = this.state;

        return (
          <div className="App">
            <form>
              <input type="text" onChange={this.onSearchChange} placeholder="Search By Title"/>
            </form>
            <ul>
                {this.state.items.filter(isSearched(this.state.searchTerm)).map(item =>
                    <li key={items}>
                        <span><h2>{item.id}</h2></span>
                        <span><h3>{item.title}</h3></span>
                        <span><p>{item.body}</p></span>
                    </li>
                )}
            </ul>
          </div>
        );
    }
  }
export default App;
