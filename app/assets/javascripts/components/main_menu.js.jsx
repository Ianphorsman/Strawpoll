var MainMenu = React.createClass({

    listPoll: function(poll) {
        return(
            <li>
                <a type="button" onClick={this.props.getPoll.bind(this, poll.id)}>{poll.question}</a>
            </li>
        );
    },

  render: function() {
    return(
        <div className="navbar navbar-default navbar-fixed-top">
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
                    <ul className="nav navbar-nav navbar-left">
                        <li>
                            <a type="button" onClick={this.props.getPoll.bind(this, this.props.latestPoll)}>Latest Poll</a>
                        </li>
                        <li>
                            <a type="button" onClick={this.props.changePollContext.bind(this, 'newPoll')}>New Poll</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Your Latest Polls<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                {this.props.userPolls.map(this.listPoll)}
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Popular<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                {this.props.popularPolls.map(this.listPoll)}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
  }
});
