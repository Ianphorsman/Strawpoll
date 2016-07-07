class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userParticipated: this.props.userParticipated,
            pollContext: this.props.pollContext,
            pollId: this.props.pollId,
            pollData: {pollId: 0},
            options: { 0: '', 1: '', 2: '', 3: ''},
            userPolls: this.props.userPolls,
            popularPolls: this.props.popularPolls,
            latestPollId: this.props.latestPollId

        }
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
        }
        return {
            "utf8" : "checked",
            "question" : $("[name='question']").val(),
            "poll_expires_in": expireAmount(),
            "poll_expiry_unit": $("[name='poll-expiry-unit']").val(),
            "votes_per_person": numVotes(),
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

    makePoll () {
        let successHandler = (data) => {
            this.setState({ pollId: data.pollData.pollId, pollData: data.pollData, userPolls: data.userPolls, popularPolls: data.popularPolls }, function() {
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
            console.log(data.pollData.pollId);
            this.setState({ pollId: data.pollData.pollId, pollData: data.pollData }, function() {
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
        let nextPair = { [this.state.options.length+1] : '' }
        let copy = Object.assign({}, this.state.options)
        copy[this.state.options.length+1] = ''
        this.setState({
            options: copy,
        })
    }

    vote (pollSelectionId, pollId) {
        let successHandler = (data) => {
            if (data.head !== "Already voted") {
                let copy = Object.assign({}, this.state.pollData)
                copy.options.map((selection) => {
                    if (selection.id == pollSelectionId) {
                        return Object.assign(selection, {yValue: selection.yValue})
                    } else {
                        return selection
                    }
                })
                copy.voteCount = data.voteCount
                this.setState({pollData: copy, userParticipated: true})
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
        console.log(pollSelectionId)
    }

    /* Poll Contexts */

    newPoll () {
        return (
            <NewPoll
                makePoll={this.makePoll.bind(this)}
                options={this.state.options}
                values={this.state.values}
                updateOptionValue={this.updateOptionValue.bind(this)}
                increaseOptionCount={this.increaseOptionCount.bind(this)}
            />
        )
    }

    showPoll () {
        return <Poll pollData={this.state.pollData} vote={this.vote.bind(this)} userParticipated={this.state.userParticipated}></Poll>
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
                    { pollData: this.pollData, pollId: this.pollId }), 1000
                );
            },

            disconnected: function() {
                this.perform('unfollow')
            },
            received: function(data) {
                if (that.state.pollId == data.pollId) {
                    that.updatePollData(data.pollData);
                }
            },
            updateStream: function(that) {
                //this.perform('unfollow');
                setTimeout(() => this.perform('follow', {
                    pollData: that.state.pollData,
                    pollId: that.state.pollData.pollId
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
