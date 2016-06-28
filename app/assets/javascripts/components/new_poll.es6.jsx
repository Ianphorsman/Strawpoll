class NewPoll extends React.Component {



    addSelectionFields(option) {
        return (
            <input
                type="text"
                name={"option_" + option}
                onChange={this.props.updateOptionValue.bind(null, option[0])}
                className="poll-option"
                placeholder="Enter poll option"
            />
        )
    }

  render () {
    return(
        <form>
            <input type="text" name="question" placeholder="Type your questions here..." />
            <section id="poll-options">
                {Object.keys(this.props.options).map(this.addSelectionFields.bind(this))}
            </section>
            <button type="button" onClick={this.props.increaseOptionCount.bind(null)}>Add Option</button>
            <button type="button" onClick={this.props.makePoll.bind(null)}>Create</button>
        </form>
    );
  }
}

