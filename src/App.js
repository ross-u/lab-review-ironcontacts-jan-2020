import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";

class App extends Component {
  constructor() {
    super();

    // EXAMPLE OF BINDING
    // this.sortByPopularity = this.sortByPopularity.bind(this);
  }
  state = {
    contactList: contacts.splice(0, 5)
  };

  addRandomContact = () => {
    const contactListCopy = [...this.state.contactList];

    const randomNumber = Math.floor(Math.random() * contacts.length);
    const randomContactArr = contacts.splice(randomNumber, 1);
    const randomContact = randomContactArr[0];

    contactListCopy.unshift(randomContact);

    this.setState({ contactList: contactListCopy });
  };

  compare = key => (a, b) => {
    // Use toUpperCase() to ignore character casing
    const A = a[key];
    const B = b[key];

    let comparison = 0;
    if (A > B) comparison = 1;
    else if (A < B) comparison = -1;
    return comparison;
  };

  /*   function compare (key) {
    return function(a, b) {
          const A = a[key];
          const B = b[key];
    
          let comparison = 0;
          if (A > B) comparison = 1;
          else if (A < B) comparison = -1;
          return comparison;
    }
  } */

  sortContacts = propertyName => {
    const sortedContacts = this.state.contactList.sort(
      this.compare(propertyName)
    );

    this.setState({ contactList: sortedContacts });
  };

  deleteContact = contactIndex => {
    const contactsCopy = [...this.state.contactList];

    contactsCopy.splice(contactIndex, 1);

    this.setState({ contactList: contactsCopy });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.addRandomContact}>Add Random Contact</button>
        <button onClick={() => this.sortContacts("popularity")}>
          Sort By Popularity
        </button>
        <button onClick={() => this.sortContacts("name")}>Sort By Name</button>

        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>

          <tbody>
            {this.state.contactList.map((contactObj, index) => {
              return (
                <tr key={contactObj.id}>
                  <td>
                    <img src={contactObj.pictureUrl} alt="" width="150" />
                  </td>
                  <td>{contactObj.name} </td>
                  <td>{contactObj.popularity} </td>
                  <td>
                    <button onClick={() => this.deleteContact(index)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
