import React, { Component } from 'react'
import Aux from '../../../hoc/Auxi'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
    componentDidUpdate(){
        console.log('[OrderSummary] willupdate')
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
    })
        return(
            <Aux>
                <h3>your order</h3>
                <p>Burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Checkout</p>
                
                <Button 
                clicked={this.props.purchaseCancelled} 
                btnType='Danger'>Cancel</Button>
                <Button  
                clicked={this.props.purchaseContinued}
                btnType='Success'>Continue</Button>
            </Aux>
        )
    }
    
    
}

export default OrderSummary