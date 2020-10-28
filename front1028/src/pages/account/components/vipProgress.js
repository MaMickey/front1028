import React, { Component } from 'react';
import {withRouter,Link} from 'react-router-dom';
import { faCrown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class vipProgress extends Component {
    render() {
        const {userInfo, vipLevel, vipConsumption} = this.props;
        let vipRule = {
            '0':0,
            '1':1000,
            '2':2000,
            '3':3000,
            '4':5000,
            '5':10000
        }
        let vipArr = [];
        let vipArrleft = [];
        for(let i =0;i<parseInt(vipLevel);i++){
            vipArr.push(i+1)
        }
        for(let i=0;i<5-parseInt(vipLevel);i++){
            vipArrleft.push(parseInt(vipLevel)+i+1)
        }
        return (
            <div className="vipWrapper">
            <div className="card">
            <div className="card-header"><h6>VIP progress</h6></div>
            <div className="card-body">
            <div className="card">
                <div className="card-body row no-gutters">
                    <div className="col">
                        <strong>Your account:</strong> <br />{userInfo[0].Email}
                    </div>
                    <div className="col">
                        <strong>Current VIP status:</strong> <br /> VIP Level {vipLevel}
                    </div>
                    <div className="col">
                        <strong>Total consumption for current year:</strong> <br /> 
                        $ {vipConsumption.toFixed(2)}
                    </div>
                </div>
                <div className="card-body row no-gutters nextLevel">
                    <div className="col-12">
                    {
                        vipLevel === '5'?<strong>Highest Level</strong>:<strong>${(vipRule[`${parseInt(vipLevel)+1}`]-vipConsumption).toFixed(2)} left to the next VIP level !</strong>
                    }
                        
                    </div>
                </div>
            </div>
        <div className="tracking-wrap">
            {
                vipArr.map((item,index)=>(
                    index === vipArr.length-1?(<div className="step active" key={index}>
                    <span className="icon"> <FontAwesomeIcon icon={faUser} /></span>
                    <span className="text">VIP Level {item}</span>
                    </div>):
                    (<div className="step active" key={index}>  
                        <span className="icon"> <FontAwesomeIcon icon={faCrown} /></span>
                        <span className="text">VIP Level {item}</span>
                    </div>)
                ))
            }
            {
                vipArrleft.map((item,index)=>(
                    <div className="step" key={index}>
                        <span className="icon"> <FontAwesomeIcon icon={faCrown} /></span>
                        <span className="text">VIP Level {item}</span>
                    </div>
                ))
            }
            
            </div>
        </div>         
        </div>
    </div>
    );
    }
}

export default withRouter(vipProgress);