class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userParticipated: this.props.userParticipated,
            userHasVoted: this.props.userHasVoted,
            userId: this.props.userId,
            fullAccessToStream: false,
            pollContext: this.props.pollContext,
            pollId: this.props.pollId,
            pollData: {pollId: 0},
            options: { 0: '', 1: '', 2: '', 3: ''},
            question: "",
            pollExpiresIn: "",
            pollExpiryUnit: "",
            numVotes: "",
            votesRequired: "",
            duplicateVotesAllowed: false,
            totalVotes: "",
            userVotes: this.props.userVotes,
            userPollVotes: {},
            voteCount: 0,
            userPolls: this.props.userPolls,
            popularPolls: this.props.popularPolls,
            latestPollId: this.props.latestPollId

        }
    }

    updatePollExpiresIn(event) {
        this.setState({ pollExpiresIn: event.target.value })
    }

    updatePollExpiryUnit(event) {
        this.setState({ pollExpiryUnit: event.target.value })
    }

    updateNumVotes(event) {
        this.setState({ numVotes: event.target.value })
    }

    updateVotesRequired(event) {
        this.setState({ votesRequired: event.target.value })
    }

    updateDuplicateVotesAllowed(event) {
        this.setState({ duplicateVotesAllowed: event.target.checked })
    }

    updateTotalVotes(event) {
        this.setState({ totalVotes: event.target.value })
    }

    changePollContext (newContext) {
        this.setState({ pollContext: newContext })
    }

    gatherNewPollParams () {
        let expireAmount = () => {
            if ($("[name='poll-expires-in']").val() == 0) {
                return $("[name='poll-expires-in']").attr('placeholder');
            } else {
                return $("[name='poll-expires-in']").val();
            }
        };
        let numVotes = () => {
            if ($("[name='num-votes']").val() == 0) {
                return 1;

            } else {
                return $("[name='num-votes']").val();
            }
        };
        let totalVotes = () => {
            if ($("[name='total-votes']").val() == 0) {
                return 1000;
            } else {
                return $("[name='total-votes']").val();
            }
        };
        let votesRequired = () => {
            if ($("[name='votes-required']").val() == 0) {
                return 1;
            } else {
                return $("[name='votes-required']").val();
            }
        };
        let duplicateVotesAllowed = () => {
            return this.state.duplicateVotesAllowed;
        };
        return {
            "utf8" : "checked",
            "question" : $("[name='question']").val(),
            "poll_expires_in": expireAmount(),
            "poll_expiry_unit": $("[name='poll-expiry-unit']").val(),
            "votes_per_person": numVotes(),
            "votes_required_per_person": votesRequired(),
            "duplicate_votes_allowed": duplicateVotesAllowed(),
            "total_votes": totalVotes(),
            "options" : Object.keys(this.state.options).map((k) => { return this.state.options[k] })
        }
    }

    updateOptionValue(option, event) {
        const options = {
            ...this.state.options,
            [option]: event.target.value
        }
        this.setState({ options })
    }

    updateQuestion(event) {
        this.setState({ question: event.target.value })
    }

    makePoll () {
        let successHandler = (data) => {
            this.setState({ pollId: data.pollData.pollId, pollData: data.pollData, userPolls: data.userPolls, userPollVotes: data.userPollVotes, popularPolls: data.popularPolls, userParticipated: data.userParticipated }, function() {
                this.setState({ pollContext: 'showPoll'});
                this.updateSubscription();
            });
            this.resetOptionCount();
        };
        let errorHandler = (data) => {
            this.setState({ pollContext: 'edit' })
        };
        let params = this.gatherNewPollParams()

        $.ajax({
            method: 'POST',
            dataType: 'json',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json',
            accepts: 'application/json',
            url: '/poll/create',
            data: JSON.stringify(params),
            success: successHandler.bind(this),
            error: errorHandler.bind(this)
        })
    }

    getPoll (path) {
        let successHandler = (data) => {
            this.setState({
                pollId: data.pollData.pollId,
                pollData: data.pollData,
                voteCount: data.voteCount,
                userPollVotes: data.userPollVotes,
                userHasVoted: data.userHasVoted,
                userParticipated: data.userParticipated
            }, function() {
                this.setState({ pollContext: 'showPoll'});
                this.updateSubscription();
            });
            this.resetOptionCount();
        };
        let errorHandler = (data) => {
            this.setState({ pollContext: 'notFound' })
        };
        $.ajax({
            method: 'GET',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            contentType: 'application/json',
            accepts: 'application/json',
            url: '/poll/' + path,
            success: successHandler.bind(this),
            error: errorHandler.bind(this)

        })
    }

    resetOptionCount () {
        this.setState({ options: {0: '', 1: '', 2: '', 3: ''} })
    }

    increaseOptionCount () {
        let nextPair = { [Object.keys(this.state.options).length] : '' }
        let copy = Object.assign({}, this.state.options)
        copy[Object.keys(this.state.options).length] = ''
        this.setState({
            options: copy,
        })
    }

    vote (pollSelectionId, pollId) {
        let successHandler = (data) => {
            if (data.head !== "Already voted") {
                this.setState({
                    userParticipated: data.userParticipated,
                    userHasVoted: data.userHasVoted,
                    userPollVotes: data.userPollVotes,
                    userVotes: Object.assign(this.state.userVotes, data.vote)
                })
            }
        }
        $.ajax({
            method: 'POST',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            contentType: 'application/json',
            accepts: 'application/json',
            url: '/poll/' + pollId + '/vote/' + pollSelectionId,
            success: successHandler.bind(this)
        })
    }

    /* Poll Contexts */

    newPoll () {
        return (
            <NewPoll
                makePoll={this.makePoll.bind(this)}
                options={this.state.options}
                question={this.state.question}
                pollExpiresIn={this.state.pollExpiresIn}
                pollExpiryUnit={this.state.pollExpiryUnit}
                numVotes={this.state.numVotes}
                totalVotes={this.state.totalVotes}
                votesRequired={this.state.votesRequired}
                updateOptionValue={this.updateOptionValue.bind(this)}
                updateQuestion={this.updateQuestion.bind(this)}
                updatePollExpiresIn={this.updatePollExpiresIn.bind(this)}
                updatePollExpiryUnit={this.updatePollExpiryUnit.bind(this)}
                updateNumVotes={this.updateNumVotes.bind(this)}
                updateVotesRequired={this.updateVotesRequired.bind(this)}
                updateDuplicateVotesAllowed={this.updateDuplicateVotesAllowed.bind(this)}
                updateTotalVotes={this.updateTotalVotes.bind(this)}
                increaseOptionCount={this.increaseOptionCount.bind(this)}
            />
        )
    }

    showPoll () {
        return(
            <Poll
                pollData={this.state.pollData}
                userPollVotes={this.state.userPollVotes}
                voteCount={this.state.voteCount}
                vote={this.vote.bind(this)}
                userHasVoted={this.state.userHasVoted}
                duplicateVotesAllowed={this.state.pollData.duplicateVotesAllowed}
                userParticipated={this.state.userParticipated}>

            </Poll>
        )
    }

    notFound () {
        return <p>Could not direct you to the requested poll.</p>
    }

    componentDidMount() {
        this.pollSubscription(this);
    }

    updatePollData(data) {
        let copy = Object.assign({}, this.state.pollData);
        copy = data;
        this.setState({ pollData : copy })

    }
    
    pollSubscription(that) {
        this.pollStream = App.cable.subscriptions.create("PollsChannel", {
            pollData: that.state.pollData,
            pollId: that.state.pollData.pollId,
            connected: function() {
                setTimeout(() => this.perform('follow',
                    { pollData: this.pollData, pollId: this.pollId, userId: that.state.userId, getLatest: false }), 1000
                );
            },

            disconnected: function() {
                this.perform('unfollow')
            },
            received: function(data) {
                if (that.state.pollId == data.pollId && !('enableAccess' in data)) {
                    that.updatePollData(data.pollData);
                    that.setState({voteCount: data.voteCount});
                } else if (data.enableAccess && !(that.fullAccessToStream)) {
                    console.log("Enabling Access");
                    that.setState({ fullAccessToStream: true });
                    this.updateStream(that);
                } else {
                    console.log("Access to full poll data denied.");
                    that.updatePollData(data.pollData);
                    that.setState({ voteCount: data.voteCount });
                }
            },
            updateStream: function(that) {
                //this.perform('unfollow');
                setTimeout(() => this.perform('follow', {
                    pollData: that.state.pollData,
                    pollId: that.state.pollData.pollId,
                    userId: that.state.userId,
                    getLatest: true
                }), 1000);
            },
        })
    }

    updateSubscription() {
        this.pollStream.updateStream(this);
    }
    
    

  render () {
    return(
        <div>
            <header>
                <MainMenu
                    getPoll={this.getPoll.bind(this)}
                    latestPoll={this.state.latestPollId}
                    userPolls={this.state.userPolls}
                    changePollContext={this.changePollContext.bind(this)}
                    popularPolls={this.state.popularPolls}>

                </MainMenu>
            </header>
            <main>
                <section id="poll-container" className="col-xs-6">
                    {this[this.state.pollContext].call(this)}
                </section>
                <div className="col-xs-6" id="chart-container">
                    <canvas id="pie-chart"></canvas>
                </div>
            </main>
        </div>
    );
  }
}
