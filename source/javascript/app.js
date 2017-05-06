import { h, Component, render  } from 'preact'
import SoundDetector from './components/sound-detector'
import Browser from './components/browser'

require('marquee3000/marquee3k.js');

class App extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
      showBrowser: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {

    Marquee3k({spacing: 32});

    $('.popup').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      mainClass: 'mfp-img-mobile',
      image: {
        verticalFit: true
      }
    });

    $('.popup-video').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-img-mobile',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState({
      url: this.urlInput.value,
      showBrowser: true,
    });
  }

  onClose(event) {
    this.setState({
      url: '',
      showBrowser: false,
    });   
  }

  render(props, state) {
    return (
      <div className="page">
          <header className="header">
            <h1 className="logo">Scream 2 scroll</h1>
            <section className="navigation">
              <a href="/assets/home.jpg" className="button button-blue popup" title="home.jpg">Home</a>
              <a href="https://www.youtube.com/watch?v=woobL2yAxD4" className="button button-blue popup-video" title="man_yelling_like_goat.avi">Video</a>
              <a href="faq.html" className="button button-blue popup-video">FAQ</a>
              <a href="https://scream2scroll.bigcartel.com" className="button button-blue" target="_blank">Shop</a>
              <a href="#" className="button button-blue">Menu</a>
            </section>
          </header>

        <section className="content">
          <section className="marquee marquee-one">
            <div className="marquee3k" data-speed="20" data-reverse="true"><span>Scream 2 scroll</span><span>Scream 2 scroll</span><span>Scream 2 scroll</span></div>
            <div className="marquee3k" data-speed="40" data-reverse="false"><span>Scream 2 scroll</span><span>Scream 2 scroll</span><span>Scream 2 scroll</span></div>
            <div className="marquee3k" data-speed="60" data-reverse="true"><span>Scream 2 scroll</span><span>Scream 2 scroll</span><span>Scream 2 scroll</span></div>
          </section>

          <section className="form">
            <form onSubmit={this.onSubmit}>
            <section className="form-content">
              <section>
                <img src="/assets/directions_one.svg" />
                  <input ref={(input) => this.urlInput = input } type="text" placeholder="http://your-url.com" className="input" />
              </section>
              <section>
                <img src="/assets/directions_two.svg" />
                <button className="button button-blue">Go!</button>
              </section>
              <a href="http://google.com" className="button button-red">Feeling unlucky?</a>
            </section>
              </form>
          </section>

          <section className="marquee marquee-one">
            <div className="marquee3k" data-speed="60" data-reverse="true"><span>Scream 2 scroll</span><span>Scream 2 scroll</span><span>Scream 2 scroll</span></div>
            <div className="marquee3k" data-speed="20" data-reverse="false"><span>Scream 2 scroll</span><span>Scream 2 scroll</span><span>Scream 2 scroll</span></div>
            <div className="marquee3k" data-speed="40" data-reverse="true"><span>Scream 2 scroll</span><span>Scream 2 scroll</span><span>Scream 2 scroll</span></div>
          </section>
        </section>

        <footer className="footer">
          <p><a href="/assets/top.jpg" className="popup" title="top.jpg">To the top</a></p>
          <p><a href="http://screaming.enterprises">2016 &copy; Screaming Enterprises LLC</a></p>
        </footer>

        <section className="free">
          <img src="/assets/free.svg" />
        </section>

        {state.showBrowser && <Browser onClose={this.onClose} url={state.url} /> }
      </div>
    )
  }
}

export default App;