class App extends React.Component {

    getInitialState () {
        return {
            userParticipated: this.props.userParticipated,
            pollContext: 'newPoll',
            pollId: this.props.pollId,
            pollData: {}
        }
    }

    gatherNewPollParams () {

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

    /* Poll Contexts */

    newPoll () {
        return <NewPoll></NewPoll>
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
            {this[this.pollContext]()}
        </section>
    );
  }
}

