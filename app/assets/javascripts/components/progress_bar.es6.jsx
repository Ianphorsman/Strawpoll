class ProgressBar extends React.Component {

    barWidth () {
        return "" + Math.round(this.props.pollSelectionYValue / (this.props.pollVoteCount) * 100) + "%";
    }

    barWidthAmount () {
        let percent = Math.round(this.props.pollSelectionYValue / (this.props.pollVoteCount + 0.01) * 100);
        if (percent == 99) {
            percent = 100;
        }
        return "" + percent + "%";
    }

    getStyle () {
        return { width: this.barWidth()}
    }

    voteButton () {
        if (this.props.pollOpen && !(this.props.userParticipated)) {
            if ((!(this.props.duplicateVotesAllowed) && this.props.userVotes == 0) || this.props.duplicateVotesAllowed) {
                return(
                    <button className="vote" type="button" onClick={this.props.vote.bind(this, this.props.pollSelectionId, this.props.pollId)}><i className="fa fa-plus"></i></button>
                );
            }
        }
    }

    userVoteStyle() {
        if (this.props.userVotes > 0) {
            return "progress col-xs-12 user-selected";
        } else {
            return "progress col-xs-12";
        }
    }
    
    
  render () {
    return(
        <div className={this.userVoteStyle()}>
            <h5 data-poll-selection>{this.props.pollSelectionName}</h5>
            <div className="progress-bar" role="progressbar" style={this.getStyle()} data-color={this.props.pollSelectionColor} aria-valuenow={this.props.pollSelectionYValue} aria-valuemin="0" aria-valuemax={this.props.pollVoteCount}></div>
            <p className="vote-count">{this.props.pollSelectionYValue}</p>
            <p className="vote-percentage">{this.barWidthAmount()}</p>
            {this.voteButton()}
        </div>
    );
  }
}

