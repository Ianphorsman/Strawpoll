class Progress extends React.Component {

    countVotes(pollSelection) {
        let count = 0;
        Object.keys(this.props.userPollVotes).forEach((voteId) => {
            if (this.props.userPollVotes[voteId].poll_selection_id == pollSelection.id) {
                count++;
            }
        });
        return count;
    }

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
                userVotes={this.countVotes(pollSelection)}
                pollVoteCount={this.props.voteCount}>
            </ProgressBar>
        );
    }

    messages() {
        if (this.props.voteCount == 0) {
            return "No votes have been cast yet."
        } else {
            return "Total Votes so far: " + this.props.voteCount + " ."
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

