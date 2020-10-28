import React, { Component, Fragment } from 'react';
import '../style.css';
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import {Link,Redirect,withRouter} from 'react-router-dom';
import Alert from '../../../common/alert';

class RegisterForm extends Component {
    render() {
        const {onChange,Fname,Lname,Email,Pnumber,Address,OAddress,City,Postcode,Country,Password,Repassword,ifRegSuccHint,isLogin,logout,regSucc,CityList} = this.props;
        let states = ''; 
        if((parseInt(Postcode)>=2600 && parseInt(Postcode)<=2618) ||(parseInt(Postcode)>=2900&&parseInt(Postcode)<3000) ){
            states = 'ACT';
        }
        if((parseInt(Postcode)>=2000&& parseInt(Postcode)<2600)||(parseInt(Postcode)>2618&&parseInt(Postcode)<2900)){
            states = 'NSW';
        }
        switch (Postcode[0]){
            case '0':
                states = 'NT';
                break   
            case '4':
                states = 'QLD'
                break
            case '5':
                states = 'SA'
                break
            case '3':
                states = 'VIC'
                break
            case '7':
                states = 'TAS'
                break
            case '6':
                states = 'WA'
                break
        }
            return (
            <Fragment>
                {
                    sessionStorage.getItem('isLogin') === 'true'? 
                    <Alert handleAlertClick={this.handleAlertClick} alertmsg='Account registered successfully!' btn='Continue shopping'/>
                    :null
                }
            <div className="card">
            <div className="card-body">
            <div className="mb-4">
                <h4 className="card-title">Sign up</h4>
            </div>
            <form onSubmit={this.handleSubmit.bind(this,states)}>
                <div className="form-row">
                    <div className="col form-group">
                        <label>First name</label>
                          <input type="text" className="form-control" placeholder=""  name="Fname" onChange={onChange} value={Fname} required/>
                    </div> 
                    <div className="col form-group">
                        <label>Last name</label>
                          <input type="text" className="form-control" placeholder=""  name="Lname" onChange={onChange} value={Lname} required/>
                    </div> 
                </div> 
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder=""  name="email" onChange={onChange} value={Email} required/>
                    {
                        ifRegSuccHint? null:<div className="form-text accHint">This account has already existed!</div>
                    }
                    <div className="form-text text-muted">We'll never share your email with anyone else.</div>
                </div> 
                <div className="form-group">
                    <label>Contact number</label>
                    <input type="number"  className="form-control"
                    pattern="^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$" 
                    name="Pnumber" onChange={onChange} value={Pnumber} required>
                    </input>
                </div> 
                <div className="form-group">
                    <label>Post to address</label>
                    <input type="text" className="form-control" placeholder=""  name="address" onChange={onChange} value={Address} required/>
                </div> 
                <div className="form-group">
                    <label>Additional address information (Optional)</label>
                    <input type="text" className="form-control" placeholder=""  name="Oaddress" value={OAddress} onChange={onChange}/>
                </div> 
                <div className="form-row">
                   <div className="form-group col-md-6">
                    <label>Postcode</label>
                        <input type="text" className="form-control" placeholder=""  name="postcode" onChange={onChange} value={Postcode} onBlur = {this.props.handlePostCodeBlur} required/>
                        {
                        CityList[0] === 'does not exist'?<div className="form-text accHint">Postcode does not exist!</div>:null
                        }
                    </div>

                    <div className="form-group col-md-6">
                      <label>State</label>
                      <input type="text" className="form-control" placeholder=""  name="state"  value={states} disabled/>
                    </div> 
                </div> 
                <div className="form-row">
                <div className="form-group col-md-6">
                      <label>Suburb</label>
                      {
                          CityList[0] === 'does not exist'?<select id="inputSuburb" className="form-control"  name="city" value={City} required>
                          {
                                  <option value='' >does not exist</option>
                          }
                           
                       </select>:<select id="inputSuburb" className="form-control"  name="city" onChange={onChange} value={City} required>
                         {
                             CityList.map((item,index)=>(
                                 <option value={item} key={index}>{item}</option>
                             ))
                         }
                          
                      </select>
                      }
                      
                    </div> 
                    <div className="form-group col-md-6">
                      <label>Country</label>
                      <select id="inputCountry" className="form-control"  name="country" onChange={onChange} value={Country} required>
                        {/* <option> Choose...</option> */}
                          <option value="Australia">Australia</option>   
                      </select>
                    </div> 
                </div> 


                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Create password</label>
                        <input className="form-control" type="password"  name="password" onChange={onChange} value={Password} onBlur={this.props.handleBlur} required/>
                        {this.props.pwd_strong?null:<div className="form-text accHint">Password must have at least 8 characters with numbers and letters!</div>}
                    </div>  
                    <div className="form-group col-md-6">
                        <label>Repeat password</label>
                        <input className="form-control" type="password" name="Repassword" onChange={onChange} value={Repassword} onFocus={this.props.handleFocus} onBlur={this.props.handleBlur} required/>
                        {this.props.pwd_match?null: <div className="form-text accHint">Password doesn't match!</div>}
                       
                    </div> 
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary btn-block" > Register  </button>
                </div>   
                <p className="text-muted regHint">By clicking the 'Register' button, you confirm that you accept our Terms of use and Privacy Policy.</p>                                          
            </form>
            <hr />
            <p className="text-center regQuery">Have an account? <Link to="/login" className="register">Login</Link></p>
            </div>
            </div>
                    </Fragment>
                          )}
    
    handleSubmit = (states,e)=>{
        this.props.handleSubmit(states,e);
    }
    handleAlertClick=()=>{
        this.props.history.push('/')
    }
}

export default withRouter(RegisterForm);