import { h, Component, render } from 'preact'
import fetch from 'unfetch';
import SoundDetector from './sound-detector'

class Browser extends Component {
    constructor() {
        super();
        this.maxScroll = 0;
        this.currentScroll = 0;
        this.increment = 0;
        this.timer = null;

        this.state = {
            url: 'https://google.no'
        }

        this.onInput = this.onInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchUrl = this.fetchUrl.bind(this);
        this.updateMaxScroll = this.updateMaxScroll.bind(this);
        this.increaseScroll = this.increaseScroll.bind(this);
        this.onUpdateLevel = this.onUpdateLevel.bind(this);
    }

    componentDidMount() {
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
        }, 250);
    }

    setIncrement() {
        // TODO: Something based on the dB level
        this.increment = Math.ceil((this.maxScroll / 100) * 2);
    }

    increaseScroll() {
        const newScroll = this.currentScroll + this.increment;

        if (newScroll < this.maxScroll) {
            this.currentScroll = newScroll;
            
            this.iframe.contentWindow.scrollTo(0, this.currentScroll);
        } else {
            clearInterval(this.timer);
        }
    }

    onSubmit(event) {
        event.preventDefault();

        // complex POST request with JSON, headers:
        this.fetchUrl();
    }

    onUpdateLevel(dB, percent, value) {
        console.log(dB, percent, value);
    }
    
    fetchUrl() {
        fetch('/api/browser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                url: this.urlInput.value })
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
                <form className="browser-input" onSubmit={this.onSubmit}>
                    <input type="text" ref={(input) => this.urlInput = input } value={state.url} onInput={this.onInput} placeholder="http://google.no" className="browser-input__input"/>
                    <button className="browser-input__button">Go</button>
                </form>
                <iframe frameborder="0" className="browser-window" ref={(iframe) => this.iframe = iframe}></iframe>
            </div>
        )
    }
}

export default Browser