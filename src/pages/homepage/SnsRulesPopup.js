import React, {Component} from 'react'
import "./SnsRulesPopup.css"

export default class SnsRulesPopup extends Component {
    constructor(props) {
        super(props);
    }

    clickMove = (e) => {
        e.preventDefault();
        console.log("test")
    }

    render() {
        return (
            this.props.isShow && <div className="SnsRulesPopup-snsPopup-Content" onTouchMove={this.clickMove}>
                <div className="SnsRulesPopup-snsPopup-div">
                    <span className="SnsRulesPopup-snsPopup-span-title">
                        Rules
                    </span>
                    <hr className="SnsRulesPopup-hr"/>
                    <span className="SnsRulesPopup-snsPopup-1-span">
                        1. New Challenge will be posted at 1200hrs daily.<br/><br/>
                        2. Results for each challenge will be posted at 1200hrs the following day.<br/><br/>
                        3. 5 Stars will be awarded with each correct answer.
                    </span>  
                    <div className="SnsRulesPopup-snsPopup-Got" onClick={this.props.clickToggle}>
                        <span className="SnsRulesPopup-snsPopup-Got-span">Got It</span>
                    </div>
                </div>
            </div>
        );
    }
}