import React, {Component} from 'react'
import './snsRank.css';
import {timingSafeEqual} from 'crypto';
import axios from 'axios';

export default class snsRank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: []
        }
    }

    componentDidMount() {
        axios
            .get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const persons = res.data;
                this.setState({persons});
            })
    }

    render() {
        let infoData = {
            avatarUrl: 'https://pinterest.github.io/gestalt/static/media/keerthi.b283324e.jpg',
            username: 'Levi duan',
            point: 50,
            rank: 24,
        }

        function fliterIndextwoelement(el, index) {
            return index > 1;
        }

        var ddcount = 50;

        let rankData = this.state.persons.filter(fliterIndextwoelement).map(persons => {
            return {
                rank: persons.id,
                username: persons.username,
                point: ++ddcount,
            }
        })

        const Row = props => (
            <div>
                <hr className="snsrank-style-one"/>
                <div className="snsrank-ranklist-rank-div">
                    <span className="snsrank-ranklist-rank-span">{props.rank}</span>
                    <span className="snsrank-ranklist-username-span">{props.username}</span>
                    <span className="snsrank-name-pointd">{props.point} Points</span>
                </div>
            </div>
        );

        return (
            <div className="snsrank-containerProfile">
                <div className="topbarStyle">
                    <img className="avatarStyle" src={infoData.avatarUrl} alt="text"/>
                    <span className="usernameStyle">{infoData.username}</span>
                    <div className="pointViewStyle">
                        <span className="userPointStyle">{infoData.point}</span>
                        <span className="userPointTitleStyle">Type</span>
                    </div>
                    <div className="rankViewStyle">
                        <span className="userRankStyle">{infoData.rank}</span>
                        <span className="userRankTitleStyle">Rank</span>
                    </div>
                </div>
                <div>
                    <div className="snsrank-title-div">
                        <span className="snsrank-title">Leaderboard of the week</span>
                    </div>
                    <div className="snsrank-avatarandname-div">
                        <div className="snsrank-avatar-div">
                            <div className="snsrank-name-flex-second">
                                <div
                                    className="sns-second-avatar-img"
                                    style={{
                                        backgroundImage: `url(${infoData.avatarUrl})`
                                    }}>
                                    <div className="sns-avatar-cover">
                                        <span className="sns-second-text">2</span>
                                        <span className="sns-second-st-text">st</span>
                                    </div>
                                </div>
                            </div>
                            <div className="snsrank-name-flex-first">
                                <div
                                    className="sns-frist-avatar-img"
                                    style={{
                                        backgroundImage: `url(${infoData.avatarUrl})`
                                    }}>
                                    <div className="sns-avatar-cover">
                                        <span className="sns-first-text">1</span>
                                        <span className="sns-first-st-text">st</span>
                                    </div>
                                </div>
                            </div>
                            <div className="snsrank-name-flex-third">
                                <div
                                    className="sns-third-avatar-img"
                                    style={{
                                        backgroundImage: `url(${infoData.avatarUrl})`
                                    }}>
                                    <div className="sns-avatar-cover">
                                        <span className="sns-second-text">3</span>
                                        <span className="sns-second-st-text">st</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="snsrank-name-div">
                            <div className="snsrank-name-flex-second">
                                <span className="sns-second-name">Jessca meng</span>
                            </div>
                            <div className="snsrank-name-flex-first">
                                <span className="sns-second-name">Levi duan</span>
                            </div>
                            <div className="snsrank-name-flex-third">
                                <span className="sns-second-name">cherry lam</span>
                            </div>
                        </div>
                        <div className="snsrank-name-div">
                            <div className="snsrank-name-flex-second">
                                <span className="snsrank-name-point">89 Points</span>
                            </div>
                            <div className="snsrank-name-flex-first">
                                <span className="snsrank-name-point">100 Points</span>
                            </div>
                            <div className="snsrank-name-flex-third">
                                <span className="snsrank-name-point">90 Points</span>
                            </div>
                        </div>
                        <div className="snsrank-ranklist-div">{rankData.map((rank,index) => <Row {...rank} key={index}/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}