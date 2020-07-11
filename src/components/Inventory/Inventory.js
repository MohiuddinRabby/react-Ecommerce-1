import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddInventory = () => {
        const product = fakeData[0]
        console.log('before post', fakeData[0])
        fetch('http://localhost:3005/addProduct', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(fakeData) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(data => {
                console.log('post success', data)
            })


    }
    return (
        <div>
            <h2>Add more product to sell...</h2>
            <button onClick={handleAddInventory}>Add Invetory</button>
        </div>
    );
};

export default Inventory;