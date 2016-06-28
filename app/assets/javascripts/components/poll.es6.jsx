class Poll extends React.Component {
    
    
  render () {
    return(
        <section>
            <PieChart pollData={this.props.pollData}></PieChart>
            <Progress pollData={this.props.pollData}></Progress>
        </section>
    );
  }
}

