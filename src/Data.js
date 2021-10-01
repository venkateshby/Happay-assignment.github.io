import React, { Component } from 'react'

export class Data extends Component {

    async componentDidMount() {
        const url = "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/items.json";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <div>
                HI
            </div>
        )
    }
}

export default Data
