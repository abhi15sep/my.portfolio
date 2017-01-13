import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
