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
                <div className="meter__level-active-wrapper" style={{ width: state.dbPercent + '%' }}>
                    <img src="/assets/meter-active@2x.png" width="246" height="44" alt="" className="meter__active-level"/>
                </div>
                <img src="/assets/meter-inactive@2x.png" width="236" height="32" alt="" className="meter__level meter__level--inactive"/>
            </div>
        )
    }
}

export default SoundDetector