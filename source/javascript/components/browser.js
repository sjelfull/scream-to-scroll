import { h, Component, render } from 'preact'
import fetch from 'unfetch';
import SoundDetector from './sound-detector'

class Browser extends Component {
    constructor() {
        super();
        this.maxScroll = 0;
        this.currentScroll = 0;
        this.currentScreamingLevel = 0;
        this.increment = 0;
        this.timer = null;

        this.state = {
            url: 'https://google.no'
        }

        this.onInput = this.onInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.fetchUrl = this.fetchUrl.bind(this);
        this.updateMaxScroll = this.updateMaxScroll.bind(this);
        this.increaseScroll = this.increaseScroll.bind(this);
        this.onUpdateLevel = this.onUpdateLevel.bind(this);
    }

    componentDidMount() {
        this.fetchUrl();
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    onInput() {
        const state = {...this.state};
        state.url = this.urlInput.value;
        this.setState(state);
    }

    updateMaxScroll() {
        this.currentScroll = 0;
        this.maxScroll = this.iframe.contentDocument.body.scrollHeight;
        this.increment = Math.ceil((this.maxScroll / 100) * 2);

        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(_ => {
            this.increaseScroll();
        }, 200);
    }

    setIncrement() {
        // TODO: Something based on the dB level
        this.increment = Math.ceil((this.maxScroll / 100) * 4);
    }

    getIncrement() {
        // Baseline = 3
        const increment = (this.currentScreamingLevel/100) * 15;
        // TODO: Something based on the dB level
        return Math.ceil((this.maxScroll / 100) * increment);
    }

    increaseScroll() {
        if (this.currentScreamingLevel > 15) {
            let newScroll = this.currentScroll + this.getIncrement();

            if (newScroll < this.maxScroll) {
                    this.currentScroll = newScroll;
                    this.iframe.contentWindow.scrollTo(0, this.currentScroll);
            } else {
                this.currentScroll = 0;
                this.iframe.contentWindow.scrollTo(0, this.currentScroll);
                //clearInterval(this.timer);
            }
        }
    }

    onSubmit(event) {
        event.preventDefault();

        // complex POST request with JSON, headers:
        this.fetchUrl();
    }

    onClose(event) {
        event.preventDefault();
        console.log('close');
        this.props.onClose();
    }

    onUpdateLevel(level) {
        this.currentScreamingLevel = level;
    }
    
    fetchUrl() {
        fetch('/api/browser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                url: this.props.url })
            }).then( r => {
                return r.text()
            }).then(body => {
                this.iframe.contentDocument.body.innerHTML = body;

                this.updateMaxScroll();
            });
    }

    render(props, state) {
        return (
            <div className="browser">
                <SoundDetector onUpdate={this.onUpdateLevel} />
                <button className="button button-black browser-close" onClick={this.onClose} type="button">Back</button>
                <iframe frameborder="0" className="browser-window" ref={(iframe) => this.iframe = iframe}></iframe>
            </div>
        )
    }
}

export default Browser