class Poll extends React.Component {
    
    
  render () {
    return(
        <section>
            <PieChart pollData={this.props.pollData}></PieChart>
            <Progress pollData={this.props.pollData} userParticipated={this.props.userParticipated} vote={this.props.vote.bind(this)}></Progress>
            
        </section>
    );
  }
}

