import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Communicator from 'communicator';

/// props
/// modelUri: Uri to the model
/// hwvReady(hwv): Function to call when hwv is ready
class ViewerComponent extends Component {
    constructor(props) {
        super(props);
        this.viewerId = uuidv4();
    }

    componentDidMount() {
        const hwv = new Communicator.WebViewer({
            containerId: this.viewerId,
            endpointUri: this.props.modelUri,
        });
        hwv.setCallbacks({
            sceneReady: () => {
                hwv.view.setBackgroundColor(Communicator.Color.white(), Communicator.Color.white());
            },
        });
        hwv.start();
        window.addEventListener('resize', () => {
            hwv.resizeCanvas();
        });
        this.props.hwvReady(hwv);
    }

    render() {
        return (
          <div className="bg-light w-100 h-100 position-relative" id={this.viewerId}></div>
        );
    }
}

export default ViewerComponent;