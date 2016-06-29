class Poll extends React.Component {

    messages() {
        if (this.props.pollData.voteCount == 0) {
            return "You must vote before results will be shown."
        } else {
            return "Total Votes so far:" + this.props.pollData.voteCount + " ."
        }
    }
    
    
  render () {
    return(
        <section>
            <PieChart pollData={this.props.pollData}></PieChart>
            <Progress pollData={this.props.pollData} vote={this.props.vote.bind(this)}></Progress>
            <h5>{this.messages()}</h5>
        </section>
    );
  }
}

