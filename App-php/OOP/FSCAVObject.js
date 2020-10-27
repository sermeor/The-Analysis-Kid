// Class for uploaded FSCAV data.
function FSCAV_DATA(data, neurotransmitter, v_units, c_units, frequency) {
this.frequency = frequency;
this.rawdata = data;
this.neurotransmitter = neurotransmitter;
this.number_of_signals = data[0].length-1;
this.number_of_points = data.length-1;
// Create voltage features.
this.voltage = new FSCAV_VOLTAGE(data, v_units);
// Create current features.
this.current = new FSCAV_CURRENT(data, c_units, this.number_of_signals);
//Create time features.
this.time = new FSCAV_TIME(data, frequency);
this.plot_current_time = function(div, index){
// Define plotly objects for line and scatter points.
let graph_data = [{
y: this.current.array[index],
x: this.time.array,
line: {
shape: 'spline',
color: 'blue'
},
showlegend: false,
name: this.current.name
}];

let scatter_data_max = {
y:[this.current.array[index][this.current.max_index[index]]],
x:[this.time.array[this.current.max_index[index]]],
name: 'Points',
type: 'scatter',
showlegend: false,
mode: 'markers',
marker: {color: 'black'},
text:'Points'
};

let scatter_data_min = {
y:[this.current.array[index][this.current.min_index[index][0]],
this.current.array[index][this.current.min_index[index][1]]],
x:[this.time.array[this.current.min_index[index][0]],
this.time.array[this.current.min_index[index][1]]],
name: 'Points',
type: 'scatter',
showlegend: false,
mode: 'markers+lines',
line: {color: 'black', width:0.5, dash: 'dot'},
marker: {color: 'black'},
text:'Points'
};

let layout = {
autosize: true,
legend: {"orientation": "h"},
xaxis:{
title: this.time.name+' ('+this.time.units+')'
},
yaxis:{
title: this.current.name+' ('+this.current.units+')'
}
};

layout.title = {
text: 'Cyclic Voltammogram of '+this.current.tags[index],
font: {
size: 20,
family:'Arial'
},
x: 0.5,
y: 1.2,
xanchor: 'center',
yanchor: 'top',
};

let config = {
showEditInChartStudio: true,
responsive: true,
plotlyServerURL: "https://chart-studio.plotly.com",
displayModeBar: true,
displaylogo: false,
dragmode:'select',
modeBarButtonsToRemove: ['hoverCompareCartesian'],
toImageButtonOptions: {
format: 'svg',
filename: 'plot',
height: 600,
width: 750,
scale: 1
}};
// Plot FSCAV data.
Plotly.newPlot(div, graph_data, layout, config);
Plotly.addTraces(div, scatter_data_max);
Plotly.addTraces(div, scatter_data_min);
};
};

// Class for Voltage data within FSCAV.
function FSCAV_VOLTAGE(data, v_units) {
this.units =  v_units;
this.name = data[0][0];
this.array = arrayColumn(data, 0).slice(1);
}
// Class for Current data within FSCAV.
function FSCAV_CURRENT(data, c_units, number_of_signals) {
this.units =  c_units;
this.name = 'Current';
this.tags = data[0].slice(1);
this.array = transpose(data.slice(1).map(x => x.slice(1)));
// Shoulder extremes and max point: first local maximum and first and second local minimums.
this.max_index = [];
this.min_index = [];
for (i = 0; i < number_of_signals ; ++i){
try {
this.max_index.push(localmaxima(this.array[i])[0][0]);
this.min_index.push(localminima(this.array[i])[0].slice(0,2));
}
catch (e) {
this.max_index.push(0);
this.min_index.push([0,0]);
};
};
};
// Class for time data within FSCAV.
function FSCAV_TIME(data, frequency) {
this.units = 's';
this.name = 'Time';
this.array = makeArr(0,(data.length-1)/frequency, data.length-1);
}
