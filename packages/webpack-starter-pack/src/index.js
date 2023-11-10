// MyLibrary needs to be in scope for JSX to work
import MyLibrary from "./myLibrary";
import MyLibraryDom from "./myLibraryDom";


class Counter extends MyLibrary.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={() => {
          this.updateState({
            count: this.state.count + 1
          })
          console.log("Updated state")
        }}>Increment</button>
      </div>
    )
  }
}

MyLibraryDom.render(<Counter/>, document.getElementById("root"));