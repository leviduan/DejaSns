import React, {Component} from 'react'
import "./snsPopup.css"

export default class SnsPopup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const { data } = this.props;
        return (
            this.props.isShow && <div className="snsrank-snsPopup" onClick={this.props.clickToggle}>
                <div className="snsrank-snsPopup-small-div">
                    <span className="snsrank-snsPopup-title-span">
                    {this.props.today ? 'Answer submitted. Results will be released today.' : 'Answer submitted. Results will be released tomorrow.'}
                    </span>
                </div>
            </div>
        );
    }
}