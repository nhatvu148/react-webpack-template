import { Component } from "react";
import "./App.css";
import aquo_bottle from "./assets/aquo_bottle.scs";
import logo from "./assets/ts3d_logo.png";
// @ts-ignore
import ViewerComponent from "./components/viewer-component";
// import Communicator from 'communicator';
// @ts-ignore
import ModelTreeComponent from "./components/model-tree-component";

class App extends Component {
  constructor(props: any) {
    super(props);
    // Functions
    this.hwvReady = this.hwvReady.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.changeOperator = this.changeOperator.bind(this);
    // State
    this.state = {
      hwv: null,
      currentTab: 1, // 1: Home, 2: ModelTree
      cameraStatus: null,
      operator: "Orbit",
      isStructureReady: false,
    };
  }

  // Callback when the new hwv is ready
  hwvReady(newHWV: any) {
    this.setState(
      {
        hwv: newHWV,
      },
      () => {
        // @ts-ignore
        this.state.hwv.setCallbacks({
          sceneReady: () => {
            this.setState({
              // @ts-ignore
              cameraStatus: this.state.hwv.view.getCamera().toJson(),
            });
          },
          modelStructureReady: () => {
            this.setState({
              isStructureReady: true,
            });
          },
          camera: () => {
            this.setState({
              // @ts-ignore
              cameraStatus: this.state.hwv.view.getCamera().toJson(),
            });
          },
        });
      }
    );
  }

  changeOperator(event: any) {
    this.setState(
      {
        operator: event.target.value,
      },
      () => {
        // @ts-ignore
        if (!this.state.hwv) return;
        // @ts-ignore
        this.state.hwv.operatorManager.clear();
        // @ts-ignore
        this.state.hwv.operatorManager.push(Communicator.OperatorId.Orbit);
        // @ts-ignore
        if (this.state.operator === "Area Select") {
          // @ts-ignore
          this.state.hwv.operatorManager.push(
            Communicator.OperatorId.AreaSelect
          );
          // @ts-ignore
        } else if (this.state.operator === "Select") {
          // @ts-ignore
          this.state.hwv.operatorManager.push(Communicator.OperatorId.Select);
          // @ts-ignore
        } else if (this.state.operator === "Measure") {
          // @ts-ignore
          this.state.hwv.operatorManager.push(
            Communicator.OperatorId.MeasurePointPointDistance
          );
        }
      }
    );
  }

  changeTab(newTab: any) {
    this.setState({
      currentTab: newTab,
    });
  }

  render() {
    const navItem = (value: any, content: any) => {
      return (
        <li className="nav-item">
          <button
            // @ts-ignore
            className={
              "nav-link " + (this.state.currentTab === value ? "active" : "")
            }
            onClick={() => {
              this.changeTab(value);
            }}
            type="button"
          >
            {content}
          </button>
        </li>
      );
    };
    // @ts-ignore
    const cameraStatusContent =
      this.state.cameraStatus == null ? (
        <p>Unavailable</p>
      ) : (
        <div>
          <p className="mb-0">
            <strong>Position: </strong>
            {/* @ts-ignore */}({this.state.cameraStatus.position.x.toFixed(2)},{" "}
            {this.state.cameraStatus.position.y.toFixed(2)},{" "}
            {this.state.cameraStatus.position.z.toFixed(2)})
          </p>
          <p className="mb-0">
            <strong>Target: </strong>
            {/* @ts-ignore */}({this.state.cameraStatus.target.x.toFixed(2)},{" "}
            {this.state.cameraStatus.target.y.toFixed(2)},{" "}
            {this.state.cameraStatus.target.z.toFixed(2)})
          </p>
          <p className="mb-0">
            <strong>Up: </strong>
            {/* @ts-ignore */}({this.state.cameraStatus.up.x.toFixed(2)},{" "}
            {this.state.cameraStatus.up.y.toFixed(2)},{" "}
            {this.state.cameraStatus.up.z.toFixed(2)})
          </p>
          <p className="mb-0">
            {/* @ts-ignore */}
            <strong>Width: </strong> {this.state.cameraStatus.width.toFixed(2)}{" "}
            &nbsp;
            {/* @ts-ignore */}
            <strong>Height: </strong>{" "}
            {this.state.cameraStatus.height.toFixed(2)}
          </p>
          <p className="mb-0">
            {/* @ts-ignore */}
            <strong>Projection: </strong>{" "}
            {this.state.cameraStatus.projection.toFixed(2)} &nbsp;
            {/* @ts-ignore */}
            <strong>NearLimit: </strong>{" "}
            {this.state.cameraStatus.nearLimit.toFixed(2)}
          </p>
          {/* @ts-ignore */}
          <p className="mb-0">
            <strong>Class Name: </strong> {this.state.cameraStatus.className}
          </p>
        </div>
      );
    // @ts-ignore
    const homeTabContent = (
      <div
        className={
          "tab-pane fade show " + (this.state.currentTab === 1 ? "active" : "")
        }
      >
        <h2>React Demo for Hoops Web Platform</h2>
        {/* Operator Selection */}
        <h5>Operator</h5>
        {/* @ts-ignore */}
        <select
          className="form-select mb-3"
          value={this.state.operator}
          onChange={this.changeOperator}
        >
          <option value="Orbit">Orbit</option>
          <option value="Area Select">Area Select</option>
          <option value="Select">Select</option>
          <option value="Measure">Measure</option>
        </select>
        {/* Camera Status */}
        <h5>Camera Status</h5>
        {cameraStatusContent}
      </div>
    );
    // @ts-ignore
    const modelStructureTabContent = (
      <div
        className={
          "tab-pane fade show " + (this.state.currentTab === 2 ? "active" : "")
        }
      >
        <h5>Model Structure</h5>
        {
          // @ts-ignore
          this.state.isStructureReady ? (
            // @ts-ignore
            <ModelTreeComponent hwv={this.state.hwv}></ModelTreeComponent>
          ) : (
            <p>Model structure is not ready</p>
          )
        }
      </div>
    );

    return (
      <div className="container-fluid p-0 m-0">
        <div className="row p-0 m-0" style={{ height: "100vh" }}>
          {/* HWP WebViewer with Custom Component */}
          <div className="col-6 p-0 m-0 border-end">
            <ViewerComponent
              modelUri={aquo_bottle}
              hwvReady={this.hwvReady}
            ></ViewerComponent>
          </div>
          {/* Control panel on the right side */}
          <div
            className="col-6 p-0 m-0 overflow-scroll"
            style={{ height: "100vh" }}
          >
            {/* Logo */}
            <img
              src={logo}
              className="img-fluid m-3"
              style={{ maxHeight: "100px" }}
              alt="TechSoft 3D LOGO"
            ></img>
            {/* NavBar */}
            <ul className="nav nav-tabs px-3">
              {navItem(1, "Home")}
              {navItem(2, "ModelStructure")}
            </ul>
            {/* Tab Contents */}
            <div className="tab-content p-3">
              {homeTabContent}
              {modelStructureTabContent}
            </div>{" "}
            {/* Tab Contents End */}
          </div>{" "}
          {/* Right Panel End */}
        </div>{" "}
        {/* Row End */}
      </div>
    );
  }
}

export default App;
