class Progress extends React.Component {

    progressBar (pollSelection) {
        return(
            <ProgressBar
                pollSelectionName={pollSelection.label}
                pollSelectionYValue={pollSelection.yValue}
                pollSelectionColor={pollSelection.color}
                pollSelectionId={pollSelection.id}
                vote={this.props.vote.bind(this)}
                pollId={this.props.pollData.pollId}
                pollOpen={this.props.pollData.pollOpen}
                pollVoteCount={this.props.pollData.voteCount}>
            </ProgressBar>
        );
    }

  render () {
    return(
        <section id="progress">
            {this.props.pollData.options.map(this.progressBar.bind(this))}
        </section>
    );
  }
}

