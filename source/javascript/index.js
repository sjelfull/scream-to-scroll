import '../stylus/style.styl';
import {h, render} from 'preact';

let root;
function init() {
  let App = require('./app').default;
	root = render(<App />, document.body, root);
}

if (module.hot) {
	require('preact/devtools');
	module.hot.accept('./app', () => requestAnimationFrame(init));
}

init();