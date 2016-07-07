class NewPoll extends React.Component {



    addSelectionFields(option) {
        return (
            <div className="col-xs-12 new-poll-field">
                <input
                    type="text"
                    name={"option_" + option}
                    onChange={this.props.updateOptionValue.bind(null, option[0])}
                    className="poll-option form-control"
                    placeholder="Enter poll option"
                />
            </div>
        )
    }

  render () {
    return(
        <form>
            <section className="row no-pad">
                <div className="col-xs-12 new-poll-field">
                    <input className="form-control" type="text" name="question" placeholder="Type your questions here..." />
                </div>
                {Object.keys(this.props.options).map(this.addSelectionFields.bind(this))}
            </section>
            <section id="poll-expiry" className="row no-pad new-poll-field">
                <label className="col-xs-6">Close poll in </label>
                <div className="col-xs-3">
                    <input className="form-control" type="text" name="poll-expires-in" placeholder="7" />
                </div>
                <div className="col-xs-3">
                    <select className="form-control" name="poll-expiry-unit">
                        <option value="days">days</option>
                        <option value="hours">hours</option>
                        <option value="minutes">minutes</option>
                    </select>
                </div>
            </section>
            <section id="votes-per-person" className="row no-pad new-poll-field">
                <label className="col-xs-6">Votes allowed per person </label>
                <div className="col-xs-6">
                    <input className="form-control" name="num-votes" placeholder="1" />
                </div>
                <label className="col-xs-6">Cap poll at </label>
                <div className="col-xs-4">
                    <input className="form-control" name="total-votes" placeholder="1000" />
                </div>
                <label className="col-xs-2"> votes.</label>
            </section>
            <section className="row no-pad new-poll-field">
                <div className="col-xs-5 col-xs-offset-7">
                    <div className="btn-group btn-group-justified" role="group">
                        <a className="btn btn-default" type="button" onClick={this.props.increaseOptionCount.bind(null)}>Add Option</a>
                        <a className="btn btn-primary" type="button" onClick={this.props.makePoll.bind(null)}>Create</a>
                    </div>
                </div>
            </section>
        </form>
    );
  }
}

