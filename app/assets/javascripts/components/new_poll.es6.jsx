class NewPoll extends React.Component {



    addSelectionFields(option) {
        return (
            <input
                type="text"
                name={"option_" + option}
                onChange={this.props.updateOptionValue.bind(null, option[0])}
                className="poll-option form-control"
                placeholder="Enter poll option"
            />
        )
    }

  render () {
    return(
        <form>
            <input className="form-control" type="text" name="question" placeholder="Type your questions here..." />
            <section id="poll-options">
                {Object.keys(this.props.options).map(this.addSelectionFields.bind(this))}
            </section>
            <section id="poll-expiry" className="form-inline">
                <div className="input-group">
                    <label className="input-group-addon">Close poll in </label>
                    <input className="form-control" type="text" name="poll-expires-in" placeholder="7" />
                </div>
                <div className="input-group">
                    <select className="form-control" name="poll-expiry-unit">
                        <option value="days">days</option>
                        <option value="hours">hours</option>
                        <option value="minutes">minutes</option>
                    </select>
                </div>
            </section>
            <section id="votes-per-person" className="form-inline">
                <div className="input-group">
                    <label className="input-group-addon">Votes allowed per person: </label>
                    <input className="form-control" name="num-votes" placeholder="1" />
                </div>
                <div className="input-group">
                    <p className="input-group-addon">Cap poll at </p>
                    <input className="form-control" name="total-votes" placeholder="1000" />
                    <p className="input-group-addon"> votes.</p>
                </div>
            </section>
            <section className="btn-group">
                <button className="btn btn-default" type="button" onClick={this.props.increaseOptionCount.bind(null)}>Add Option</button>
                <button className="btn btn-primary" type="button" onClick={this.props.makePoll.bind(null)}>Create</button>
            </section>
        </form>
    );
  }
}

