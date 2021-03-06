import React, {Component} from 'react'
import Aux from '../../hoc/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'
const INGREDIENT_PRICES = {
            salad: 0.5,
            bacon: 0.4,
            cheese: 1.3,
            meat: 0.7
}

class BurgerBuilder extends Component {
    state={
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount(){
        console.log(this.props.ings)
        // axios.get('https://burgermakerreactproject.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // })
        // .catch(error => {
        //     this.setState({error: true})
        // })
    }

    updatePurchaseState (ingredients) {
const sum  = Object.keys(ingredients)
.map(igKey => {
    return ingredients[igKey]
})
.reduce((sum, el) =>{return sum + el}, 0)
this.setState({
    purchasable: sum > 0
})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0){
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState( updatedIngredients)

    }
    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        
        const queryParams = []
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({pathname:'/checkout',
    search: '?' + queryString})
    }
    render () {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] =  disabledInfo[key] <= 0
        }
        let orderSummary = null
       
        
        let  burger = this.state.error ? <p>error loading ingredients</p> : <Spinner />
        if(this.props.ings){
            burger = (<Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                 ingredientAdded={this.props.onIngredientAdded}
                 ingredientRemoved={this.props.onIngredientRemoved}
                 disabled={disabledInfo}
                 price={this.state.totalPrice}
                 purchasable={this.state.purchasable}
                 ordered={this.purchaseHandler}/>
            </Aux>)
             orderSummary =  <OrderSummary 
             ingredients={this.props.ings}
             price={this.state.totalPrice}
             purchaseCancelled={this.purchaseCancelHandler}
             purchaseContinued={this.purchaseContinueHandler}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return (
           <Aux>
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
               </Modal>
            {burger}
           </Aux>
        )
    }
}
const mapStatetoProps = state => {
    return {
        ings: state.ingredients
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler( BurgerBuilder, axios))