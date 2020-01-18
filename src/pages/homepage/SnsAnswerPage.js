import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import './SnsAnswerPage.css';
import SnsPopup from './snsPopup'
import SnsGetStarsPopup from './SnsGetStarsPopup'
import SnsRulesPopup from './SnsRulesPopup'
import SnsPopupLoginout from './SnsPopupLoginout'
import axios from 'axios';
import api from "../../constant"

const SnsAnswerPageQuestionPicView = props => {

    return (
        encodeURI(props.imageUrl) && <img
            className="snsAnswerPage-content-questionImage-img"
            src={encodeURI(props.imageUrl)}
            alt='snsAnswerPage-content-questionImage-img'/>
    )
}

// * SnsAnswerPage: user can answer a question in this page.
class SnsAnswerPage extends Component {


    static defaultProps = {
        data: {
            "id": 1,
            "topic_name": "Which bottom matches best width Song's look?",
            "start_date": 1547913600000,
            "end_date": 1548043199000,
            "options": [
              {
                "id": 1,
                "prefix": "A",
                "description": "levi",
                "image_url": "http://image-server-dt.deja.fashion/public/correct_answer_3_1553075276799",
                "is_answer": true

              },
              {
                "id": 2,
                "prefix": "B",
                "description": "levi",
                "image_url": "http://image-server-dt.deja.fashion/public/correct_answer_3_1553075276799"
              },
              {
                "id": 3,
                "prefix": "C",
                "description": "like you 2 ？",
                "image_url": "http://image-server-dt.deja.fashion/public/correct_answer_3_1553075276799"
              },
              {
                "id": 4,
                "prefix": "D",
                "description": "like you 3 ？",
                "image_url": "http://image-server-dt.deja.fashion/public/correct_answer_3_1553075276799"
              }
            ],
            "type": 2,
            "image_url": "https://previews.dropbox.com/p/thumb/AAVcgb8dVBmyqYjoSO5hiibLCxD4d8ktN3fF1tYsh6CsskSrxLRq5WNR8ixNL9mBZO0MDdnfwe3fChdHpa5oMH7SevPPWv2CGiMI078ONuUO23cyrhYaZcZllR36pNvLm1n6fyCsSmBitqnVWlDP8EFIAJBS2jaExmdkg_1LU5vZjJ2uVUEjSEOL2qMFymAVWpCUEe4SAezQabTJdUz1xultw9Nctt2TtM8L1Ct1LeNg3aTELlTMOwB3zz_N9x8c_1T6afb7e3BTBteln4igO27GoMf26un--eHZhoVFfYXzDA/p.png"
          }
    }

    constructor(props) {
        super(props);
        this.state = {
            topic_name: this.props.data.topic_name,
            options: this.props.data.options,
            type: this.props.data.type,
            questionImageUrl: this.props.data.image_url,
            answerstyleNum: 1,
            confirmToggle: true,
            chooseDataSet: this.props.data.chooseDataSet,
            resultSpanisDisplay: false,
            isShow: false,
            isRulesShow: false,
            chooseId: 0,
            topic: 0,
            haveData: false,
            today: false,
            showLogout: false,
        }
        this.confirmItemFlag = false
        this.confirmBtn = false
        this.topic = 0
    }

    componentDidMount() {
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
            axios.defaults.headers.common['uid'] = params.uid;
            axios.defaults.headers.common['sig'] = params.sig;
            this.topic = params.topic
            window.htmlFireBaseLogDeja('D_SNS_Detailpage', params.topic, '')
            axios.get(`${api.cloudAPI}/style-tinder/admin/sns/topic/get_topic?topic_id=${encodeURIComponent(params.topic)}`)
            .then(res => {
                const request = res.data;
                
                if (request.data == null) {
                    return
                }

                request.data.options.forEach(element => {
                    element.isClick = false
                });
                
                this.timer = setTimeout(()=>{
                    window.htmlCallMobileDeja('hideMBP', 'hide')
                    clearTimeout(this.timer);
                }, 1000);

                this.setState({
                    topic_name: request.data.topic_name,
                    options: request.data.options,
                    type: request.data.type,
                    start_date: request.data.start_date,
                    end_date: request.data.end_date,
                    questionImageUrl: request.data.image_url ? request.data.image_url : '',
                    topic: params.topic,
                    haveData: true,
                    today: request.data.today,
                })
                if (request.data.options[0].image_url == null || request.data.options[0].image_url === '') {
                    this.setState({
                        answerstyleNum: 2,
                    })
                }

                // todo change type -> 2
                if (request.data.type === 2) {

                    request.data.options.forEach(element => {
                        if (element.is_answer === true) {
                            element.isClick = true
                        }                            
                    })

                    this.setState(prevState => ({
                        confirmToggle: true,
                        resultSpanisDisplay: true,
                    }))
                }

            })
        } catch (error) {
            window.htmlCallMobileDeja('hideMBP', 'hide')
            return
        }
        
    }

    nativeGetRequest = name => {
        window.htmlCallMobileDeja('hideMBP', name)
    }

    nativeClick = name => {
        window.htmlCallMobileDeja('pushActionOnce', 'Get notiftied when a new challenge is release & when results are announced!')
    }

    handleClick = index => e => {
        e.preventDefault();

        if (this.state.type === 2) {
            return
        }

        if (this.confirmItemFlag) return
        this.state.options.map((chooseData) => chooseData.isClick = false)


        if (index<4 && index>=0) {
            this.state.options[index][`isClick`] = true
            this.state.chooseId = this.state.options.id
        }

        this.setState({
            options: this.state.options,
            confirmToggle: false,
            chooseId: this.state.options[index].id
        })
    }

    handleSubmit = () => {
        if (this.confirmBtn === true) {
            return
        }
        this.confirmBtn = true
        const id = this.state.chooseId;
        
        try {
            axios.post(`${api.cloudAPI}/style-tinder/admin/sns/topic/answer`, { id })
            .then(res => {
                const request = res.data;
                console.log(request.ret)
                if (request.ret != 0) {
                    this.setState({
                        showLogout: true,
                    })

                    this.timer = setTimeout(()=>{
                        this.setState({
                            showLogout: false,
                        })
                        window.htmlCallMobileDeja('goback', '')
                        window.htmlFireBaseLogDeja('D_SNS_nologin_Confirm', this.topic, '')
                        clearTimeout(this.timer);
                    }, 2000);
                    return
                }

                if (request.data.type === 4 | request.data.type === 5) {
                    window.htmlFireBaseLogDeja('D_SNS_Confirm', this.topic, 2)
                    this.props.history.push(`/snsAnswerPublicPage?topic=${this.state.topic}`)
                }
                else {
                    window.htmlFireBaseLogDeja('D_SNS_Confirm', this.topic, 1)
                    this.nativeClick()
                    if (this.state.confirmToggle === false) {
                        this.toggleShow()
                        this.confirmItemFlag = true
                    }
                    this.setState(prevState => ({
                        confirmToggle: true,
                        resultSpanisDisplay: true,
                    }))
                }
            })
        }
        catch (error) {

        }
    }

    confirmToggleClick = () => {

        if (this.state.confirmToggle === true) {
            return
        }

        if (this.state.confirmToggle === false) {
            console.log(this.state.type)
            if (this.state.type === 1) {
                this.handleSubmit()
                return
            } 
            this.toggleShow()
            this.confirmItemFlag = true
        }
        this.setState(prevState => ({
            confirmToggle: true,
            resultSpanisDisplay: true,
        }))
    }

    toggleShow = () => {
        if (!this.state.isShow) {
            document.body.style.position = 'fixed';
                document.body.style.overflow = 'hidden';
            this.setState(prevState => ({
                isShow: true
            }));
            this.timer = setTimeout(()=>{
                document.body.style.position = 'relative';
                document.body.style.overflow = 'auto';
                this.setState(prevState => ({
                    isShow: false
                }));
                clearTimeout(this.timer);
            }, 5000);
        }
    }

    closeShow = () => {
        document.body.style.position = 'relative';
        document.body.style.overflow = 'auto';
        clearTimeout(this.timer)
        if (this.state.isShow) {
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
        // console.log(e)
        if (!this.state.isRulesShow) {
            this.setState(prevState => ({
                isRulesShow: true
            }));
        }
    }

    closeRules = () => {
        document.body.style.position = 'relative';
        document.body.style.overflow = 'auto';
        // var body = document.body;
        // body.style.position = 'static';
        // var top = body.style.top;
        // document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
        // body.style.top = '';

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

        const SnsAnswerPageChoosePicContentView = props => {

            return (
                <div className="snsAnswerPage-content-choosePic-div">
                    {(props.answerstyleNum === 1) ?
                        props.data.map((chooseData, index) => <SnsAnswerPageChoosePicCell {...chooseData} index={index} key={index}/>)
                    :
                        props.data.map((chooseData, index) => <SnsAnswerPageChooseLabelCell {...chooseData} index={index} key={index}/>)
                    }
                </div>
            )
        }

        const SnsAnswerPageChoosePicCell = (props) => (

            <div className="snsAnswerPage-cell-pic-content-div" onClick={this.handleClick(props.index)}>
                <div
                    className={props.isClick ? "snsAnswerPage-cell-pic-div-click" : "snsAnswerPage-cell-pic-div"}
                    style={{
                        backgroundImage: `url(${encodeURI(props.image_url)})`
                    }}>
                </div>
                <div className="snsAnswerPage-cell-label-div" style={props.isClick? {backgroundColor: "black"} : {"backgroundColor": "white"}}>
                    <span className={props.isClick? "snsAnswerPage-cell-span-title-click": "snsAnswerPage-cell-span-title"}>{props.prefix}</span>
                </div>
                {props.description && 
                    <div className={props.isClick ? "snsAnswerPage-cell-bottombar-div-click" : "snsAnswerPage-cell-bottombar-div"}>
                        <span style={{"color": 'black'}}>{props.description}</span>
                    </div>
                }
            </div>
        );

        const SnsAnswerPageChooseLabelCell = props => {
            return (
                <div className="snsAnswerPageChooseLabelCell-content-div" onClick={this.handleClick(props.index)}>
                    <div className="snsAnswerPage-Labelcell-label-div" style={props.isClick? {backgroundColor: "black"} : {"backgroundColor": "white"}}>
                        <span className={props.isClick? "snsAnswerPage-cell-span-title-click": "snsAnswerPage-cell-span-title"}>{props.prefix}</span>
                    </div>
                    <div className={props.isClick? "snsAnswerPageChooseLabelCell-label-div": "snsAnswerPageChooseLabelCell-label-div-notclick"}>
                        <span>{props.description}</span>
                    </div>
                </div>
            )
        }

        const SnsDisplaySpan = () => (
            <div className="snsConfirmBtn-showresults-span-div">
                <span className="snsConfirmBtn-showresults-span">
                    Results will be revealed {this.state.today ? 'today' : 'tomorrow'}. Be sure to come back to check the results   
                </span>
            </div>
        )

        const SnsConfirmBtnView = props => {
            return (
                <div className="snsConfirmBtn-container-div">
                    <div className={props.confirmToggle ? "snsConfirmBtn-View-div-click" : "snsConfirmBtn-View-div"}
                        onClick={this.confirmToggleClick}> 
                        <span className="snsConfirmBtn-span">
                            Confirm
                        </span>
                    </div>
                    {this.state.resultSpanisDisplay ? <SnsDisplaySpan/> : <div className="snsConfirmBtn-showresults-span-null"></div>}
                </div>
            )
        }

        return (
            <div className="snsAnswerPage-content-backgroundColor">
                {this.state.haveData ? (this.state.options.length > 0 ? <div className="snsAnswerPage-content-div">
                    <SnsAnswerPageHeader topic_name={this.state.topic_name}/>
                    <SnsAnswerPageQuestionPicView imageUrl={this.state.questionImageUrl}/>
                    <SnsAnswerPageChoosePicContentView data={this.state.options} answerstyleNum={this.state.answerstyleNum}/>
                    <SnsConfirmBtnView confirmToggle={this.state.confirmToggle}/>
                    <SnsPopup isShow={this.state.isShow} clickToggle={this.closeShow} today={this.state.today}/>
                    <SnsRulesPopup isShow={this.state.isRulesShow} clickToggle={this.closeRules}/>
                    <SnsPopupLoginout isShow={this.state.showLogout}/>
                </div>
                : <div style={{width: "3.75rem", height: "3.75rem",  display: "flex", flexDirection: "row", "align-items": "center", "justfy-content": "center"}}><span style={{fontSize: 24, margin: "auto auto auto auto"}}>Sorry, Network is down</span></div>
                ) : <div style={{width: "3.75rem", height: "3.75rem",  display: "flex", flexDirection: "row", "align-items": "center", "justfy-content": "center"}}><span style={{fontSize: 24, margin: "auto auto auto auto"}}></span></div>}
            </div>
        )
    }
}

export default SnsAnswerPage