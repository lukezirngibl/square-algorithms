import React, { Component } from "react";
import styled from "styled-components";
import { point, spiral, line, angle, pick } from 'square-algorithms/src';

const SPEED = 200;
const LENGTH = 10;
const TILE_LENGTH = 30;

const ExampleWrapper = styled.div``;

const Tile = styled.div`
  align-items: center;
  border: 1px solid black;
  display: flex;
  font-size: 12px;
  height: ${TILE_LENGTH}px;
  justify-content: center;
  width: ${TILE_LENGTH}px;

  &.selected {
    background: red;
    color: white;
  }
`;

const Header = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  button {
    margin-left: 10px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

class Example extends Component {
  constructor(props) {
    super(props);
    const length = props.example.length;
    const array = new Array(length * length);
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        array[j * length + i] = i * length + j;
      }
    }
    this.state = {
      tiles: array,
      selected: {}
    };
  }

  componentDidMount() {
    this.props.example.fn(this);
  }

  renderTileId = tile => {
    return tile;
  };

  renderTile = tile => (
    <Tile key={tile} className={this.state.selected[tile] ? "selected" : ""}>
      {this.renderTileId(tile)}
    </Tile>
  );

  render() {
    const { length, name } = this.props.example;
    return (
      <ExampleWrapper>
        <Header>
          {name}
          {/* <button>Restart</button> */}
        </Header>
        <Content
          style={{
            width: `${TILE_LENGTH * length}px`,
            height: `${TILE_LENGTH * length}px`
          }}
        >
          {this.state.tiles.map(this.renderTile)}
        </Content>
      </ExampleWrapper>
    );
  }
}

const ExamplesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const selectFunction = comp => i =>
  new Promise(resolve =>
    setTimeout(() => {
      comp.setState({
        selected: { ...comp.state.selected, [i]: true }
      });
      resolve();
    }, SPEED)
  );

const constructAngleType = quadrant => ({
  name: `angle - ${quadrant}`,
  length: LENGTH,
  selected: {},
  fn: comp => angle(quadrant)(LENGTH, selectFunction(comp))
});

const constructPointType = (quadrant, alternate) => ({
  name: `point - ${quadrant} - alternate:${alternate ? "true" : "false"}`,
  length: LENGTH,
  selected: {},
  fn: comp => point(quadrant, alternate)(LENGTH, selectFunction(comp))
});

const constructLineType = quadrant => ({
  name: `line - ${quadrant}`,
  length: LENGTH,
  selected: {},
  fn: comp => line(quadrant)(LENGTH, selectFunction(comp))
});

const pickType = (type, start, end) => ({
  name: `pick - ${type} - ${start} - ${end}`,
  length: LENGTH,
  selected: {},
  fn: comp =>
    comp.setState({
      selected: pick(LENGTH, ({ row, col }) => col * LENGTH + row)(
        type,
        start,
        end
      ).reduce((acc, i) => ({ ...acc, [i]: true }), {})
    })
});

const constructSpiralType = (type, quadrant, direction) => ({
  name: `spiral - ${type} - ${quadrant} - ${direction}`,
  length: LENGTH,
  selected: {},
  fn: comp => spiral(type, quadrant, direction)(LENGTH, selectFunction(comp))
});

export class App extends Component {
  renderExample = (example, key) => <Example example={example} key={key} />;

  render() {
    let demos = [];
    demos = [
      ...demos,
      constructAngleType("top-left"),
      constructAngleType("top-right"),
      constructAngleType("bottom-left"),
      constructAngleType("bottom-right"),
      constructLineType("bottom", true),
      constructLineType("left", true),
      constructLineType("right", true),
      constructLineType("top", true),
      constructPointType("bottom-left", true),
      constructPointType("top-right", true),
      constructPointType("top-left", true),
      constructPointType("bottom-right", true),
      constructPointType("bottom-right"),
      constructPointType("top-right"),
      constructPointType("top-left"),
      constructPointType("bottom-left"),
      constructSpiralType("in", "bottom-left", "cw"),
      constructSpiralType("in", "bottom-right", "cw"),
      constructSpiralType("in", "top-left", "cw"),
      constructSpiralType("in", "top-right", "cw"),
      constructSpiralType("out", "bottom-left", "cw"),
      constructSpiralType("out", "bottom-right", "cw"),
      constructSpiralType("out", "top-left", "cw"),
      constructSpiralType("out", "top-right", "cw"),
      constructSpiralType("in", "bottom-left", "ccw"),
      constructSpiralType("in", "bottom-right", "ccw"),
      constructSpiralType("in", "top-left", "ccw"),
      constructSpiralType("in", "top-right", "ccw"),
      constructSpiralType("out", "bottom-left", "ccw"),
      constructSpiralType("out", "bottom-right", "ccw"),
      constructSpiralType("out", "top-left", "ccw"),
      constructSpiralType("out", "top-right", "ccw"),
      pickType("left", 2, 0),
      pickType("top", 2, 0),
      pickType("right", 2, 0),
      pickType("bottom", 2, 0),
      pickType("left", 2, 1),
      pickType("top", 2, 1),
      pickType("right", 2, 1),
      pickType("bottom", 2, 1),
      pickType("top-right", 3, 0),
      pickType("top-right", 2, 2),
      pickType("top-left", 3, 0),
      pickType("top-left", 2, 2),
      pickType("bottom-left", 3, 0),
      pickType("bottom-left", 2, 2),
      pickType("bottom-right", 3, 0),
      pickType("bottom-right", 2, 2),
    ];
    return <ExamplesWrapper>{demos.map(this.renderExample)}</ExamplesWrapper>;
  }
}

