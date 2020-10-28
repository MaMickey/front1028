import React, { Component,Fragment } from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../style.css'
class addressedit extends Component {
    render() {
        const from  = this.props.match.params.from;
        const {Address,suburbList,postcode,Pnumber} = this.props;
        let tempAddress = Address.slice();
        let dAddress = Object.assign({},tempAddress[0])
        console.log(dAddress)
        const {RN,ContactNumber,LastName,FirstName,PostCode,Address1,Address2,City,State} = dAddress;
        let states = State;      
        if((parseInt(postcode)>=2600 && parseInt(postcode)<=2618) ||(parseInt(postcode)>=2900&&parseInt(postcode)<3000) ){
            states = 'ACT';
        }
        if((parseInt(postcode)>=2000&& parseInt(postcode)<2600)||(parseInt(postcode)>2618&&parseInt(postcode)<2900)){
            states = 'NSW';
        }
        switch (postcode[0]){
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
            <div>                
            <div className="card">
            <div className="card-body">
            <div className="mb-4">
            { from.slice(0,4) ==='edit'?
                <h4 className="card-title">Edit address</h4>:<h4 className="card-title">Add new address</h4>
            }
            </div>
            <form onSubmit={this.handleFormSubmit.bind(this,RN,states)}>
                <div className="form-row">
                    <div className="col form-group">
                        <label>First name</label>
                          <input type="text" className="form-control" placeholder="" defaultValue={FirstName} name="Fname" required/>
                    </div> 
                    <div className="col form-group">
                        <label>Last name</label>
                          <input type="text" className="form-control" placeholder="" defaultValue={LastName} name="Lname" required/>
                    </div> 
                </div> 
                <div className="form-group">
                    <label>Contact number</label>
                    <input type="number"  className="form-control" defaultValue={ContactNumber} onChange={this.handlePnumberChange}
                    pattern="^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$" 
                    name="Pnumber"  required>
                    </input>
                </div> 
                <div className="form-group">
                    <label>Postal address</label>
                    <input type="text" defaultValue={Address1} className="form-control" placeholder=""  name="address"  required/>
                </div> 
                <div className="form-group">
                    <label>Additional address information (Optional)</label>
                    <input type="text" defaultValue={Address2} className="form-control" placeholder=""  name="Oaddress" />
                </div> 
                <div className="form-row">
                   <div className="form-group col-md-6">
                    <label>Postcode</label>
                        <input type="text" className="form-control" defaultValue={PostCode} placeholder=""  name="postcode" onChange={this.handlePostcodeChange} required/>
                        {suburbList.SubName[0] ==='does not exist'?<div className="form-text addAddressHint">Postcode does not exist!</div>:null}
                    </div>

                    <div className="form-group col-md-6">
                      <label>State</label>
                      <input type="text" className="form-control" placeholder=""  name="state"  value={states} disabled/>
                    </div> 
                </div> 
                <div className="form-row">
                <div className="form-group col-md-6">
                      <label>Suburb</label>

                          {/* CityList[0] === 'does not exist'?<select id="inputSuburb" className="form-control"  name="city" value={City} required>
                          {
                                  <option value='' >does not exist</option>
                          }
                           
                       </select>: */}
                       
                       <select id="inputSuburb" className="form-control"  name="city" required>
                         {
                             suburbList.SubName[0] === 'postcode does not exist'||suburbList.SubName[0] ==='does not exist'?<option value=''></option>:
                             <Fragment> 
                                 {
                                     this.props.postcode===''?<Fragment><option value={City}>{City}</option>{suburbList.SubName.map((item,index)=>(
                                        <option value={item} key={index}>{item}</option>
                                        ))} </Fragment>:suburbList.SubName.map((item,index)=>(
                                            <option value={item} key={index}>{item}</option>
                                            ))
                                 }
                                
                             </Fragment>
                         }
                          
                      </select>
                      
                    </div> 
                    <div className="form-group col-md-6">
                      <label>Country</label>
                      <select id="inputCountry" className="form-control"  name="country" required>
                        {/* <option> Choose...</option> */}
                          <option value="Australia">Australia</option>   
                      </select>
                    </div> 
                </div> 
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary btn-block" > Save  </button>
                </div>                                          
            </form>
            <hr />
            </div>
            </div>
            </div>
        );
    }
    handlePnumberChange = (e)=>{
        this.props.handlePnumberChange(e)
    }
    handlePostcodeChange = (e)=>{
        let value = e.target.value;
        this.props.handlePostcodeChange(value);
    }
    handleFormSubmit = (RN,states,e)=>{
      
        this.props.handleFormSubmit(RN,states,e)
        // console.log(formValue,'tada');
    }
}

export default withRouter(addressedit);