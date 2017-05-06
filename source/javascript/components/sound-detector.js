import { h, Component, render } from 'preact'
import DecibelMeter from 'decibel-meter'

class SoundDetector extends Component {
    constructor() {
        super();
        this.meter = new DecibelMeter('someUniqueId');
        this.state = {
            dbLevel: 0,
            dbPercent: 0
        }
    }

    componentDidMount() {
        // resolves with array of MediaDeviceInfo objects, filtered by type: audioinput
        this.meter.sources.then(sources => console.log(sources))

        this.meter.connectTo('default')
            .catch(error => console.error(error))
            .then(_ => {
                this.meter.listen();
            });
        
        this.meter.on('sample', this.updateLevel.bind(this)) // display current dB level
    }

    componentWillUnmount() {
        console.log('Unmounted');

        if (this.meter) {
            this.meter.stopListening();
        }
    }

    updateLevel(dB, percent, value) {
        //const state = {...this.state};
        //state.dbLevel = `${dB} dB`;
        //state.dbPercent = percent;

        this.props.onUpdate(dB, percent, value);

        //console.log(dB, percent, value);

        //this.setState(state);
    }

    /*render(props, state) {
        return (
            <div className="meter">
                <span className="meter__level" style={{ width: state.dbPercent + '%' }}></span>
            </div>
        )
    }*/
}

export default SoundDetector