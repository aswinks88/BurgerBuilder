import React from 'react'
import Aux from '../../../hoc/Auxi'
import Button from '../../UI/Button/Button'
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })
    return(
        <Aux>
            <h3>your order</h3>
            <p>Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Checkout</p>
            
            <Button 
            clicked={props.purchaseCancelled} 
            btnType='Danger'>Cancel</Button>
            <Button  
            clicked={props.purchaseContinued}
            btnType='Success'>Continue</Button>
        </Aux>
    )
}

export default orderSummary