import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import '../style.css';
import {
    faCommentDots,
    faTruck,
    faStar,
    faChevronCircleRight
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Notice extends Component {
  render() {
    return (
      <Fragment>
      <div className="row">
        <div className="col-md-12 mb-2">
          <div className="card card-body bulkSale">
            <div className="sale">
            <span> Bulk sale opens now ! Join us to enjoy our special deal today.</span>
            <Link to="/"><span className="joinSale">Join now <FontAwesomeIcon icon={faChevronCircleRight}  className="white"/></span></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body noticeTitle">
            <div className="itemside">
              <div className="aside">
                <span className="icon-sm rounded-circle starBg">
                <FontAwesomeIcon icon={faStar}  className="white"/>
                </span>
              </div>
              <div className="info">
                <p className="title">Satisfy all your sports needs</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body noticeTitle">
            <div className="itemside">
              <div className="aside">
                <span className="icon-sm rounded-circle bg-secondary">
                 <FontAwesomeIcon icon={faCommentDots} className="white"/>
                </span>
              </div>
              <div className="info">
                <p className="title">Considerate customer support </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body noticeTitle">
            <div className="itemside">
              <div className="aside">
                <span className="icon-sm rounded-circle truckBg">
                 <FontAwesomeIcon icon={faTruck}  className="white"/>
                </span>
              </div>
              <div className="info">
                <p className="title">Fast delivery to your home</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default Notice;
