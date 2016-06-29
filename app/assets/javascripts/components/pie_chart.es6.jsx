class PieChart extends React.Component {

    lightenDarkenColor (col, amt) {
        let usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        let num = parseInt(col, 16);

        let r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    labels (pieSlice) {
        return this.props.pollData.options[pieSlice].label
    }

    yValues (pieSlice) {
        return this.props.pollData.options[pieSlice].yValue
    }

    colors (pieSlice) {
        return this.props.pollData.options[pieSlice].color
    }


    resetChart () {
        $('#chart-container canvas').remove();
        $('#chart-container').append("<canvas id='pie-chart'></canvas>");
    }

    plotLocation () {
        return $('#pie-chart').get(0).getContext('2d');
    }
    
    data () {
        return {
            labels: Object.keys(this.props.pollData.options).map(this.labels.bind(this)),
            datasets: [{
                data: Object.keys(this.props.pollData.options).map(this.yValues.bind(this)),
                backgroundColor: Object.keys(this.props.pollData.options).map(this.colors.bind(this))
            }]
        }
    }

  render () {
      this.resetChart()
      let pieChart = new Chart(this.plotLocation(), {
          type: 'doughnut',
          data: this.data(),
          options: { animation: false}
      })
    return <div />;
  }
}

