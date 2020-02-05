import React, { Component } from 'react'
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';

import { MODE } from '../../utils/constants';
import { setMode, startRecording, stopRecording, showMenu } from '../../statemanagement/app/AppStateManagement';
import BtnRecording from '../shared/BtnRecording';

class UIControls extends Component {

  constructor(props) {
    super(props);
  }

  // handleStartRecording() {
  //   this.props.dispatch(startCounting());
  // }

  render () {

    if(this.props.recordingStatus.isRecording) {
      var diff = Math.abs(new Date(this.props.recordingStatus.dateStarted) - new Date());
      var seconds = Math.floor(diff/1000) % 60;
      var minutes = Math.floor((diff/1000)/60);
    }

    return (
      <React.Fragment>
        <div className="nav">
          {this.props.recordingStatus.isRecording &&
            <div className="recording-bar"></div>
          }
          <div className="recording-status">
            {this.props.recordingStatus.isRecording &&
              <div className="time text-lg mb-1 font-bold">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
            }
            <div className="fps">{this.props.recordingStatus.currentFPS} FPS</div>
          </div>
          <div className="flex">
            <div className="nav-left mt-2 ml-2 shadow flex">

              {this.props.uiSettings.get('counterEnabled') &&
              (!this.props.recordingStatus.isRecording || this.props.isAtLeastOneCountingAreasDefined) &&
                <button
                  className={`btn btn-default border-r border-l border-default-soft border-solid ${this.props.mode === MODE.COUNTERVIEW ? 'btn-default--active' : ''} ${this.props.uiSettings.get('pathfinderEnabled') ? '': 'rounded-r'}`}
                  onClick={() => this.props.dispatch(setMode(MODE.COUNTERVIEW))}
                >
                  Counter
                </button>
              }
            </div>
          </div>
        </div>
        <style jsx>{`
          .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 3;
          }

          .nav-right {
            position: absolute;
            right: 0;
          }

          .recording-bar {
            background-color: #FF0000;
            text-align: center;
            width: 100%;
            z-index: 3;
            height: 0.32rem;
          }

          .recording-status {
            position: absolute;
            transform: translateX(-50%);
            margin-left: 50%;
            text-align: center;
            color: #FF0000;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            top: 1rem;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect((state) => {
  return {
    recordingStatus: state.app.get('recordingStatus').toJS(),
    uiSettings: state.app.get('uiSettings'),
    mode: state.app.get('mode'),
    isAtLeastOneCountingAreasDefined: state.counter.get('countingAreas').size > 0
  }
})(UIControls);
