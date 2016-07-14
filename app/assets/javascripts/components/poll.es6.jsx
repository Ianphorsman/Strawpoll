class Poll extends React.Component {
    
    belongsToPoll() {
        this.props.userVotes.filter()
    }
    
  render () {
    return(
        <section>
            <PieChart
                pollData={this.props.pollData}
                userHasVoted={this.props.userHasVoted}>

            </PieChart>
            <Progress
                pollData={this.props.pollData}
                voteCount={this.props.voteCount}
                userPollVotes={this.props.userPollVotes}
                userHasVoted={this.props.userHasVoted}
                duplicateVotesAllowed={this.props.duplicateVotesAllowed}
                userParticipated={this.props.userParticipated}
                vote={this.props.vote.bind(this)}>

            </Progress>
            <p className="well">{this.props.link}</p>
            
        </section>
    );
  }
}

