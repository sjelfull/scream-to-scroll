import {
    h,
    Component,
    render
} from 'preact'

class Frame extends Component {
    constructor() {
        super();
    }

    render() {
        return <iframe / > ;
    }

    componentDidMount() {
        this.renderFrameContent();
    }
    componentDidMount() {

        var frameBody = ReactDOM.findDOMNode(this).contentDocument.body,
            el = document.createElement('div');
        frameBody.appendChild(el);
        this.el = el;
        this.updateIFrameContents();
    }

    renderFrameContents() {
        var doc = this.getDOMNode().contentDocument
        if (doc.readyState === 'complete') {
            React.renderComponent(this.props.children, doc.body);
        } else {
            setTimeout(this.renderFrameContents, 0);
        }
    }
    componentDidUpdate() {
        this.renderFrameContents();
    }

    componentWillUnmount() {
        React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
    }
}