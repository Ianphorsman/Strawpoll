class Poll extends React.Component {
    
    
  render () {
    return(
        <section>
            <PieChart pollData={this.props.pollData}></PieChart>
            <Progress pollData={this.props.pollData} vote={this.props.vote.bind(this)}></Progress>
        </section>
    );
  }
}

