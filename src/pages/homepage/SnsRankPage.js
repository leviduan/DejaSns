import React, {Component,Fragment} from 'react'
import {Redirect} from 'react-router-dom';
import './SnsRankPage.css';
import axios from 'axios';
import api from "../../constant"
import ReactLoading from "react-loading";

const Row = props => (
    <div>
        <hr className="SnsRankOther-hr"/>
        <div className="SnsRankOther-ranklist-rank-div">
            <span className="SnsRankOther-ranklist-rank-span">{props.rank}</span>
            <img className="SnsRankOther-SnsRankMe-rank-img" src={props.avatar? encodeURI(props.avatar) : require('../../../public/noimagetop.png')} alt="text"/>
            <span className="SnsRankOther-ranklist-username-span">{props.customer_name}</span>
            <div className="SnsRankPage-stars-point">
                <img className="SnsRankPage-SnsRankTopThree-first-stars-point"
                    src={require('../../../public/StarGold.png')}
                    alt=" "
                />
                <span className="SnsRankPage-SnsRankTopThree-starCount">{props.stars}</span>
            </div>
        </div>
    </div>
);

const SnsRankOther = props => {
    return (
        <div className="SnsRankOther-ranklist-div">{props.rankData.map((rank,index) => <Row {...rank} key={index}/>)}
        </div>
    )
}

class SnsRankPage extends Component {

    constructor(props) {
        super(props);
        let rank = []
        for(let i=0;i<50;++i) {
            let newElement = {
                "customer_name": "-",
                "stars": '-',
            }
            rank.push(newElement)
        }

        this.state = {
            rankDataSet: rank,
            myRank: {
                "customer_name": "-",
                "stars": "-",
                "rank" : '-'
            },   
            chooseRankListNumber: 0,
            haveData: false,
            dateText: '',
            isloading: true,
        }
        var timer
    }

    componentWillMount() {

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
            var ranktype = 0
            
            if (params.type != undefined) {
                ranktype = params.type
                this.setState(prevState => ({
                    chooseRankListNumber: 2,
                }))
            }

            window.htmlFireBaseLogDeja('D_SNS_LB', ranktype, '')
            
            // * 榜单,type:0.this week,1.all time,2.last Week
            axios.get(`${api.cloudAPI}/style-tinder/admin/sns/topic/leaderboard?type=${ranktype}`)
            .then(res => {
                const request = res.data;

                window.htmlCallMobileDeja('hideMBP', 'hide')

                let dateText = ''
                if (request.data.start_date  != undefined) {
                    let startDate = new Date(request.data.start_date);
                    let startMonth = startDate.toDateString().split(" ")[1]
                    let startDay = startDate.toDateString().split(" ")[2] + 'st'
                    var date = new Date(request.data.end_date);
                    let endDate = new Date(request.data.end_date);
                    let endMonth = endDate.toDateString().split(" ")[1]
                    let endDay = endDate.toDateString().split(" ")[2] + 'st'
                    dateText = startDay + ' ' + startMonth + ' - ' + endDay + ' ' + endMonth    
                }

                if (request.data.me == null) {
                    request.data.me = {
                        "customer_name": "-",
                        "stars": "-",
                        "rank" : '-'
                    }   
                }

                while (request.data.rank.length < 50) {
                    let newElement = {
                        "customer_name": "-",
                        "stars": '-',
                    }
                    request.data.rank.push(newElement)
                }

                this.setState({
                    rankDataSet: request.data.rank,
                    myRank: request.data.me,
                    haveData: true,
                    dateText: dateText,
                    isloading: false,
                })
            })
        } catch (error) {
            window.htmlCallMobileDeja('hideMBP', 'hide')
            return
        }
    }

    addLogClick = name => {
        window.htmlCallMobileDeja('addFireBaseDILog', name)
    }

    handleClick = index => (e) => {
        clearTimeout(this.timer)
        if (this.state.chooseRankListNumber === index && !this.state.isloading) {
            return
        }

        this.setState(prevState => ({
            chooseRankListNumber: index,
        }))

        window.htmlFireBaseLogDeja('D_SNS_LB', index, '')

        try {

            this.setState({
                isloading: true,
            })
            // * 榜单,type:0.this week,1.all time,2.last Week
            axios.get(`${api.cloudAPI}/style-tinder/admin/sns/topic/leaderboard?type=${index}`)
            .then(res => {
                const request = res.data;


                let startDate = new Date(request.data.start_date);
                let startMonth = startDate.toDateString().split(" ")[1]
                let startDay = startDate.toDateString().split(" ")[2] + 'st'
                var date = new Date(request.data.end_date);
                let endDate = new Date(request.data.end_date);
                let endMonth = endDate.toDateString().split(" ")[1]
                let endDay = endDate.toDateString().split(" ")[2] + 'st'

                let dateText = startDay + ' ' + startMonth + ' - ' + endDay + ' ' + endMonth

                if (request.data.me == null) {
                    request.data.me = {
                        "customer_name": "-",
                        "stars": "-",
                        "rank" : '-'
                    }   
                }

                while (request.data.rank.length < 50) {
                    let newElement = {
                        "customer_name": "-",
                        "stars": "-",
                    }
                    request.data.rank.push(newElement)
                }

                if (this.state.isloading) {
                    this.timer = setTimeout(()=>{
                        this.setState(prevState => ({
                            isloading: false,
                        }));
                        clearTimeout(this.timer);
                    }, 500);
                }

                this.setState({
                    rankDataSet: request.data.rank,
                    myRank: request.data.me,
                    dateText: dateText,
                })
            })
        } catch (error) {
            return
        }
    }

    render() {

        const SnsMyHeaderChooseDiv = props => {
            return (
                <div className="SnsRankPage-SnsMyHeader-firstDiv" onClick={this.handleClick(props.index)}>
                <span className= { props.index === this.state.chooseRankListNumber ? "SnsRankPage-SnsMyHeader-clickspan" : "SnsRankPage-SnsMyHeader-firstspan" }>{props.name}</span>
                {props.index === this.state.chooseRankListNumber ? <hr className="SnsRankPage-SnsMyHeader-first-hr"/> : null}
                </div>
            )
        }

        const SnsMyHeader = props => {
            var items = [{name: 'This Week'}, {name: 'All Time'},{name: 'Last Week'}];
            return (
                <div className="SnsRankPage-SnsMyHeader-div">
                    {items.map((item, index) => <SnsMyHeaderChooseDiv {...item} index={index} key={index}/>)}
                </div>
            )
        }

        const SnsRankTopThree = props => {
            return (
                <div className="SnsRankPage-SnsRankTopThree-div">
                    <div className="SnsRankPage-SnsRankTopThree-first">
                        <div className="SnsRankPage-SnsRankTopThree-firstAvatar"
                            style={{backgroundImage: `url(${props.rankDataSet[1].avatar? props.rankDataSet[1].avatar : require('../../../public/noimagetop.png')})`}}>
                            <div className="SnsRankPage-SnsRankTopThree-secondflag"  style={{backgroundImage: `url(${require('../../../public/top2@2x.png')})`}}>
                                <span className="SnsRankPage-SnsRankTopThree-number">2</span>
                            </div>
                        </div>
                        <div className="SnsRankPage-topthree-span-height">
                        <span className="SnsRankPage-SnsRankTopThree-first-Name">{props.rankDataSet[1].customer_name.substr(0, 18)}</span>
                        </div>
                        <div className="SnsRankPage-SnsRankTopThree-first-stars">
                                <img className="SnsRankPage-SnsRankTopThree-first-stars-point"
                                    src={require('../../../public/StarGold.png')}
                                    alt=" "
                                />
                                <span className="SnsRankPage-SnsRankTopThree-starCount">{props.rankDataSet[1].stars}</span>
                        </div>
                    </div>
                    <div className="SnsRankPage-SnsRankTopThree-first">
                        <div className="SnsRankPage-SnsRankTopThree-midAvatar"
                        style={{backgroundImage: `url(${props.rankDataSet[0].avatar? props.rankDataSet[0].avatar : require('../../../public/noimagetop.png')})`}}>
                            <div className="SnsRankPage-SnsRankTopThree-firstflag"  style={{backgroundImage: `url(${require('../../../public/top1@2x.png')})`}}>
                                <span className="SnsRankPage-SnsRankTopThree-number">1</span>
                            </div>
                        </div>
                        <div className="SnsRankPage-topthree-span-height">
                        <span className="SnsRankPage-SnsRankTopThree-first-Name">{props.rankDataSet[0].customer_name.substr(0, 18)}</span>
                        </div>
                        <div className="SnsRankPage-SnsRankTopThree-first-stars">
                                <img className="SnsRankPage-SnsRankTopThree-first-stars-point"
                                    src={require('../../../public/StarGold.png')}
                                    alt=" "
                                />
                                <span className="SnsRankPage-SnsRankTopThree-starCount">{props.rankDataSet[0].stars}</span>
                        </div>
                    </div>
                    <div className="SnsRankPage-SnsRankTopThree-first">
                        <div className="SnsRankPage-SnsRankTopThree-firstAvatar"
                        style={{backgroundImage: `url(${props.rankDataSet[2].avatar? props.rankDataSet[2].avatar : require('../../../public/noimagetop.png')})`}}>
                            <div className="SnsRankPage-SnsRankTopThree-secondflag"  style={{backgroundImage: `url(${require('../../../public/top3@2x.png')})`}}>
                            <span className="SnsRankPage-SnsRankTopThree-number">3</span>
                            </div>
                        </div>
                        <div className="SnsRankPage-topthree-span-height">
                        <span className="SnsRankPage-SnsRankTopThree-first-Name">{props.rankDataSet[2].customer_name.substr(0, 18)}</span>
                        </div>
                        <div className="SnsRankPage-SnsRankTopThree-first-stars">
                                <img className="SnsRankPage-SnsRankTopThree-first-stars-point"
                                    src={require('../../../public/StarGold.png')}
                                    alt=" "
                                />
                                <span className="SnsRankPage-SnsRankTopThree-starCount">{props.rankDataSet[2].stars}</span>
                        </div>
                    </div>
                </div>
            )
        }

        const SnsRankMe = props => {
            return (
                <div className="SnsRankPage-SnsRankMe-div">
                    <span className="SnsRankPage-SnsRankMe-rank-span">{props.myRank.rank ?  props.myRank.rank :  '-'}</span>
                    <img className="SnsRankPage-SnsRankMe-rank-img" src={props.myRank.avatar? props.myRank.avatar : require('../../../public/noimagetop.png')} alt=" "/>
                    <span className="SnsRankPage-SnsRankMe-rank-name">{props.myRank.customer_name.substr(0, 18)  ?  props.myRank.customer_name.substr(0, 18) :  '-' }</span>
                    <img className="snsAnswerPage-SnsRankMe-starimg"
                        src={require('../../../public/StarGold.png')}
                        alt=" "
                    />
                    <span className="snsAnswerPage-SnsRankMe-starCount">{props.myRank.stars>=0 ?  props.myRank.stars :  '-'}</span>

                </div>
            )
        }

        function fliterIndextwoelement(el, index) {
            return index > 2;
        }

        var ddcount = 50;
        var rankcound = 3;

        let rankData = this.state.rankDataSet.filter(fliterIndextwoelement).map(persons => {
            return {
                rank: ++rankcound,
                customer_name: persons.customer_name, //persons.customer_name.length > 18 ? persons.customer_name.substring(0,18) : persons.customer_name.length,
                stars: persons.stars,
                avatar: persons.avatar,
            }
        })

        const SnsRankInfo = () => {
            return <div className="SnsRankOther-LastweekTitle">
                <span className="SnsRankOther-LastweekTitle-span">Top 50 Fashion Lovers</span>
                <span className="SnsRankOther-LastweekSubTitle-span">{this.state.dateText}</span>
            </div>
        }

        return (
            this.state.haveData && 
            <div className="SnsRankPage-content-div">
                    <SnsMyHeader />
                {!this.state.isloading && <Fragment>
                        <div style={{height: "0.4rem"}} />
                        {this.state.chooseRankListNumber === 2 ?  <SnsRankInfo /> : null}
                        <SnsRankTopThree rankDataSet={this.state.rankDataSet}/>
                        <SnsRankMe myRank={this.state.myRank}/>
                        <SnsRankOther rankData={rankData}/>
                        <hr className="SnsRankOther-dr-hr"/>
                        <div style={{height: "0.5rem"}}></div>
                    </Fragment>}
                {this.state.isloading && <div className="SnsRankPage-content-isloading">
                    <div className="SnsRankOther-loadingPic">
                    <ReactLoading type='spokes' color="#262729" height="0.3rem" width="0.3rem"/>
                    </div>
                </div> }
            </div>
        )
    }
}

export default SnsRankPage