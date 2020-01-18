import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import api from "../../constant"
import './lookbookPage.css';
import {Masonry, createCellPositioner} from 'react-virtualized/dist/commonjs/Masonry'
import { CellMeasurerCache } from 'react-virtualized'
import 'react-virtualized/styles.css'
import {CellMeasurer} from 'react-virtualized/dist/commonjs/CellMeasurer'


const heights = [200, 100, 250, 150];
const colors = ["#8791c7", "#ff9421", "#ff6060", "#6464dc"];
  

const cache = new CellMeasurerCache({
    // defaultWidth: 100,
    minWidth: 75,
    fixedHeight: true,
  });


export default class lookbookPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columnWidth: 200,
            height: 300,
            gutterSize: 10,
            overscanByPixels: 0,
            windowScrollerEnabled: false,
          };

        this._cellPositioner = createCellPositioner(cache);
    }

    componentDidMount() {
        axios
            .get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const persons = res.data;
                this.setState({persons});
            })
    }

    _cellRenderer({index, key, parent, style}) {
        // const {list} = this.context;
    
        // const datum = list.get(index % list.size);
    
        return (
          <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
            <div
            //   className={styles.Cell}
              style={{
                ...style,
                width: '100%',
              }}>
              <div
                style={{
                  backgroundColor: '#8791c7',
                  borderRadius: '0.5rem',
                  height: 60,
                  marginBottom: '0.5rem',
                  width: '100%',
                  fontSize: 20,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {index}
              </div>
              {/* {datum.random} */}
            </div>
          </CellMeasurer>
        );
      }

    render() {


        return (
            <div className="lookbookPage-container">
                <Masonry
                    // autoHeight={true}
                    cellCount={20}
                    cellMeasurerCache={cache}
                    cellPositioner={this._cellPositioner}
                    cellRenderer={this._cellRenderer}
                    height={60}
                    overscanByPixels={0}
                    // ref={this._setMasonryRef}
                    // scrollTop={this._scrollTop}
                    width={60}
                />
            </div>
        );
    }
}