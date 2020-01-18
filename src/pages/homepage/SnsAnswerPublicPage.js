import React, {Component,Fragment} from 'react'
import {Redirect} from 'react-router-dom';
import './SnsAnswerPage.css';
import SnsGetStarsPopup from './SnsGetStarsPopup'
import SnsRulesPopup from './SnsRulesPopup'
import axios from 'axios';
import api from "../../constant"
import ReactLoading from "react-loading";
import { ENGINE_METHOD_STORE } from 'constants';

const SnsMyProfileHeader = props => {
    return (
        <div className="snsAnswerPage-SnsMyProfileHeader">
            <div className="snsAnswerPage-SnsMyProfileHeader-content">
                <img
                    className="snsAnswerPage-SnsMyProfileHeader-avatar"
                    src={props.avatar ? props.avatar : require('../../../public/noimagetop.png')}
                    alt=''/>
                <div className="snsAnswerPage-SnsMyProfileHeader-nameAndStar-div">
                        <span className="snsAnswerPage-SnsMyProfileHeader-name">
                            {props.customer_name}
                        </span>
                    <div className="snsAnswerPage-SnsMyProfileHeader-twoStarStyle-div">
                        <span className="snsAnswerPage-SnsMyProfileHeader-stars">All</span>
                        <div className="snsAnswerPage-SnsMyProfileHeader-star-div">
                            <img className="snsAnswerPage-SnsMyProfileHeader-nameAndStar-img"
                                src={require('../../../public/StarGold.png')}
                                alt=" "
                            />
                            <span className="snsAnswerPage-SnsMyProfileHeader-starCount">{props.customer_stars}</span>
                        </div>
                        <span className="snsAnswerPage-SnsMyProfileHeader-stars-right">This Week</span>
                        <div className="snsAnswerPage-SnsMyProfileHeader-star-div">
                        <img className="snsAnswerPage-SnsMyProfileHeader-nameAndStar-img"
                                src={require('../../../public/StarGold.png')}
                                alt=" "
                            />
                            <span className="snsAnswerPage-SnsMyProfileHeader-starCount">{props.week_stars}</span>
                        </div>
                    </div>
                </div>
                <div className="snsAnswerPage-SnsMyProfileHeader-acquireStar-div">
                    <div className= {props.topic_get_stars === 0 ? "snsAnswerPage-SnsMyProfileHeader-acquireStar-starPic-darkStar" : "snsAnswerPage-SnsMyProfileHeader-acquireStar-starPic"}>
                        <span
                            style={{
                                fontSize: "0.12rem", fontWeight: "bold"
                            }}>{props.topic_get_stars}</span>
                    </div>
                    <span
                            style={{
                                fontSize: "0.08rem",marginTop: "-0.03rem"
                            }}>Earned</span>
                </div>
            </div>
            <div className="snsAnswerPage-SnsMyProfileHeader-underline"></div>
        </div>
    )
}

const SnsAnswerPageQuestionPicView = props => {
    return (
        props.imageUrl && <img
            className="snsAnswerPage-content-questionImage-img"
            src={props.imageUrl}
            alt='snsAnswerPage-content-questionImage-img'/>
    )
}

const SnsMyProfileGetRightAnswer = props => {
    if (props.type === 4) {
        return (
            <div className="snsAnswerPage-SnsMyProfileGetRightAnswer-background-div">
                <img className="snsAnswerPage-SnsMyProfileGetRightAnswer-background-img-right" src={require('../../../public/correct_icon.png')}/>
                <span className="snsAnswerPage-SnsMyProfileGetRightAnswer-background-span-right">You’ve made the right choice!</span>
            </div>
        )
    }
    else {
        return (
            <div className="snsAnswerPage-SnsMyProfileGetRightAnswer-background-div">
                <img className="snsAnswerPage-SnsMyProfileGetRightAnswer-background-img-wrong" src={require('../../../public/incorrect_icon.png')}/>
                <span className="snsAnswerPage-SnsMyProfileGetRightAnswer-background-span">Awww! You got the wrong answer! <br/>Right answer is {props.correctAnser}</span>
            </div>
        )
    }
}

const SnsAnswerPageChoosePicContentView = props => {
    // * type: 4 correct 5 error
    if (props.type === 4) {
        return (
            <div className="snsAnswerPage-content-choosePic-div">
                {(props.answerstyleNum === 1) ?
                    props.data.map((chooseData, index) => <SnsAnswerRightPageChoosePicCell {...chooseData} index={index} key={index}/>)
                :
                    props.data.map((chooseData, index) => <SnsAnswerRightPageChooseLabelCell {...chooseData} index={index} key={index}/>)
                }
            </div>
        )
    }
    else {
        return (
            <div className="snsAnswerPage-content-choosePic-div">
                {(props.answerstyleNum === 1) ?
                    props.data.map((chooseData, index) => <SnsAnswerWrongPageChoosePicCell {...chooseData} index={index} key={index}/>)
                :
                    props.data.map((chooseData, index) => <SnsAnswerWrongPageChooseLabelCell {...chooseData} index={index} key={index}/>)
                }
            </div>
        )
    }
}

const SnsAnswerWrongPageChoosePicCell = (props) => (

    <div className="snsAnswerPage-cell-pic-content-div">
        <div
            className={props.is_answer ? "snsAnswerPage-cell-pic-div-wrong" : (props.is_correct ? "snsAnswerPage-cell-pic-div" : "snsAnswerPage-cell-pic-div")}
            style={{
                backgroundImage: `url(${encodeURI(props.image_url)})`
            }}>
            { props.is_answer && <div className="snsAnswerPage-cell-pic-content-div-error-border">
            </div>
            }
        </div>
        <div className="snsAnswerPage-cell-label-div" style={props.is_answer? {backgroundColor: "#F94C5D"} : {"backgroundColor": "white"}}>
            <span className={props.is_answer? "snsAnswerPage-cell-span-title-click": "snsAnswerPage-cell-span-title"}>{props.prefix}</span>
        </div>
        {props.description && 
            <div className={props.is_answer ? "snsAnswerPage-cell-bottombar-div-wrong" : "snsAnswerPage-cell-bottombar-div"}>
                <span style={props.is_answer ?  {"color": 'white'} :  {"color": 'black'}}>{props.description}</span>
            </div>
        }
        {
            !props.is_answer && !props.is_correct && <div className="snsAnswerPage-cell-pic-content-div-error">
            </div>
        }
    </div>
);

const SnsAnswerRightPageChoosePicCell = (props) => (

    <div className="snsAnswerPage-cell-pic-content-div">
        <div
            className={props.is_answer ? "snsAnswerPage-cell-pic-div-right" : "snsAnswerPage-cell-pic-div"}
            style={{
                backgroundImage: `url(${props.image_url})`
            }}>
        </div>
        <div className="snsAnswerPage-cell-label-div" style={props.is_answer? {backgroundColor: "#1FCA95"} : {"backgroundColor": "white"}}>
            <span className={props.is_answer? "snsAnswerPage-cell-span-title-click": "snsAnswerPage-cell-span-title"}>{props.prefix}</span>
        </div>
        {props.description && 
            <div className={props.is_answer ? "snsAnswerPage-cell-bottombar-div-right" : "snsAnswerPage-cell-bottombar-div"}>
                <span style={props.is_answer ?  {"color": 'white'} :  {"color": 'black'}}>{props.description}</span>
            </div>
        }
        {
            !props.is_answer && <div className="snsAnswerPage-cell-pic-content-div-error">
            </div>
        }
    </div>
);

const SnsAnswerRightPageChooseLabelCell = props => {
    return (
        <div className="snsAnswerPageChooseLabelCell-content-div">
            <div className="snsAnswerPage-Labelcell-label-div" style={props.is_answer? {backgroundColor: "#49D2A7"} : {"backgroundColor": "#818181", "opacity": "0.7"}}>
                <span className={props.is_answer? "snsAnswerPage-cell-span-title-click": "snsAnswerPage-cell-span-title"}>{props.prefix}</span>
            </div>
            <div className={props.is_answer? "snsAnswerPageChooseLabelCell-label-div-correct": "snsAnswerPageChooseLabelCell-label-div-notcorrect"}>
                <span className={props.is_answer? "snsAnswerPageChooseLabelCell-label-span-correct": "snsAnswerPageChooseLabelCell-label-span-notcorrect"}>{props.description}</span>
            </div>
        </div>
    )
}

const SnsAnswerWrongPageChooseLabelCell = props => {
    return (
        <div className="snsAnswerPageChooseLabelCell-content-div">
            <div className="snsAnswerPage-Labelcell-label-div" style={props.is_answer? {backgroundColor: "#F14A5E"} : props.is_correct ? {backgroundColor: "white"} : {backgroundColor: "#818181", "opacity": "0.7"}}>
                <span className={props.is_answer? "snsAnswerPage-cell-span-title-click": "snsAnswerPage-cell-span-title"}>{props.prefix}</span>
            </div>
            <div className={props.is_answer? "snsAnswerPageChooseLabelCell-label-div-wrong" : (props.is_correct ?  "snsAnswerPageChooseLabelCell-label-div-notclick" : "snsAnswerPageChooseLabelCell-label-div-notcorrect")}>
                <span className={props.is_correct ? "snsAnswerPageChooseLabelCell-label-span-right" :"snsAnswerPageChooseLabelCell-label-span-notcorrect"}>{props.description}</span>
            </div>
        </div>
    )
}

// * SnsAnswerPage: user can answer a question in this page.

class SnsAnswerPublicPage extends Component {

    static defaultProps = {
        data: {
            "customer_name": "username",
            "avatar": "",
            "customer_stars": 0,
            "week_stars": 0,
            "topic_get_stars": 0,
            "topic": {
                "id": 1,
                "topic_name": " ",
                "start_date": 1547913600000,
                "end_date": 1548043199000,
                "options": [
                    {
                        "id": 1,
                        "prefix": "A",
                        "description": " ",
                        "image_url": "",
                        "is_answer": true,
                        "total": 0
                    }, {
                        "id": 2,
                        "prefix": "B",
                        "description": " ",
                        "is_correct": true,
                        "image_url": "",
                        "total": 0
                    }, {
                        "id": 3,
                        "prefix": "C",
                        "description": " ",
                        "image_url": "",
                        "total": 0
                    }, {
                        "id": 4,
                        "prefix": "D",
                        "description": " ",
                        "image_url": "",
                        "total": 0
                    }
                ],
                "type": 1,
                "image_url": ""
            },
            "answer_description": {
                "title": "",
                "description": "",
                "image_url": ""
            }
        }
    }
    

    constructor(props) {
        super(props);
        this.state = {
            customer_name: this.props.data.customer_name,
            avatar: this.props.data.avatar,
            customer_stars: this.props.data.customer_stars,
            week_stars: this.props.data.week_stars,
            topic_get_stars: this.props.data.topic_get_stars,
            topic_name: this.props.data.topic.topic_name,
            options: this.props.data.topic.options,
            type: this.props.data.topic.type,
            questionImageUrl: this.props.data.topic.image_url,
            answer_description_title: this.props.data.answer_description.title,
            answer_description_description: this.props.data.answer_description.description,
            answer_description_image_url: this.props.data.answer_description.image_url,
            answerstyleNum: 1,
            confirmToggle: true,
            answerPublic: true,
            isShow: false,   // * look 状态 isShow
            isRulesShow: false,
            correctAnser: ' ',
            haveData: false,
            isloading: true,
        }
        this.confirmItemFlag = false
    }

    componentWillMount() {

        if (this.state.isloading) {
            var timer = setTimeout(()=>{
                this.setState(prevState => ({
                    isloading: false,
                }));
                clearTimeout(timer);
            }, 1000);
        }
        
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

        try {
            if (params.uid) {
                axios.defaults.headers.common['uid'] = params.uid
            }
            if (params.sig) {
                axios.defaults.headers.common['sig'] = params.sig;
            }
            console.log(axios.defaults.headers.common['uid'])
            console.log(axios.defaults.headers.common['sig'])
            var topic = params.topic
            window.htmlFireBaseLogDeja('D_SNS_Detailpage_Answer', topic, '')
            axios.get(`${api.cloudAPI}/style-tinder/admin/sns/topic/look_result?topic_id=${encodeURIComponent(params.topic)}`)
            .then(res => {
                const request = res.data;
                try {
                    axios.get(`${api.cloudAPI}/style-tinder/admin/sns/topic/is_look?topic_id=${topic}`)
                    .then(res => {
                        console.log("test")
                    })
                }
                catch (error) {
                    console.log(error)
                }

                this.timer = setTimeout(()=>{
                    window.htmlCallMobileDeja('hideMBP', 'hide')
                    clearTimeout(this.timer);
                }, 1000);

                this.setState({
                    customer_name: request.data.customer_name ? request.data.customer_name : 'My name',
                    avatar: request.data.avatar,
                    // avatar: "http://graph.facebook.com/709992425796979/picture?type=square&width=200&height=200",
                    customer_stars: request.data.customer_stars,
                    week_stars: request.data.week_stars | 0,
                    topic_get_stars: request.data.topic_get_stars,
                    topic_name: request.data.topic.topic_name,
                    options: request.data.topic.options,
                    type: request.data.topic.type,
                    questionImageUrl: request.data.topic.image_url,
                    answer_description_title: request.data.answer_description.title,
                    answer_description_description: request.data.answer_description.description,
                    answer_description_image_url: request.data.answer_description.image_url,
                    questionImageUrl: request.data.topic.image_url ? request.data.topic.image_url : '',
                    haveData: true,
                })

                if (request.data.topic.options[0].image_url == null || request.data.topic.options[0].image_url === '') {
                    this.setState({
                        answerstyleNum: 2,
                    })
                }

                if  (request.data.topic.is_look === false) {
                    this.toggleShow()
                }

                if (request.data.topic.type === 5) {

                    request.data.topic.options.forEach(element => {
                        if (element.is_correct === true) {
                            this.setState(prevState => ({
                                correctAnser: element.prefix
                            }))
                        }                            
                    });
                }
            })
        } catch (error) {

            window.htmlCallMobileDeja('hideMBP', 'hide')
            return
        }
    }

    toggleShow = () => {
        if (!this.state.isShow) {
            document.body.style.position = 'fixed';
            document.body.style.overflow = 'hidden';
            this.setState(prevState => ({
                isShow: true
            }));
        }
    }

    closeShow = () => {
        clearTimeout(this.timer)
        if (this.state.isShow) {
            document.body.style.position = 'relative';
            document.body.style.overflow = 'auto';
            this.setState(prevState => ({
                isShow: false
            }));
        }
    }


    openRules = e => {
        e.preventDefault();
        document.body.style.position = 'fixed';
        document.body.style.overflow = 'hidden';

        // var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;';

        // this.scrollTop = document.scrollingElement.scrollTop  ||
        //                 document.documentElement.scrollTop ||   
        //                 document.body.scrollTop;
        //     document.body.classList.add('SnsRulesPopup-snsPopup-Content');
        //     document.body.style.top = -this.scrollTop + 'px';


        if (!this.state.isRulesShow) {
            this.setState(prevState => ({
                isRulesShow: true
            }));
        }
    }

    closeRules = () => {

        // var body = document.body;
        // body.style.position = 'static';
        // var top = body.style.top;
        // document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
        // body.style.top = '';

        // document.body.classList.remove('SnsRulesPopup-snsPopup-Content');
        // document.scrollingElement.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop;
        

        document.body.style.position = 'relative';
        document.body.style.overflow = 'auto';
        if (this.state.isRulesShow) {
            this.setState(prevState => ({
                isRulesShow: false
            }));
        }
    }

    render() {

        // * 回答问题头部
        const SnsAnswerPageHeader = props => {
            return (
                <div className="snsAnswerPage-content-header-div">
                    <span className="snsAnswerPage-content-header-span">{props.topic_name}</span>
                    <div className="snsAnswerPage-content-header-rule-div" 
                    onClick={this.openRules}></div>
                </div>
            )
        }

        const SnsDisplaySpan = () => (
            <div className="snsConfirmBtn-showresults-span-div">
                <span className="snsConfirmBtn-showresults-span">
                    Results will be revealed tomorrow. Be sure to come back to check the results   
                </span>
            </div>
        )

        const SnsAnswerPageConnectInfo = () => {
            return (
                <div className="snsAnswerPage-SnsAnswerPageConnectInfo-content">
                    <div className="snsAnswerPage-SnsAnswerPageConnectInfo-content-white">
                    {this.state.answer_description_title ? 
                        <span className="snsAnswerPage-SnsAnswerPageConnectInfo-title">{this.state.answer_description_title}</span>
                        :
                        null
                    }
                    {this.state.answer_description_image_url ?
                        <img
                            className="snsAnswerPage-SnsAnswerPageConnectInfo-pic"
                            src={this.state.answer_description_image_url}
                            alt=' '/>
                            :
                            null   
                    }
                    {
                        this.state.answer_description_description ? <span className="snsAnswerPage-SnsAnswerPageConnectInfo-span">{this.state.answer_description_description}</span>
                        : <span className="snsAnswerPage-SnsAnswerPageConnectInfo-span-null"></span>
                    }
                    </div>
                    {this.state.type === 4 ? 
                        <span className="snsAnswerPage-SnsAnswerPageConnectInfo-finalspan">Have you answered today's challenge?</span>
                        :
                        <span className="snsAnswerPage-SnsAnswerPageConnectInfo-finalspan">Try again in today's challenge!</span>
                        }
                </div>
            )
        }

        return (
            <div className="snsAnswerPage-content-backgroundColor">
                {this.state.haveData ?
                (this.state.options.length > 0 ?               
                    <div className="snsAnswerPage-content-div">
                        {!this.state.isloading && <Fragment>
                        <SnsMyProfileHeader avatar={this.state.avatar} customer_name={this.state.customer_name} customer_stars={this.state.customer_stars} week_stars={this.state.week_stars} topic_get_stars={this.state.topic_get_stars} />
                        <SnsMyProfileGetRightAnswer type={this.state.type} correctAnser={this.state.correctAnser}/>
                        <SnsAnswerPageHeader topic_name={this.state.topic_name}/>
                        <SnsAnswerPageQuestionPicView imageUrl={this.state.questionImageUrl}/>
                        <SnsAnswerPageChoosePicContentView data={this.state.options} type={this.state.type} answerstyleNum={this.state.answerstyleNum}/>
                        <SnsAnswerPageConnectInfo />
                        <SnsGetStarsPopup isShow={this.state.isShow} is_correct={this.state.type === 4} clickToggle={this.closeShow}/>
                        <SnsRulesPopup isShow={this.state.isRulesShow} clickToggle={this.closeRules}/>
                        </Fragment>
                        }
                        {this.state.isloading && <div className="SnsPage-content-isloading">
                                <div className="SnsRankOther-loadingPic">
                                <ReactLoading type='spokes' color="#262729" height="0.3rem" width="0.3rem"/>
                                </div>
                            </div> 
                        }
                    </div>
                    :
                    <div style={{width: "3.75rem", height: "3.75rem",  display: "flex", flexDirection: "row", "align-items": "center", "justfy-content": "center"}}><span style={{fontSize: 24, margin: "auto auto auto auto"}}>Sorry, Network is down</span></div>
                ) :
                <div style={{width: "3.75rem", height: "3.75rem",  display: "flex", flexDirection: "row", "align-items": "center", "justfy-content": "center"}}><span style={{fontSize: 24, margin: "auto auto auto auto"}}> </span></div> 
                }
            </div>
        )
    }
}

export default SnsAnswerPublicPage