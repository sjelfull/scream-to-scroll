import { h, Component, render } from 'preact'
import DecibelMeter from 'decibel-meter'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

class SoundDetector extends Component {
    constructor() {
        super();
        this.meter = null;
        this.timer = null;
        this.state = {
            dbLevel: 0,
            dbPercent: 0
        }

        this.onListening = this.onListening.bind(this);
    }

    componentDidMount() {
        this.meter = new p5.AudioIn();
        this.meter.start(this.onListening, (error) => {
            console.error(error);
        });
        // resolves with array of MediaDeviceInfo objects, filtered by type: audioinput
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        if (this.meter) {
            this.meter.stop();
        }
    }

    onListening() {
        this.timer = setInterval(_ => {
            const state = {...this.state};
            const level = this.meter.getLevel();
            state.dbPercent = (level * 100);
            
            this.props.onUpdate((level * 100));
            this.setState(state);
        }, 200);
    }

    render(props, state) {
        return (
            <div className="meter">
                <span className="meter__level" style={{ width: state.dbPercent + '%' }}></span>
                <span className="meter__levelNumber">{state.dbPercent}</span>
            </div>
        )
    }
}

export default SoundDetector