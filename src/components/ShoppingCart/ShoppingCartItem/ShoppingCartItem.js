import React, {useState, useEffect} from 'react';
import {Row, Col, Button} from "react-bootstrap";
import './ShoppingCartItem.sass'

const ShoppingCartItem = ({ dish, changeAmount, index}) => {

    const plusButtonClick = () => {
        changeAmount(index, dish.amount);
        UpdateSession(dish.dishId, dish.amount + 1)
    }

    const minusButtonClick = () => {
        changeAmount(index, dish.amount);
        UpdateSession(dish.dishId, dish.amount - 1)
    }



    function UpdateSession(dishID, amount) {
        console.log("Update Session")
        let shoppingCartList = JSON.parse(sessionStorage.getItem("ShoppingCartList"));

        if (shoppingCartList != null) {
            const dish = shoppingCartList.find(x => x.dishId === dishID)
            if (dish != null) {
                dish.amount = amount
            } else {
                shoppingCartList.push({dishId: dishID, amount: amount});
            }
        } else {
            shoppingCartList = [{dishId: dishID, amount: amount}];
        }

        shoppingCartList = shoppingCartList.filter(i => i.amount > 0);
        sessionStorage.setItem("ShoppingCartList", JSON.stringify(shoppingCartList));
    }

    function renderCartItem()
    {
        return (
            <div>
                <hr className="shoppingcartitem-hr"/>
                <Row>
                    <Col>
                        <h4>{dish.name}</h4>
                    </Col>
                    <Col className="price">
                        <h4>{dish.price * dish.amount}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>{dish.description}</h5>
                    </Col>
                </Row>
                <Row>
                    <div className="shoppingcartitem-button-wrapper">
                        <h5 className="dish-amount">{dish.amount}</h5>
                        <Button className="shoppingcartitem-button" onClick={() => minusButtonClick()}>-</Button>
                        <Button className="shoppingcartitem-button" onClick={() => plusButtonClick()}>+</Button>
                    </div>

                </Row>
            </div>
        );
    }

    return (
        renderCartItem()
    );
};

export default ShoppingCartItem;