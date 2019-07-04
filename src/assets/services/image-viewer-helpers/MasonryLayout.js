import * as React from "react";

export default class MasonryLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
    this.items = this.props.items;
  }

  determineColumnCount() {
    const width = this.refs.wrapper.clientWidth;
    return width > 960 ? 3 : width > 600 ? 2 : 1;
  }

  initializeColumns() {
    const columnCount = this.determineColumnCount();
    const arr = new Array(columnCount);
    for (var i = 0; i < columnCount; i++) {
      arr[i] = [];
    }
    this.setState({ columns: arr });
  }

  componentDidMount() {
    this.initializeColumns();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.items = this.props.items;
      this.initializeColumns();
      return;
    }
    if (this.items && this.items.length) {
      const columnIndex = this.getShortestColumnIndex();
      this.setState(state => {
        const columns = state.columns.slice();
        columns[columnIndex].push(this.items.pop());
        return { columns: columns };
      });
    }
  }

  renderColumns() {
    return this.state.columns.map((c, i) => (
      <div
        key={`col${i + 1}`}
        ref={`col${i + 1}`}
        style={{
          flexGrow: 1,
          backgroundColor: "#eee",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {this.state.columns[i].map((content, j) => (
          <div key={`col${i + 1}-${j}`}>{content}</div>
        ))}
      </div>
    ));
  }

  getShortestColumnIndex() {
    let shortestColumnHeight = this.refs[`col1`].clientHeight;
    let shortestColumn = 0;
    for (let i = 0; i < this.state.columns.length; i++) {
      if (this.refs[`col${i + 1}`].clientHeight < shortestColumnHeight) {
        shortestColumnHeight = this.refs[`col${i + 1}`].clientHeight;
        shortestColumn = i;
      }
    }
    return shortestColumn;
  }

  render() {
    return (
      <div
        ref="wrapper"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        {this.renderColumns()}
      </div>
    );
  }
}
