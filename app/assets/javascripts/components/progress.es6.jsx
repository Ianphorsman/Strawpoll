class Progress extends React.Component {

    progressBar (pollSelection) {
        return(
            <ProgressBar
                pollSelectionName={pollSelection.label}
                pollSelectionYValue={pollSelection.yValue}
                pollSelectionColor={pollSelection.color}
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

