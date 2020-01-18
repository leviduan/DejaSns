import React, { Component } from 'react'
import imageStyle from  '../../../public/activityPic.jpg'
import './profile.css';
import { timingSafeEqual } from 'crypto';
import { number } from 'prop-types';
import snsRank from './snsRank';
import { Redirect } from 'react-router-dom';
import SnsPopup from './snsPopup';

// const screenWidth = document.documentElement.clientWidth

// var lastTouchEnd = 0;
// document.addEventListener('touchend', function (event) {
//   var now = (new Date()).getTime();
//   if (now - lastTouchEnd <= 300) {
//     event.preventDefault();
//   }
//   lastTouchEnd = now;
// }, false);


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state= {
            containerWidth: 0,
            clickBtn: false,
            clickCell: 0,
            isShow: false,
            percentValue: 50,
        }
        var timer;
    }

    componentDidMount() {

    }

    handleClick = (id) => (e) => {
        e.preventDefault();
        this.setState({clickBtn: true, clickCell: id})
    }

    toggleShow = () => {
        if (!this.state.isShow) {
            this.setState(prevState => ({
                isShow: true
            }));


            this.timer = setTimeout(()=>{
                this.setState(prevState => ({
                    percentValue: 100
                }));
                clearTimeout(this.timer);
            }, 1000);
        }
    }

    closeShow = () => {
        clearTimeout(this.timer)
        if (this.state.isShow) {
            this.setState(prevState => ({
                isShow: false
            }));
        }
    }

    render() {

        let infoData = {
            avatarUrl: 'https://pinterest.github.io/gestalt/static/media/keerthi.b283324e.jpg',
            username: 'Levi duan',
            point: 50,
            rank: 24,
        }

        return (
            <div className="containerProfile">
                <div className = "topbarStyle">
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
                <div className="main_container">
                    <div className = "image-container" style={{width: "100%", top: "3.3rem"}}>
                        <img className = "imagecell"  
                            src='https://assets.burberry.com/is/image/Burberryltd/aa8f25e45ace2545c793e849b988559686a46cc8.jpg?$BBY_V2_ML_3x4$=&wid=403&hei=537' 
                            onClick={this.handleClick(1)}
                            alt="text"
                            style= {(this.state.clickBtn && this.state.clickCell===1)?{opacity: 0.4}:{opacity: 1.0}}
                        />
                        { this.state.clickBtn && <img className = "imagecell"  
                            src='https://graph.facebook.com/386251168518864/picture?type=large' 
                            onClick={this.handleClick(2)}
                            alt="text"
                            style= {(this.state.clickBtn && this.state.clickCell===2)?{opacity: 0.4}:{opacity: 1.0}}
                        />}
                        <img className = "imagecell"  
                            src='https://img.itw01.com/images/2018/06/16/00/2436_uPBLUe_FPNTYED.jpg!r1024x0.jpg' 
                            onClick={this.handleClick(3)}
                            alt="text"
                            style= {(this.state.clickBtn && this.state.clickCell === 3) ?{opacity: 0.4}:{opacity: 1.0}}
                        />
                        <img className = "imagecell"  
                            src='https://img.itw01.com/images/2018/06/16/00/2436_uPBLUe_FPNTYED.jpg!r1024x0.jpg' 
                            onClick={this.handleClick(4)}
                            alt="text"
                            style= {(this.state.clickBtn && this.state.clickCell===4)?{opacity: 0.4}:{opacity: 1.0}}
                        />
                        <div className="buttonDivStyle">
                            <button 
                                className="commitButtonStyle"
                                onClick={this.toggleShow}>
                                Commit
                            </button>
                                {/* onClick={()=> {this.props.history.push('/snsRank')}}>Commit</button> */}
                        </div>
                    </div>
                </div>
                <SnsPopup isShow={this.state.isShow} clickToggle={this.closeShow} percent={this.state.percentValue}>
                </SnsPopup>       
            </div>     
        )
    }
}

export default Profile