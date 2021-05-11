import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import "./DishesByCategory.sass"

const DishItem = ({ dishID, Name, ImageLink, Description }) => {

    var [amount, setAmount] = useState(0);
    const [ID, setID] = useState(dishID);
    const plusButtonClick = e => {
        setAmount(++amount);
        UpdateSession();
    }

    const minusButtonClick = e => {
        setAmount(--amount);
        UpdateSession();
    }

    function UpdateSession()
    {
        let shoppingCartList = JSON.parse(sessionStorage.getItem("ShoppingCartList"));
        var alreadyExists = false;

        if(shoppingCartList != null)
        {
            for(var shoppingCartItem of shoppingCartList)
            {
                if(shoppingCartItem.id === ID)
                {
                    shoppingCartItem.amount = amount;
                    alreadyExists = true;
                }
            }

            if(!alreadyExists)
            {
                shoppingCartList.push({id: ID, amount: 1});
                alreadyExists = true;
            }
        }

        else
        {
            if(!alreadyExists)
            {
                shoppingCartList = [{id: ID, amount: 1}];
            }
        }

        shoppingCartList = shoppingCartList.filter(i => i.amount > 0);

        sessionStorage.setItem("ShoppingCartList", JSON.stringify(shoppingCartList));
    }

    return (

        <Card>
            <Card.Header>{Name}</Card.Header>
            <Card.Img className='card-image' src={ImageLink} />
            <Card.Body className="card-body">
                <Card.Text>{Description}</Card.Text>
                {amount != "0" && <Button className="minus-button"  onClick={minusButtonClick}>-</Button>}
                <Card.Text className="dish-amount">{amount}</Card.Text>
                <Button className="plus-button" onClick={plusButtonClick}>+</Button>
            </Card.Body>
        </Card>
    );
}

export default DishItem