import { State } from '../../redux/state';
import { CartItem } from '../../contracts/cart/cartItem';
import { addItemToCart, editItemInCart, removeAllItems, removeItemFromCart } from '../../redux/modules/cart/action';

export interface IReduxFromStateProps {
  cartItems: Array<CartItem>;
}

export interface IReduxActionsProps {
  addItemToCart: (cartItem: CartItem) => void;
  editItemInCart: (cartItemIndex: number, cartItem: CartItem) => void;
  removeItemFromCart: (cartItemId: string) => void;
  removeAllItems: () => void;
}

export interface IReduxProps extends IReduxFromStateProps, IReduxActionsProps {}

export const mapStateToProps = (state: State): IReduxFromStateProps => {
  return {
    cartItems: state.cartReducer?.cartItems || [],
  };
};

export const mapDispatchToProps = (dispatch: any): IReduxActionsProps => {
  return {
    addItemToCart: (cartItem: CartItem) => {
      dispatch(addItemToCart(cartItem));
    },
    editItemInCart: (cartItemIndex: number, cartItem: CartItem) => {
      dispatch(editItemInCart(cartItemIndex, cartItem));
    },
    removeItemFromCart: (cartItemId: string) => {
      dispatch(removeItemFromCart(cartItemId));
    },
    removeAllItems: () => {
      dispatch(removeAllItems());
    },
  };
};
