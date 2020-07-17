import React from 'react';

const Inventory = () => {
    const handleAddInventory = () => {
        alert('invertory coming.....')
    }
    return (
        <div>
            <h2>Add more product to sell...</h2>
            <button onClick={handleAddInventory}>Add Invetory</button>
        </div>
    );
};

export default Inventory;