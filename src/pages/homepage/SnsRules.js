import React, {Component} from 'react'
import "./SnsRules.css"


export default class SnsRules extends Component {
    constructor(props) {
        super(props);
        window.payResult = this.payResult
        this.state = {
            pushnotice: 0
        }
    }

    componentDidMount() {
        window.htmlCallMobileDeja('hideMBP', 'dd')
        var params = {}

        let str = this.props.location.search
        let seg = str.replace(/^\?/, '').split('&')
        let len = seg.length
        for (var i = 0; i < len; i++) {
            if (seg[i]) {
               let p = seg[i].split('=');
               params[p[0]] = p[1];   
            }
        }
        

        this.setState({
            pushnotice: params.pushnotice,
        })
    }

    payResult = value => {
        if (value === true) {
            console.log('true')
            this.setState(prevState => ({
                pushnotice: '1'
            }));
            
        }
        else {
            console.log('false')
            this.setState(prevState => ({
                pushnotice: '0'
            }));
        }
    }

    addLogClick = name => {
        window.htmlCallMobileDeja('addFireBaseDILog', name)
    }

    nativeClick = () => {
        if (this.state.pushnotice === "1") {
            return
        }
        console.log(this.state.pushnotice)
        this.addLogClick('D_SNS_Push')
        window.htmlCallMobileDeja('pushAction', "Awesome! Enable Push Notification to get notified when challenge is released!")
    }

    render() {

        return (
            <div className="SnsRules-Content" onClick={this.props.clickToggle}>
                <span className="SnsRules-title">
                    Fashion Challenge
                </span>
                <div className="SnsRules-RowOne-div">
                    <span className="SnsRules-RowOne-number">1.</span>
                    <span className="SnsRules-RowOne-text">Fashion Challenge will be Launching Soon.</span>
                </div>

                <div className="SnsRules-RowOne-div">
                    <span className="SnsRules-RowOne-number">2.</span>
                    <span className="SnsRules-RowOne-text">Daily challenges will be published at 1200hrs daily where you may participate.</span>
                </div>

                <div className="SnsRules-RowOne-div">
                    <span className="SnsRules-RowOne-number">3.</span>
                    <span className="SnsRules-RowOne-text">Options will be given for the published questions daily where only 1 option is correct.</span>
                </div>


                <div className="SnsRules-RowOne-div">
                    <span className="SnsRules-RowOne-number">4.</span>
                    <span className="SnsRules-RowOne-text">Gain more fashion knowledge through this challenge such as the trending looks, fashion icons, hottest items and many more.</span>
                </div>

                <div className="SnsRules-RowOne-div">
                    <span className="SnsRules-RowOne-number">5.</span>
                    <span className="SnsRules-RowOne-text">Earn bragging rights as Deja's Fashion Queen!</span>
                </div>

                <span className="SnsRules-RowOne-subtext">Are you Deja's Fashion Queen?<br/>See You Soon!!</span>
                

                {!(this.state.pushnotice === "1") && <div className="SnsRules-RowOne-Got" onClick={this.nativeClick}>
                    <span className="SnsRules-snsPopup-Got-span">Notify Me</span>
                </div> }
           
            </div>
        );
    }
}