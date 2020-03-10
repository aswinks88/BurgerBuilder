import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            code: ''
        }
    }
    orderHandler = (event) => {
        event.preventDefault()
        // alert('continue')
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name:'aswin',
                address: {
                    street: 'princes ave',
                    postcode: '10456',
                    country: 'NZ'
                },
            email: 'asdasdas@gmail.com'
            },
            deliveryMethod: 'express'
        }
        axios.post('/orders.json', order)
        .then(response => 
       { 
            this.setState({loading: false})
            this.props.history.push('/')
       }
        )
        .catch(error => console.log(error),
        this.setState({loading: false}))
console.log(this.props.ingredients)
    }
    render(){
        let form = ( <form>
            <input type='text' className={classes.Input} name='name' placeholder='your name' />
            <input type='text' className={classes.Input} name='email' placeholder='your email' />
            <input type='text' className={classes.Input} name='street' placeholder='your street' />
            <input type='text' className={classes.Input} name='code' placeholder='your code' />
            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>)
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>enter contact details</h4>
               {form}
            </div>
        )
    }
}

export default ContactData