"use strict";

var CamperBox = React.createClass({
  displayName: "CamperBox",

  getInitialState: function getInitialState() {
    return { data: [], mode: this.props.defaultMode };
  },
  componentDidMount: function componentDidMount() {
    /* Decide what kind of leaderboard to show when application starts */
    if (this.state.mode === "recent") this.getLeaderboardRecent();else this.getLeaderboardTotal();
  },
  getLeaderboardRecent: function getLeaderboardRecent() {
    /* The first condition allows to make a request when the application starts, the second condition allows to ignore clicks on the active column, since the data is already loaded */
    if (this.state.data.length === 0 || this.state.mode !== "recent") {
      $.getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function (json) {
        this.setState({ data: json, mode: "recent" });
      }.bind(this));
    }
  },
  getLeaderboardTotal: function getLeaderboardTotal() {
    if (this.state.data.length === 0 || this.state.mode !== "total") {
      $.getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function (json) {
        this.setState({ data: json, mode: "total" });
      }.bind(this));
    }
  },
  render: function render() {
    /* Make "active" the column whose data was loaded */
    var firstSpan = "sort",
        secondSpan = "sort";
    if (this.state.mode === "recent") firstSpan += " active";else secondSpan += " active";

    return React.createElement(
      "div",
      { className: "panel panel-default" },
      React.createElement(
        "div",
        { className: "panel-heading text-center" },
        "Leaderboard"
      ),
      React.createElement(
        "table",
        { className: "table table-bordered table-striped" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "#"
            ),
            React.createElement(
              "th",
              null,
              "Camper name"
            ),
            React.createElement(
              "th",
              { className: "text-center" },
              React.createElement(
                "span",
                { className: firstSpan,
                  onClick: this.getLeaderboardRecent },
                "Points in last 30 days"
              )
            ),
            React.createElement(
              "th",
              { className: "text-center" },
              React.createElement(
                "span",
                { className: secondSpan,
                  onClick: this.getLeaderboardTotal },
                "Total points"
              )
            )
          )
        ),
        React.createElement(CamperList, { data: this.state.data })
      )
    );
  }
});

var CamperList = React.createClass({
  displayName: "CamperList",

  /* Esempio di messaggio:
  {"username":"sjames1958gm",
  "img":"https://avatars.githubusercontent.com/u/4639625?v=3"
  "alltime":3506,
  "recent":513,
  "lastUpdate":"2016-10-16T00:23:07.900Z"} */

  render: function render() {
    var rows = this.props.data.map(function (camper, i) {
      return React.createElement(CamperItem, {
        key: i,
        index: i + 1,
        imgsrc: camper.img,
        camperName: camper.username,
        last30days: camper.recent,
        totalPoints: camper.alltime
      });
    });

    return React.createElement(
      "tbody",
      null,
      rows
    );
  }
});

var CamperItem = React.createClass({
  displayName: "CamperItem",

  render: function render() {
    return React.createElement(
      "tr",
      { key: this.props.index },
      React.createElement(
        "td",
        null,
        this.props.index
      ),
      React.createElement(
        "td",
        null,
        React.createElement("img", {
          alt: "Avatar image",
          src: this.props.imgsrc,
          className: "profile-pic" }),
        React.createElement(
          "a",
          { href: "https://www.freecodecamp.com/" + this.props.camperName.toLowerCase(),
            target: "_blank" },
          this.props.camperName
        )
      ),
      React.createElement(
        "td",
        { className: "text-center" },
        this.props.last30days
      ),
      React.createElement(
        "td",
        { className: "text-center" },
        this.props.totalPoints
      )
    );
  }
});

// modes: "recent" or "total"
// "total" is the default if a different value is passed
ReactDOM.render(React.createElement(CamperBox, { defaultMode: "recent" }), document.getElementById("content"));