import React from 'react'
import { MuiThemeProvider, RaisedButton, Drawer, List, Subheader, Divider } from 'material-ui'
import { Badge } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { CartElement } from './cart.element'

export class CartView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cartOpen: false
    }
  }

  handlerCartToggle() {
    this.setState({cartOpen: !this.state.cartOpen})
  }

  handleCheckout() {
    this.setState({ cartOpen: false })
    browserHistory.push('/app/product/checkout')
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <RaisedButton label="Shopping Cart"
                        labelPosition="before"
                        backgroundColor="#252f3e"
                        labelColor="yellow"
                        labelStyle={{fontWeight: "bolder", textTransform: "capital"}}
                        icon={<Badge>{this.props.cart.length}</Badge> }
                        onTouchTap={() => this.handlerCartToggle()}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer
            docked={false}
            width={450}
            openSecondary={true}
            open={this.state.cartOpen}
            onRequestChange={() => this.handlerCartToggle()}
          >
            <List>
              <Subheader style={{color: "black", fontSize: "25px"}}>Your Shopping's Cart</Subheader>
              {
                this.props.cart.map(product => {
                  let { productName, productPrice, productUrl } = product

                  return (
                    <CartElement
                      id={product.id}
                      product={{ productName, productPrice, productUrl }}
                      deleteProductCart={this.props.deleteProductCart}
                    />
                  )
                })
              }
              <Divider />
              { !this.props.authenticate.authenticated
              && <p style={{margin: "20px 0 0 40%", color: "red", fontWeight: "bolder"}}>
                *You need to sign in before checkout</p>
              }
              {
                this.props.authenticate.authenticated
                && <RaisedButton label="Proceed to checkout"
                                 labelPosition="before"
                                 backgroundColor="#252f3e"
                                 labelColor="white"
                                 style={{margin: "10px 0 0 50%"}}
                                 onTouchTap={() => this.handleCheckout()}
                                 disabled={!this.props.authenticate.authenticated}
                />
              }
              <RaisedButton label="Close"
                            labelPosition="before"
                            labelColor="white"
                            secondary={true}
                            style={{margin: "10px 0 0 76%"}}
                            onTouchTap={() => this.handlerCartToggle()}
              />
            </List>
          </Drawer>
        </MuiThemeProvider>
      </div>
    )
  }
}

CartView.propTypes = {
  cart: React.PropTypes.array.isRequired,
  deleteProductCart: React.PropTypes.func.isRequired,
  authenticate: React.PropTypes.object.isRequired
}
