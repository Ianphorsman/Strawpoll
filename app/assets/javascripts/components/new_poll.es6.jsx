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
            <section id="poll-expiry">
                <p>Close poll in </p>
                <input type="text" name="poll-expires-in" placeholder="7" />
                <select name="poll-expiry-unit">
                    <option value="days">days</option>
                    <option value="hours">hours</option>
                    <option value="minutes">minutes</option>
                </select>
            </section>
            <button type="button" onClick={this.props.increaseOptionCount.bind(null)}>Add Option</button>
            <button type="button" onClick={this.props.makePoll.bind(null)}>Create</button>
        </form>
    );
  }
}

