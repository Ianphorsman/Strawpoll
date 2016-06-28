class ProgressBar extends React.Component {

    barWidth () {
        return "" + (this.props.pollSelectionYValue / this.props.voteCount * 100) + "%"
    }

    getWidth () {
        return { width: this.barWidth()}
    }
    
    
  render () {
    return(
        <div className="progress col-xs-12">
            <h5 data-poll-selection>{this.props.pollSelectionName}</h5>
            <div className="progress-bar" role="progressbar" style={this.getWidth()} aria-valuenow={this.props.pollSelectionYValue} aria-valuemin="0" aria-valuemax={this.props.pollVoteCount}></div>
            <span className="badge">{this.props.pollSelectionYValue}</span>
        </div>
    );
  }
}

