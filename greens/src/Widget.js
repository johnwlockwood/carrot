import React, { Component } from 'react';

class Widget extends Component
{
    render(){
        return (
            <div>
            <p><button onClick={(e) => this.props.fetchRandomNumber()}>fetch random</button></p>
            <p><b>{this.props.randomNumber} a little teacup</b></p>
            </div>
        )
    }
}

export default Widget
