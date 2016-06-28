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
        return pieSlice.label
    }

    yValues (pieSlice) {
        return pieSlice.yValue
    }

    colors (pieSlice) {
        return pieSlice.color
    }


    resetChart () {
        $('#chart-container canvas').remove();
        $('#chart-container').append("<canvas id='pie-chart'></canvas>");
    }

    plotLocation () {
        return $('#pie-chart').get(0).context('2d')
    }
    
    data () {
        return {
            labels: this.props.pollData.map(this.labels()),
            datasets: [{
                data: this.props.pollData.map(this.yValues()),
                backgroundColor: this.props.pollData.map(this.colors())
            }]
        }
    }

  render () {
      this.resetChart()
      let pieChart = new Chart(this.plotLocation, {
          type: 'doughnut',
          data: this.data()
      })
    return <div />;
  }
}

