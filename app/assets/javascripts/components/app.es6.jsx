class App extends React.Component {

    getInitialState () {
        return {
            userParticipated: this.props.userParticipated,
            pollContext: this.props.pollContext,
            pollId: this.props.pollId,
            pollData: {},
            options: ['option_1', 'option_2', 'option_3', 'option_4']

        }
    }

    gatherNewPollParams () {
        return {
            "utf8" : "checked",
            "question" : $("[name='question']").val(),
            "options" : $('.poll-option').map((option) => { return option.val() })
        }
    }

    makePoll () {
        let successHandler = (data) => {
            this.setState({ pollId: data.pollId, pollContext: 'showPoll', pollData: data.pollData })
        }
        let errorHandler = (data) => {
            this.setState({ pollContext: 'edit' })
        }
        let params = this.gatherNewPollParams()

        $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            accepts: 'application/json',
            url: path,
            data: JSON.stringify(params),
            success: successHandler.bind(this),
            error: errorHandler.bind(this)
        })
    }

    getPoll (path) {
        let successHandler = (data) => {
            this.setState({ pollId: data.pollId, pollContext: 'showPoll', pollData: data.pollData })
        }
        let errorHandler = (data) => {
            this.setState({ pollContext: 'notFound' })
        }
        $.ajax({
            method: 'GET',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            contentType: 'application/json',
            accepts: 'application/json',
            url: path(),
            success: successHandler.bind(this),
            error: errorHandler.bind(this)

        })
    }

    resetOptionCount () {
        this.setState({ options: ['option_1', 'option_2', 'option_3', 'option_4'] })
    }

    increaseOptionCount () {
        let copy = this.state.options
        copy.push('option_' + copy.length+1)
        this.setState({ options: copy })
    }

    /* Poll Contexts */

    newPoll () {
        return <NewPoll makePoll={this.makePoll} options={this.state.options} increaseOptionCount={this.increaseOptionCount}></NewPoll>
    }

    showPoll () {
        return <Poll plotData={this.state.plotData}></Poll>
    }

    notFound () {
        return <div />
    }
    
    

  render () {
    return(
        <section>
            {this[this.state.pollContext]()}
        </section>
    );
  }
}

