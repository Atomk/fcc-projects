"use strict";

var MarkdownBox = React.createClass({
  displayName: "MarkdownBox",

  getInitialState: function getInitialState() {
    return { text: "# Yayyy markdown\nThis was kind of **hard** to make with `React` but it will get _easier_ with practice.\n\n>_Put inspiring quote here_\n\n- Harder\n- Better\n- Faster\n- Coder" };
  },
  updateMarkup: function updateMarkup(newText) {
    this.setState({ text: newText });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "fill" },
      React.createElement(
        MarkdownText,
        { handleChange: this.updateMarkup },
        this.state.text
      ),
      React.createElement(
        MarkdownPreview,
        null,
        this.state.text
      )
    );
  }
});

var MarkdownText = React.createClass({
  displayName: "MarkdownText",

  handleChange: function handleChange() {
    this.props.handleChange(this.refs.myText.value);
  },
  render: function render() {
    return React.createElement("textarea", { onChange: this.handleChange,
      ref: "myText",
      className: "markdownText",
      placeholder: "Write some markdown!",
      defaultValue: this.props.children });
  }
});

var MarkdownPreview = React.createClass({
  displayName: "MarkdownPreview",

  getRawMarkup: function getRawMarkup() {
    var raw = marked(this.props.children, { sanitize: true });
    return { __html: raw };
  },
  render: function render() {
    return React.createElement("div", { className: "markdownPreview",
      dangerouslySetInnerHTML: this.getRawMarkup() });
  }
});

ReactDOM.render(React.createElement(MarkdownBox, null), document.getElementById('app'));