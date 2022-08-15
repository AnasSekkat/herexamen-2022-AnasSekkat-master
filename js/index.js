"use strict";

const app = {
  measurements: [],
  filtered: [],
  selectedMeasurement: "all",
  init() {
    document.getElementById("typeFilter").addEventListener("change", (e) => {
      e.preventDefault();
      this.filter();
    })
    this.fetchData();
  },
  fetchData() {
    fetch("https://thecrew.cc/herexamen/measurements.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        app.measurements = data.measurements.map(item => {
            return {
                value: item.value,
                unit: item.type,
                timestamp: item.timestamp,
            };
          });
        app.render();
    })
  },
  filter() {
    var dropdown = document.getElementById("typeFilter");
    this.selectedMeasurement = dropdown.value;
    var table, tr, td, i, txtValue;
    table = document.getElementById("measurements");
    tr = table.getElementsByTagName("tr");
    this.filtered = [];
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(dropdown.value) > -1 || dropdown.value == "all") {
            tr[i].style.display = "";
            var filteredData = [
              {
                "unit": tr[i].getElementsByTagName("td")[0].innerText, 
                "value": tr[i].getElementsByTagName("td")[1].innerText, 
                "timestamp": tr[i].getElementsByTagName("td")[2].innerText
              }
            ]
            this.filtered.push(filteredData);
          } else {
            tr[i].style.display = "none";
          }
        }
      }
      this.renderChart()
  },
  renderChart() { 
    const chartData = Chart.getChart("chart");
    if (chartData != null) chartData.destroy();
    
    var values = (this.selectedMeasurement == "all")? app.measurements: this.filtered;
    var co2 = [];
    var voc = [];
    var pm25 = [];
    var pm10 = [];
    var dates = [];
    values.forEach((item, index) => {
      if (this.selectedMeasurement == "all") {
        if(item.unit.includes("CO2")) co2.push(item.value);
        else co2.push(NaN);
        if(item.unit.includes("VOC")) voc.push(item.value);
        else voc.push(NaN);
        if(item.unit.includes("PM25")) pm25.push(item.value);
        else pm25.push(NaN);
        if(item.unit.includes("PM10")) pm10.push(item.value);
        else pm10.push(NaN);
        dates.push(this.getTime(index));
      } else {
          if(item[0].unit.includes("CO2")){
            co2.push(item[0].value);
          } 
          if(item[0].unit.includes("VOC")){
            voc.push(item[0].value);
          } 
          if(item[0].unit.includes("PM25")){
            pm25.push(item[0].value);
          } 
          if(item[0].unit.includes("PM10")){
            pm10.push(item[0].value);
          } 
        dates.push(item[0].timestamp.replace(/(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}/g, ''));
      }
    })
    let uniqueDates = dates.filter((e, i) => {
      return dates.indexOf(e) === i;
    });
    new Chart("chart", {
      type: "line",
      data: {
        labels: uniqueDates,
        datasets: [{
          label: "CO2",
          lineTension: 0,
          data: co2, //CO2
          borderColor: "red",
          fill: false
        },{
          label: "VOC",
          lineTension: 0,
          data: voc, //VOC
          borderColor: "green",
          fill: false
        },{
          label: "PM25",
          lineTension: 0,
          data: pm25, //PM25
          borderColor: "blue",
          fill: false
        },{
          label: "PM10",
          lineTension: 0,
          data: pm10, //PM10
          borderColor: "yellow",
          fill: false
        }]
      },
      options: {
        responsive: true,
        legend: {display: false},
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            },
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            },
            min: 0,
            max: 10,
          }
        }
      }
    });
  },
  render() {
    var tbody = document.getElementById("measurements");
    var data = app.measurements;
    data.map((data, index)=>{
        let row = tbody.insertRow();
        let unit = row.insertCell(0);
        unit.innerHTML = this.getUnit(index);
        let value = row.insertCell(1);
        value.innerHTML = this.getValue(index)
        let timestamp = row.insertCell(2);
        timestamp.innerHTML = this.getTime(index) + " " + this.getDate(index);
     }); 
    this.renderChart()
  },
  getUnit(i) {
    return app.measurements[i].unit;
  },
  getValue(i) {
    return app.measurements[i].value;
  },
  getTime(i) {
    return new Date(app.measurements[i].timestamp).toLocaleTimeString("nl-BE");
  },
  getDate(i) {
    return new Date(app.measurements[i].timestamp).toLocaleDateString("nl-BE");
  },
}

app.init();