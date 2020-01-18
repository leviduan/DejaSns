import React, {Component} from 'react'
import "./snsPopup.css"

export default class SnsPopupLoginout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const { data } = this.props;
        return (
            this.props.isShow && <div className="snsrank-snsPopup" onClick={this.props.clickToggle}>
                <div className="snsrank-snsPopup-small-div">
                    <span className="snsrank-snsPopup-title-span">
                    Oops! It seems that you are not logged in.Please log in to continue.
                    </span>
                </div>
            </div>
        );
    }
}