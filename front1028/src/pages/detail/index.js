import React, { Component } from 'react';
import {connect} from 'react-redux';
import Details from './components/details'
import Backtop from '../../common/backtop';
import {actionCreator} from '../detail/store';
import './style.css'
import { bindActionCreators } from 'redux';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';


class ProductInfo extends Component {
    
    render() {
        const {productInfo,quantity,outStock, thePostPrice} = this.props;
        let tempProductInfo = productInfo.slice();
        return (
        <div>
            {
                productInfo.length>0?<Details data={tempProductInfo[0]} image={tempProductInfo[1]?tempProductInfo[1].BLOBData:null}
                handleChange={this.handleChangeInput} 
                quantity={quantity} 
                outStock={outStock}
                thePostPrice={thePostPrice}
                handleClick={this.handleClickAddCart}
                handleAddClick={this.handleAddClick}
                handleMinusClick={this.handleMinusClick}/>:<div className="detailLoaderWrap"><Loader
                type="ThreeDots"
                color="#5499c7"
                height={300}
                width={100}
                timeout={90000}
                className='detailLoader'
              /></div>
            }
            <Backtop />
        </div>
        );
    }
    componentWillUnmount(){
        this.props.emptyQuantityAndDetailAction();
    }
    componentDidMount(){
        const productId = this.props.match.params.CustomLabel;
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
            this.props.detailAction(productId,email)
          }
        else{
        this.props.detailAction(productId,'0')
        }
        document.querySelector('body').scrollTo(0,0)
        
    }
    handleAddClick = ()=>{
        const {productInfo,quantity} = this.props;
        let tempProductInfo = productInfo.slice();
        const {thePostage,HunterBasicCharge,HunterMinCharge,HunterRate} = tempProductInfo[0];
        let productWeight = tempProductInfo[0]['D WEIGHT']
        let totalWeight = 0;
        let thePostPrice;
        totalWeight = totalWeight + productWeight * (quantity+1)
        if(thePostage!==0){
          let discountHunterRater = HunterRate - 0.23
          let TempostPrice = HunterBasicCharge + discountHunterRater * totalWeight
          if(TempostPrice > HunterMinCharge){
            thePostPrice = parseInt(TempostPrice/5)*5+5
            this.props.addQuantityAction(thePostPrice)
          }
          else{
            let FinalMinCharge = parseInt(HunterMinCharge/5)*5+5
            this.props.addQuantityAction(FinalMinCharge)
          }

        }else{
        this.props.addQuantityAction(thePostage)
        }
    }
    handleMinusClick = ()=>{
        const {productInfo,quantity} = this.props;
        let tempProductInfo = productInfo.slice();
        const {thePostage,HunterBasicCharge,HunterMinCharge,HunterRate} = tempProductInfo[0];
        let productWeight = tempProductInfo[0]['D WEIGHT']
        let totalWeight = 0;
        let thePostPrice;
        if(quantity>1){
            totalWeight = totalWeight + productWeight * (quantity-1)
        }else{
            totalWeight = totalWeight + productWeight * quantity
        }
        if(thePostage!==0){
            let discountHunterRater = HunterRate - 0.23
            let TempostPrice = HunterBasicCharge + discountHunterRater * totalWeight
            if(TempostPrice > HunterMinCharge){
              thePostPrice = parseInt(TempostPrice/5)*5+5
              this.props.minusQuantityAction(thePostPrice)
            }
            else{
              let FinalMinCharge = parseInt(HunterMinCharge/5)*5+5
              this.props.minusQuantityAction(FinalMinCharge)
            }
        }else{
           this.props.minusQuantityAction(thePostage)
        }
    }
    handleClickAddCart = (quantity,productInfo)=>{
        // let CustomLabel = productInfo[0].CustomLabel;
        if(quantity<=productInfo.Stock&&quantity!==0){
            this.props.AddToCartAction(quantity,productInfo)
        }
        else{
            this.props.outStockAction()
        }
    }
    handleChangeInput = (quantity)=>{
        this.props.setTextAction(quantity)

        const {productInfo} = this.props;
        let tempProductInfo = productInfo.slice();
        const {thePostage,HunterBasicCharge,HunterMinCharge,HunterRate} = tempProductInfo[0];
        let productWeight = tempProductInfo[0]['D WEIGHT']
        let totalWeight = 0;
        let thePostPrice;
        if(quantity>0){
            totalWeight = totalWeight + productWeight * quantity
            if(thePostage!==0){
                let discountHunterRater = HunterRate - 0.23
                let TempostPrice = HunterBasicCharge + discountHunterRater * totalWeight
                if(TempostPrice > HunterMinCharge){
                    thePostPrice = parseInt(TempostPrice/5)*5+5
                    this.props.setTextAction(quantity, thePostPrice)
                }
                else{
                    let FinalMinCharge = parseInt(HunterMinCharge/5)*5+5
                    this.props.setTextAction(quantity,FinalMinCharge)
                }
            }else{
                this.props.setTextAction(quantity, thePostage)
                }
        }else{
            this.props.setTextAction(quantity)
        }
    }
}
const mapStateToProps = (state,props)=>{
    return {
        productInfo:state.detailReducer.productInfo,
        quantity:state.detailReducer.quantity,
        outStock:state.detailReducer.outStock,
        thePostPrice: state.detailReducer.thePostPrice
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        addQuantityAction:bindActionCreators(actionCreator.addQuantityAction,dispatch),
        minusQuantityAction:bindActionCreators(actionCreator.minusQuantityAction,dispatch),
        detailAction:bindActionCreators(actionCreator.detailAction,dispatch),
        setTextAction:bindActionCreators(actionCreator.setTextAction,dispatch),
        AddToCartAction:bindActionCreators(actionCreator.AddToCartAction,dispatch),
        emptyQuantityAndDetailAction:bindActionCreators(actionCreator.emptyQuantityAndDetailAction,dispatch),
        outStockAction:bindActionCreators(actionCreator.outStockAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductInfo)); 