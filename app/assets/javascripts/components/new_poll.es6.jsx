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
        let duplicateExists = false;
        let duplicateValue = this.props.options[option];
        for (let key in Object.keys(this.props.options)) {
            if (this.props.options[key] === duplicateValue && this.props.options[key].length > 0 && key < option) {
                duplicateExists = true;
            }
        }
        if (this.filledOption(option) && duplicateExists == false) {
            return true;
        } else {
            return false;
        }
    }

    filledOption(option) {
        if (this.props.options[option].length > 0) {
            return true;
        } else {
            return false;
        }
    }

    presentOption(option) {
        if (this.validOption(option) && this.filledOption(option)) {
            return "form-control option filled";
        } else if (!(this.validOption(option)) && this.filledOption(option)) {
            return "form-control option error";
        } else {
            return "form-control option";
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
        for (let key in this.props.options) {
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

    validNumVotes() {
        if (this.props.numVotes > 0) {
            return true;
        } else {
            return false;
        }
    }

    presentNumVotes() {
        if (this.validNumVotes()) {
            return "form-control filled poll-option";
        } else {
            return "form-control";
        }
    }

    validTotalVotes() {
        if (this.props.totalVotes > 1) {
            return true;
        } else {
            return false;
        }
    }

    presentTotalVotes() {
        if (this.validTotalVotes()) {
            return "form-control filled poll-option";
        } else {
            return "form-control";
        }
    }

    validPollExpiresIn() {
        if (this.props.pollExpiresIn > 0) {
            return true;
        } else {
            return false;
        }
    }

    presentPollExpiresIn() {
        if (this.validPollExpiresIn()) {
            return "form-control filled poll-option";
        } else {
            return "form-control";
        }
    }

    validVotesRequired() {
        if ((this.props.votesRequired > 0 && this.props.votesRequired <= this.props.numVotes)) {
            return true;
        } else {
            return false;
        }
    }

    presentVotesRequired() {
        if (this.validVotesRequired()) {
            return "form-control filled poll-option";
        } else {
            return "form-control";
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
            return "btn create-poll";
        } else {
            return "btn create-poll disabled";
        }
    }

  render () {
    return(
        <form>
            <section className="row no-pad">
                <div className="col-xs-12 new-poll-field">
                    <input className={this.presentQuestion()} type="text" name="question" autoFocus="true" onChange={this.props.updateQuestion.bind(null)} placeholder="Type your question here..." />
                </div>
                {Object.keys(this.props.options).map(this.addSelectionFields.bind(this))}
            </section>
            <section id="poll-expiry" className="row no-pad new-poll-field">
                <div className="col-xs-6 label-box">
                    <label className="right">Close poll in </label>
                </div>
                <div className="col-xs-4">
                    <input className={this.presentPollExpiresIn()} onChange={this.props.updatePollExpiresIn.bind(null)} type="text" name="poll-expires-in" placeholder="7" />
                </div>
                <div className="col-xs-2">
                    <select className="form-control" onChange={this.props.updatePollExpiryUnit.bind(null)} name="poll-expiry-unit">
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
                <div className="col-xs-4">
                    <input className={this.presentNumVotes()} onChange={this.props.updateNumVotes.bind(null)} name="num-votes" placeholder="1" />
                </div>
                <div className="col-xs-2">
                </div>
                <div className="col-xs-6 label-box">
                    <label className="right">Votes required per person </label>
                </div>
                <div className="col-xs-4">
                    <input className={this.presentVotesRequired()} onChange={this.props.updateVotesRequired.bind(null)} name="votes-required" placeholder="1" />
                </div>
                <div className="col-xs-2">
                </div>
                <div className="col-xs-6 label-box">
                    <label className="right">Duplicate Votes Allowed </label>
                </div>
                <div className="col-xs-4">
                    <input type="checkbox" className="form-control" onChange={this.props.updateDuplicateVotesAllowed.bind(null)} name="duplicate-votes-allowed" />
                </div>
                <div className="col-xs-2">
                </div>
                <div className="col-xs-6 label-box">
                    <label className="right">Cap poll at </label>
                </div>
                <div className="col-xs-4">
                    <input className={this.presentTotalVotes()} onChange={this.props.updateTotalVotes.bind(null)} name="total-votes" placeholder="1000" />
                </div>
                <div className="col-xs-2 label-box">
                    <label> votes.</label>
                </div>
            </section>
            <section className="row no-pad new-poll-field">
                <div className="col-xs-5 col-xs-offset-7">
                    <div className="btn-group btn-group-justified" role="group">
                        <a className="btn btn-default add-option" type="button" onClick={this.props.increaseOptionCount.bind(null)}>Add Option</a>
                        <a className={this.createPollEnabled()} type="button" onClick={this.props.makePoll.bind(null)}>Create</a>
                    </div>
                </div>
            </section>
        </form>
    );
  }
}

