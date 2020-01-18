import React, {Component} from 'react'
import "./SnsGetStarsPopup.css"

export default class SnsGetStarsPopup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const { data } = this.props;
        return (
            this.props.isShow && <div className="SnsGetStarsPopup-snsPopup">
                {
                    this.props.is_correct
                        ? <div className="SnsGetStarsPopup-snsPopup-small-div">
                                <div className="SnsGetStarsPopup-img"></div>
                                <span className="SnsGetStarsPopup-title-A">
                                    Congratulations!
                                </span>
                                <span className="SnsGetStarsPopup-title-B">
                                    You’ve made a right choice!
                                </span>
                                <span className="SnsGetStarsPopup-title-C">
                                    5 Stars Earned
                                </span>
                                <div className="SnsGetStarsPopup-btn" onClick={this.props.clickToggle}>
                                    <span className="SnsGetStarsPopup-btn-span">Check results</span>
                                </div>
                            </div>
                        : <div className="SnsGetStarsPopup-snsPopup-small-div">
                                <div className="SnsGetStarsPopup-img-wrong"></div>
                                <span className="SnsGetStarsPopup-title-A">
                                Awww!
                                </span>
                                <span className="SnsGetStarsPopup-title-B">
                                You got the wrong answer!
                                </span>
                                <span className="SnsGetStarsPopup-title-C">
                                0 Stars Earned
                                </span>
                                <div className="SnsGetStarsPopup-btn" onClick={this.props.clickToggle}>
                                    <span className="SnsGetStarsPopup-btn-span">Check results</span>
                                </div>
                            </div>
                }
            </div>
        );
    }
}