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
                userParticipated={this.props.userParticipated}
                pollVoteCount={this.props.pollData.voteCount}>
            </ProgressBar>
        );
    }

    messages() {
        if (this.props.pollData.voteCount == 0) {
            return "You must vote before results will be shown."
        } else {
            return "Total Votes so far: " + this.props.pollData.voteCount + " ."
        }
    }

  render () {
    return(
        <section id="progress">
            <h5 className="question">{this.props.pollData.question}</h5>
            {this.props.pollData.options.map(this.progressBar.bind(this))}
            <h5>{this.messages()}</h5>
        </section>
    );
  }
}

