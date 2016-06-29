class ProgressBar extends React.Component {

    barWidth () {
        return "" + Math.round(this.props.pollSelectionYValue / this.props.pollVoteCount * 100) + "%"
    }

    getStyle () {
        return { width: this.barWidth()}
    }
    
    
  render () {
    return(
        <div className="progress col-xs-12">
            <h5 data-poll-selection>{this.props.pollSelectionName}</h5>
            <div className="progress-bar" role="progressbar" style={this.getStyle()} data-color={this.props.pollSelectionColor} aria-valuenow={this.props.pollSelectionYValue} aria-valuemin="0" aria-valuemax={this.props.pollVoteCount}></div>
            <p className="vote-count">{this.props.pollSelectionYValue}</p>
            <button className="vote" type="button" onClick={this.props.vote.bind(this, this.props.pollSelectionId, this.props.pollId)}><i className="fa fa-plus"></i></button>
        </div>
    );
  }
}

