class NewPoll extends React.Component {

    addSelectionFields(option) {
        return (
            <div className="col-xs-12 new-poll-field">
                <input
                    type="text"
                    name={"option_" + option}
                    onChange={this.props.updateOptionValue.bind(null, option[0])}
                    className={this.presentOption(option)}
                    placeholder="Enter poll option"
                />
            </div>
        )
    }

    validQuestion () {
        if (this.props.question.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    validOption(option) {
        if (this.props.options[option].length > 0 && this.validOptions()) {
            return true;
        } else {
            return false;
        }
    }

    presentOption(option) {
        if (this.validOption(option)) {
            return "form-control filled";
        } else {
            return "form-control";
        }
    }

    presentQuestion () {
        if (this.validQuestion()) {
            return "form-control filled";
        } else {
            return "form-control";
        }
    }

    validOptions () {
        let count = 0;
        let duplicatesExist = false;
        let mappedValues = {};
        for (key in this.props.options) {
            if (this.props.options[key].length > 0) {
                count++;
            }
            if (this.props.options[key] in mappedValues && this.props.options[key].length > 0) {
                duplicatesExist = true;
            } else {
                mappedValues[this.props.options[key]] = true;
            }
        }
        if (count > 1 && duplicatesExist == false) {
            return true;
        } else {
            return false;
        }
    }

    readyToSubmit () {
        if (this.validQuestion() && this.validOptions()) {
            return true;
        } else {
            return false;
        }
    }

    createPollEnabled() {
        if (this.readyToSubmit()) {
            return "btn btn-primary";
        } else {
            return "btn btn-primary disabled";
        }
    }

  render () {
    return(
        <form>
            <section className="row no-pad">
                <div className="col-xs-12 new-poll-field">
                    <input className={this.presentQuestion()} type="text" name="question" autoFocus="true" onChange={this.props.updateQuestion.bind(null)} placeholder="Type your questions here..." />
                </div>
                {Object.keys(this.props.options).map(this.addSelectionFields.bind(this))}
            </section>
            <section id="poll-expiry" className="row no-pad new-poll-field">
                <div className="col-xs-6 label-box">
                    <label className="right">Close poll in </label>
                </div>
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
                <div className="col-xs-6 label-box">
                    <label className="right">Votes allowed per person </label>
                </div>
                <div className="col-xs-6">
                    <input className="form-control" name="num-votes" placeholder="1" />
                </div>
                <div className="col-xs-6 label-box">
                    <label className="right">Cap poll at </label>
                </div>
                <div className="col-xs-4">
                    <input className="form-control" name="total-votes" placeholder="1000" />
                </div>
                <div className="col-xs-2 label-box">
                    <label> votes.</label>
                </div>
            </section>
            <section className="row no-pad new-poll-field">
                <div className="col-xs-5 col-xs-offset-7">
                    <div className="btn-group btn-group-justified" role="group">
                        <a className="btn btn-default" type="button" onClick={this.props.increaseOptionCount.bind(null)}>Add Option</a>
                        <a className={this.createPollEnabled()} type="button" onClick={this.props.makePoll.bind(null)}>Create</a>
                    </div>
                </div>
            </section>
        </form>
    );
  }
}

