import { h, Component, render  } from 'preact'
import SoundDetector from './components/sound-detector'
import Browser from './components/browser'

class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="page">
        <Browser />
      </div>
    )
  }
}

export default App;