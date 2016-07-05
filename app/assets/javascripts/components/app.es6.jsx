class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userParticipated: this.props.userParticipated,
            pollContext: this.props.pollContext,
            pollId: this.props.pollId,
            pollData: {},
            options: { 0: '', 1: '', 2: '', 3: ''},
            latestPollId: this.props.latestPollId

        }
    }

    gatherNewPollParams () {
        return {
            "utf8" : "checked",
            "question" : $("[name='question']").val(),
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
            this.setState({ pollId: data.pollId, pollData: data.pollData }, function() {
                this.setState({pollContext: 'showPoll'});
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
        this.pollSubscription();
    }

    updatePollData(data) {
        let copy = Object.assign({}, this.state.pollData);
        copy = data;
        console.log('pre set state', data);
        this.setState({ pollData : copy }, function() {
            console.log('setState cb', this.state.pollData);
        })

    }
    
    pollSubscription() {
        let that = this;
        App.cable.subscriptions.create("PollsChannel", {
            pollData: this.state.pollData,
            pollId: this.state.pollId,
            connected: function() {
                setTimeout(() => this.perform('follow',
                    { pollData: this.pollData, pollId: this.pollId }), 1000
                );
            },
            received: function(data) {
                console.log(that);
                console.log(that.state, data.pollId);
                if (that.state.pollId == data.pollId) {
                    that.updatePollData(data.pollData);
                }
            }
        })
    }

    unsubscribeFromPoll() {
    }
    
    

  render () {
    return(
        <div>
            <header>
                <MainMenu getPoll={this.getPoll.bind(this)} latestPoll={this.state.latestPollId}></MainMenu>
            </header>
            <main>
                <section id="poll-container" className="col-xs-6">
                    {this[this.state.pollContext].call(this)}
                </section>
            </main>
        </div>
    );
  }
}
