// Class for uploaded FSCV Data.
function HL_FSCV_DATA(data, units, frequency, cycling_frequency, name_of_file, plot_type, color_palette){
// global variable to be accessed in callbacks.
var self = this;
//FSCV data properties.
this.frequency = frequency;
this.cycling_frequency = cycling_frequency;
this.name_of_file = name_of_file;
this.current = new HL_FSCV_ARRAY(data, units, 'Current');
this.cycling_time = new HL_FSCV_TIME(cycling_frequency, data[0].length, 's', 'Time');
this.time = new HL_FSCV_TIME(frequency, data.length, 's', 'Time');

//Plotting properties.
this.plot_type = plot_type;
this.palettes = new HL_FSCV_COLORPALETTE();
if (color_palette == 'Custom'){color_palette = this.palettes.custom};
this.color_palette = color_palette;
this.plot_settings = new HL_PLOT_SETTINGS();


// Methods of the data.
this.graph_color_plot = function(div){
//Function to plot the main color plot.
var graph_data = [{
z:this.current.array,
x:this.cycling_time.array,
y:this.time.array,
type:this.plot_type,
colorscale:this.color_palette,
colorbar: {len:0.5, xpad:30, title:this.current.name+'('+this.current.units+')'}
}];

var layout = this.plot_settings.plot_layout;
layout.title.text = "<b>"+this.name_of_file+"</b>";
if (this.plot_type == 'surface'){
layout.scene = {
xaxis:{
title: this.cycling_time.name+' ('+this.cycling_time.units+')',
gridcolor: 'rgb(255, 255, 255)',
zerolinecolor: 'rgb(255, 255, 255)',
showbackground: true,
showgrid:true,
backgroundcolor:'rgb(230, 230,230)',
},
yaxis: {
title: this.time.name+' ('+this.time.units+')',
gridcolor: 'rgb(255, 255, 255)',
zerolinecolor: 'rgb(255, 255, 255)',
showbackground: true,
showgrid:true,
backgroundcolor: 'rgb(230, 230, 230)',
},
zaxis: {
title: this.current.name+' ('+this.current.units+')',
gridcolor: 'rgb(255, 255, 255)',
zerolinecolor: 'rgb(255, 255, 255)',
showbackground: true,
showgrid:true,
backgroundcolor: 'rgb(230, 230,230)'
},
aspectratio: {x: 1, y: 1, z: 0.7},
aspectmode: 'manual'
};
} else {
layout.xaxis = {
title:this.cycling_time.name+' ('+this.cycling_time.units+')'
};
layout.yaxis = {
title:this.time.name+' ('+this.time.units+')'
};
};

Plotly.newPlot(div, graph_data, layout, this.plot_settings.plot_configuration);
_(div).on('plotly_click', function(data){main_graph_clicked(data)});
};

this.change_color_palette = function(new_color_palette, div){
if (new_color_palette == 'Custom'){this.color_palette = this.palettes.custom}
else {this.color_palette = new_color_palette;}
this.graph_color_plot(div);
};

this.change_type_of_plot = function(new_plot_type, div){
this.plot_type = new_plot_type;
this.graph_color_plot(div);
};

this.invert_current_values = function(div){
this.current.array = this.current.array.map(arr => arr.map(x => -x));
this.graph_color_plot(div);
};

this.initialise_graph = function(div){
Plotly.newPlot(div, [], this.plot_settings.plot_layout, this.plot_settings.plot_configuration);
};
};

// Class for it Transient and iV plots.
function HL_FSCV_1D_DATA(units, frequency, type){
//Data properties.
this.current = new HL_FSCV_ARRAY([], units, 'Current');
this.time = new HL_FSCV_ARRAY([], 's', 'Time');
this.legend_array = [];
this.origin_file_array = [];
this.type = type;
this.counter = 0;
//Plotting properties.
this.plot_settings = new HL_PLOT_SETTINGS();
//Methods.
this.add_trace = function(array, frequency, div, origin_file){
this.current.array.push(array);
this.time.array.push(makeArr(0,(array.length-1)/frequency, array.length-1));
this.legend_array.push("("+String(this.counter+1)+")");
this.origin_file_array.push(origin_file);
this.plot_trace(type, div);
this.counter++;
};
this.remove_trace = function(div){
if (this.counter != 0){
this.current.array.pop();
this.time.array.pop();
this.legend_array.pop();
this.origin_file_array.pop();
this.delete_trace(div);
this.counter--;
};
};

this.plot_trace = function(type, div){
var layout = this.plot_settings.plot_layout;
layout.xaxis.title = this.time.name +" ("+this.time.units+")";
layout.yaxis.title = this.current.name +" ("+this.current.units+")";
layout.title.text = "<b>"+this.type+"</b>";
Plotly.relayout(div, layout);
Plotly.addTraces(div, [{y: this.current.array[this.counter], x:this.time.array[this.counter],
name:"("+String(this.counter+1)+")", text:this.origin_file_array[this.counter]}]);
};

this.delete_trace = function(div){
Plotly.deleteTraces(div, -1);
}

this.initialise_graph = function(div){
Plotly.newPlot(div, [], this.plot_settings.plot_layout, this.plot_settings.plot_configuration);
};
};
// Class for concentration traces.
class HL_FSCV_CONCENTRATION {
constructor(units){
this.plot_settings = new HL_PLOT_SETTINGS();
this.palettes = new HL_FSCV_COLORPALETTE();
this.concentration = new HL_FSCV_ARRAY([], [], 'Concentration');
this.time = new HL_FSCV_ARRAY([], 's', 'Time');
this.absolute_concentration = new HL_FSCV_ARRAY([], [], 'Absolute concentration');
this.max_index = new HL_FSCV_ARRAY([], units, 'Max index values');
this.min_index = new HL_FSCV_ARRAY([], units, 'Min index values');
this.origin_file_array = [];
this.names = [];
this.regression_parameters = new HL_FSCV_ARRAY([], units, 'Regression parameters (a,b,r2,se_regression, se_slope, se_intercept)');
this.regression_line_concentration = new HL_FSCV_ARRAY([], units, 'Concentration');
this.regression_line_time = new HL_FSCV_ARRAY([], 's', 'Time');
this.area_under_curve = new HL_FSCV_ARRAY([], units+'·s', 'Area under the curve');
this.color_array = [];
this.type = 'c-t Curve';
this.counter = 0;
this.graph_index = 0;
}

calibrate_trace(div, index, fscv_transient, frequency, coefficient, units, name){
this.graph_index = this.counter++;
var array = fscv_transient.current.array[index-1];
this.concentration.array.push(scalar_product(array, coefficient));
this.time.array.push(makeArr(0,(array.length-1)/frequency, array.length-1));
this.origin_file_array.push(fscv_transient.origin_file_array[index-1]);
this.names.push(name);
this.color_array.push(this.palettes.plotly_colours[index-1]);
this.concentration.units.push(units);
this.get_max_and_min_values(this.counter-1);
this.get_linearised_exponential_fit(this.counter-1);
this.get_area_under_curve(this.counter-1, frequency);
this.plot_graph(div);
};

plot_graph(div){
var layout = this.plot_settings.plot_layout;
layout.xaxis.title = this.time.name +" ("+this.time.units+")";
layout.yaxis.title = this.concentration.name +" ("+this.concentration.units[this.graph_index]+")";
layout.title.text = "<b>"+this.names[this.graph_index]+' ('+String(this.graph_index+1)+")</b>";
layout.annotations = [{
xref: 'paper',
yref: 'paper',
x: 0.98,
xanchor: 'right',
y: 0.9,
yanchor: 'bottom',
text: '<b>R<sup>2</sup> : '+this.regression_parameters.array[this.graph_index][6].toFixed(2)+
'<br> SEE : '+this.regression_parameters.array[this.graph_index][7].toFixed(2)+' '+this.concentration.units[this.graph_index]+
'<br> t <sub>1/2</sub> : '+ this.regression_parameters.array[this.graph_index][4].toFixed(2)+' '+this.time.units+'</b>',
showarrow: false
}];

var trace = {
y: this.concentration.array[this.graph_index],
x:this.time.array[this.graph_index],
text:this.origin_file_array[this.graph_index],
showlegend: false,
line:{color: this.color_array[this.graph_index]},
};

var max_point = {
y:[this.concentration.array[this.graph_index][this.max_index.array[this.graph_index]]],
x:[this.time.array[this.graph_index][this.max_index.array[this.graph_index]]],
type: 'scatter',
showlegend: false,
mode: 'markers',
marker: {color: 'black'},
text:'Max'
};

var min_point = {
y:[this.concentration.array[this.graph_index][this.min_index.array[this.graph_index]]],
x:[this.time.array[this.graph_index][this.min_index.array[this.graph_index]]],
type: 'scatter',
showlegend: false,
mode: 'markers',
marker: {color: 'black'},
text:'Min'
};

var exp_decay = {
y:this.regression_line_concentration.array[this.graph_index],
x: this.regression_line_time.array[this.graph_index],
showlegend: false,
line: {color: 'black', width:0.5, dash: 'dot'},
text:'Fit'
}

Plotly.newPlot(div, [trace], layout);
Plotly.addTraces(div, [max_point, min_point, exp_decay]);
_(div).on('plotly_click', function(data){concentration_graph_clicked(data)});
};

remove_trace(div){
if (this.counter != 0){
this.switch_plot(div);
this.concentration.array.pop();
this.time.array.pop();
this.absolute_concentration.array.pop();
this.max_index.array.pop();
this.min_index.array.pop();
this.regression_parameters.array.pop();
this.regression_line_concentration.array.pop();
this.regression_line_time.array.pop();
this.area_under_curve.array.pop();
this.origin_file_array.pop();
this.names.pop();
this.color_array.pop();
--this.counter;
}
};

switch_plot(div){
if (this.graph_index == this.counter-1){
if (this.graph_index == 0){this.initialise_graph(div)}
else {--this.graph_index; this.plot_graph(div)}};
};
initialise_graph(div){
Plotly.newPlot(div, [], this.plot_settings.plot_layout, this.plot_settings.plot_configuration);
};


get_max_and_min_values(index){
var abs_array = absolute_array(this.concentration.array[index]);
var max = index_of_max(abs_array);
var min = index_of_min(abs_array.slice(max[1], abs_array.length-1));
this.absolute_concentration.array.push(abs_array);
this.max_index.array.push(max[1]);
this.min_index.array.push(max[1] + min[1]);
};

change_max_and_min_values(div, pindex, type, frequency){
if (type == 'max'){this.max_index.array[this.graph_index] = pindex}
else{this.min_index.array[this.graph_index] = pindex};
this.get_linearised_exponential_fit(this.graph_index);
this.get_area_under_curve(this.graph_index, frequency);
this.plot_graph(div);
};


get_linearised_exponential_fit(index){
var y_exp = this.absolute_concentration.array[index].slice(this.max_index.array[index], this.min_index.array[index]);
//Notice errors are respect to the linear parameters, and not exponential.
var y_linear = log_of_array(y_exp);
var x = this.time.array[0].slice(this.max_index.array[index], this.min_index.array[index]);
var linear_reg = linear_fit(x,y_linear), y_predicted_linear = x.map(t => linear_reg[0] + linear_reg[1]*t);
var linear_errors = linear_estimation_errors(y_predicted_linear, y_linear, x);
var t_half = Math.log(2)/Math.abs(linear_reg[1]);
//Propagation of error of t1/2 = ln(2)/K.
var se_t_half = Math.sqrt(Math.pow(Math.log(2)/Math.pow(linear_reg[1], 2), 2)*Math.pow(linear_errors[1], 2));
this.regression_line_time.array[index] = x;
// Store the exponential trace.
this.regression_line_concentration.array[index] = exp_of_array(y_predicted_linear);
var exp_errors = estimation_errors(this.regression_line_concentration.array[index], y_exp);
// Store exponential parameters and exponential errors (propagation of uncertainty and recalculation):
//K, se(K), C0, se(C0), t 1/2, se (t 1/2), r^2 and SEE.
this.regression_parameters.array[index] = [linear_reg[1], linear_errors[1], Math.exp(linear_reg[0]),
Math.exp(linear_reg[0])*linear_errors[2], t_half, se_t_half, exp_errors[1], exp_errors[0]];
// Invert sign of trace if the signal is an inhibition for plotting purposes.
if(this.concentration.array[index][this.max_index.array[index]] < 0){
this.regression_line_concentration.array[index] = scalar_product(this.regression_line_concentration.array[index], -1);
};
};

get_nonlinear_exponential_fit(){
// PROVISIONAL
var y_array = this.absolute_concentration.array[this.graph_index].slice(this.max_index.array[this.graph_index], this.min_index.array[this.graph_index]);
var x_array = this.time.array[0].slice(this.max_index.array[this.graph_index], this.min_index.array[this.graph_index]);
var x = tf.tensor1d(x_array);
var y = tf.tensor1d(y_array);
var c0_val =this.regression_parameters.array[this.graph_index][2];
var k_val =this.regression_parameters.array[this.graph_index][0]
const c0 = tf.scalar(c0_val).variable();
const k = tf.scalar(k_val).variable();
// y = c0*e^(k*x)
const fun = (x) => x.mul(k).exp().mul(c0);
const cost = (pred, label) => pred.sub(label).square().mean();
const learning_rate = 0.1;
const optimizer = tf.train.adagrad(learning_rate);
// Train the model.
for (let i = 0; i < 500; i++) {
optimizer.minimize(() => cost(fun(x), y));
}
// Change regression parameters. PROVISIONAL.
k_val = k.dataSync(), c0_val = c0.dataSync();
console.log(k_val);
var y_pred = x_array.map(x => c0_val*Math.exp(k_val*x));
var exp_errors = estimation_errors(y_pred, y_array);
var t_half = Math.log(2)/Math.abs(k_val);
//Propagation of error of t1/2 = ln(2)/K.
this.regression_parameters.array[this.graph_index][0] = k_val;
this.regression_parameters.array[this.graph_index][2] = c0_val;
this.regression_parameters.array[this.graph_index][6] = exp_errors[1];
this.regression_parameters.array[this.graph_index][7] = exp_errors[0];
this.regression_parameters.array[this.graph_index][4] = t_half;
k.dispose(), c0.dispose(), x.dispose(), y.dispose();
};

get_area_under_curve(index, frequency){
// AUC calculated from t=0s to minimum.
this.area_under_curve.array[index] = simpson_auc(this.concentration.array[index].slice(0, this.min_index.array[index]), frequency);
};

export_calibration(){
// Export of concentration traces.
var ws_name = "Concentration - Time";
var aoa =  transpose(zip(this.time.array, this.concentration.array));
var file_names = zip(uniform_array(this.origin_file_array.length, ''),this.origin_file_array);
var names = zip(uniform_array(this.names.length, 'Time ('+this.time.units+')'), this.names.map((x,i)=>x+' ('+this.concentration.units[i]+')'));
aoa.unshift(names);
aoa.unshift(file_names);
var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(aoa);
XLSX.utils.book_append_sheet(wb, ws, ws_name);
// Export of parameters.
ws_name = "Parametric Analysis";
var head = ['Name', 'File', 'Max Concentration', 'Max Time', 'Min Concentration', 'Min Time', 'AUC (start to Min)', 'K', 'SE(K)', 'C0', 'SE(C0)', 't 1/2', 'SE (t 1/2)', 'r^2', 'SEE'];
var max_concentration = this.max_index.array.map((x,i) => this.concentration.array[i][x]);
var max_time = this.max_index.array.map((x,i) => this.time.array[i][x]);
var min_concentration = this.min_index.array.map((x,i) => this.concentration.array[i][x]);
var min_time = this.min_index.array.map((x,i) => this.time.array[i][x]);
var reg_params = transpose(this.regression_parameters.array);
var tmp = []; tmp.push(this.names); tmp.push(this.origin_file_array); tmp.push(max_concentration); tmp.push(max_time); tmp.push(min_concentration); tmp.push(min_time);
tmp.push(this.area_under_curve.array); tmp.push(...reg_params);
aoa=transpose(tmp); aoa.unshift(head);
ws = XLSX.utils.aoa_to_sheet(aoa); XLSX.utils.book_append_sheet(wb, ws, ws_name);
var filename = "Calibration_hashemilab.xlsx";
XLSX.writeFile(wb, filename);
};
}





function HL_FSCV_ARRAY(data, units, name){
this.units = units;
this.name = name;
this.array = data;
};

function HL_FSCV_TIME(frequency, length, units, name){
this.units = units;
this.name = name;
this.array = makeArr(0,(length-1)/frequency, length-1);
};

function HL_FSCV_COLORPALETTE(){
this.custom =  [[0.0, 'rgb(0, 0, 240)'],[0.2478, 'rgb(0, 2, 39)'], [0.3805, 'rgb(245, 213, 1)'],[0.65555, 'rgb(168, 98, 0)'],
[0.701, 'rgb(76, 2, 69)'],[0.7603, 'rgb(0, 182, 136)'],[0.7779, 'rgb(0, 138, 30)'], [1.0, 'rgb(1, 248, 1)']];
this.plotly_colours = ['#1f77b4','#ff7f0e', '#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf'];
};
// Class that integrates plot settings used accross the plots.
function HL_PLOT_SETTINGS(){

this.plot_configuration = {
showEditInChartStudio: true,
plotlyServerURL: "https://chart-studio.plotly.com",
displayModeBar: true,
displaylogo: false,
responsive: true,
toImageButtonOptions: {
format: 'svg',
filename: 'plot',
height: 600,
width: 800,
scale: 1
}};

this.plot_layout = {
autosize: true,
title: {
text: '<b> Blank </b>',
font: {
size: 20,
family:'Arial'
},
x: 0.05,
y: 1.2,
xanchor: 'left',
yanchor: 'bottom',
},
};
};