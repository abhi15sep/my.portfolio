import React from 'react';

export default class App extends React.Component {
   render() {
        console.log(this.props.location.pathname);

        return(
            <div className='App'>
                <div className='content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
