import React, { Component } from 'react';
import Home from '../layout/Home';
import 'whatwg-fetch';

export default class Main extends Component {
    constructor() {
        super();

        this.getData = this.getData.bind(this);

        this.state = {
            message: ''
        };
    }

    async getData() {
        const res = await fetch('/api/test');
        const { data } = await res.json();

        this.setState({
            message: data
        });
    }

    render() {
        return (
            <Home _getData={this.getData} message={this.state.message} />
        );
    }
}
