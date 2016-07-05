var MainMenu = React.createClass({

  render: function() {
    return(
        <div className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-menu" aria-expanded="false">
                        <span className="sr-only">Toggle Navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Straw Poll</a>
                </div>
                <div className="navbar-collapse collapse" id="main-menu">
                    <ul className="nav navbar-nav">
                        <li className="active">
                            <button type="button" onClick={this.props.getPoll.bind(this, this.props.latestPoll)}>Favourite Color</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
  }
});
