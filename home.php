<!DOCTYPE html>
<html lang="en">
<title>Analysis Kid</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="Styling/w3.css">
<script src="JavaScriptPackages/fontawesome-828d573e3a.js"></script>
<script type="text/javascript" src="JavaScriptPackages/shim.min.js"></script>
<script src="JavaScriptPackages/jquery-3.5.1.min.js"></script>

<style>
body,h1,h2,h3,h4,h5 {font-family: "Poppins", sans-serif}
body {font-size:16px;}
.w3-half img{margin-bottom:-6px;margin-top:16px;opacity:0.8;cursor:pointer}
.w3-half img:hover{opacity:1}
input[type=number] {
border: 0px solid black;
border-radius: 6px;
background-color: #F0F0F0;
}
input[type=text] {
border: 0px solid black;
border-radius: 6px;
background-color: #F0F0F0;
}
.se-pre-con {
position: fixed;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
z-index: 9999;
background: url("Images/loading.gif") center no-repeat #eff4f7;
}
.br2 {
height:1px;
}
</style>

<script>
$(window).on('load', function () {
$(".se-pre-con").fadeOut("slow");
});
</script>

<head>
<link rel="shortcut icon" href="Images/cv.png"/>
</head>

<body>
<div id="loading" class="se-pre-con"></div>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-indigo w3-collapse w3-top w3-large w3-padding" style="z-index:3;width:300px;font-weight:bold;" id="mySidebar"><br>
<a href="javascript:void(0)" onclick="w3_close()" class="w3-button w3-hide-large w3-display-topleft" style="width:100%;font-size:22px">Close Menu</a>
<div class="w3-container">
<h3 class="w3-padding-64"><b>Analysis<br>Kid</b></h3>
</div>
<div class="w3-bar-block">
<a href="#top" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><i class="fa fa-home w3-large"></i> Home</a>
<a href="#about" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><i class="fa fa-list" aria-hidden="true"></i> About</a>
<a href="#dashboards" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><i class="fas fa-chart-line w3-large"></i> Dashboards</a>
<a href="Documentation.php" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><i class="fa fa-file-text-o" aria-hidden="true"></i> Documentation</a>
<a href="#references" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><i class="fa fa-book" aria-hidden="true"></i> References</a>
<a href="#acknowledgments" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><i class="fa fa-users" aria-hidden="true"></i> Acknowledgments</a>
</div>
<br>
<br>
&emsp;&emsp; &thinsp;&thinsp;&thinsp; <a href="#contact" onclick="ContactWindow()" class="w3-bar-item w3-center w3-button w3-hover-white">Contact Us <i class="fas fa-paper-plane w3-large"></i></a>

</nav>

<!-- Top menu on small screens -->
<header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
<a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
<span>Analysis Kid</span>
</header>

<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:340px;margin-right:40px">

<!-- Header -->
<div class="w3-container" style="margin-top:80px" id="about">
<h1 href="#top" class="w3-jumbo"><b>Analysis Kid</b> <img style ="float:right" src="/Images/HL_Icon.png" alt="Hashemi Lab Icon" width="375" height="125"></h1>

<h1 class="w3-xxxlarge w3-text-indigo"><b>About.</b></h1>
<hr style="width:800px;border:3px solid #3f51b5" class="w3-round">
<p  align=”justify”> Analysis Kid is a web application that offers a data analysis tool for Fast Scan Cyclic Voltammetry (FSCV) signals of real-time measurement of neurotransmitter dynamics in
vitro and in vivo. This is achieved by providing a series of open-source and user-friendly dashboards with automatic algorithms that analise FSCV neurochemical data both qualitatively and quantitatively.
The general description of the implemented dashboards at the time of writing can be found below. Extensive information of the algorithms and technical requirements for each of the dashboards can be found in the documentation <a href ="Documentation.php" target="_blank">here</a>.
<p  align=”justify”>The web application is currently in development and any suggestions, bugs or errors will be welcomed. Error handling is also in development and the application might be irresponsive to specific errors.
Do not hesitate to contact through the contact form, email or any other social platform available.  </p>
</p>
</div>



<!-- Modal for full size images on click-->
<div id="modal01" class="w3-modal w3-white" style="padding-top:0" onclick="this.style.display='none'">
<span class="w3-button w3-white w3-xxlarge w3-display-topright">×</span>
<div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
<img id="img01" class="w3-image">
<p id="caption"></p>
</div>
</div>

<!-- Dashboards -->
<div class="w3-container" id="dashboards" style="margin-top:75px">
<h1 class="w3-xxxlarge w3-text-indigo"><b>Dashboards.</b></h1>
<hr style="width:800px;border:3px solid #3f51b5" class="w3-round">

<div class="w3-row-padding" id="fscv_analysis">
<div class="w3-half w3-margin-bottom w3-center">
<ul class="w3-ul w3-light-grey">
<li class="w3-indigo w3-xlarge w3-padding-32">FSCV Analysis</li>
<li class="w3-padding-16"> <a class="w3-button w3-indigo w3-padding-large w3-hover-black" onclick="FSCVWindow()"> Open application</a> </li>
</ul>
</div>
<div class="w3-half w3-margin-bottom w3-center">
<ul class="w3-ul w3-light-grey">
<li class="w3-indigo w3-xlarge w3-padding-32">FSCAV Analysis</li>
<form id="upload_form3" enctype="multipart/form-data" method="post">
<li class="w3-padding-16"> <a class="w3-button w3-indigo w3-padding-large w3-hover-black" onclick="FSCAVWindow(DataArray)"> Open application</a> </li>
</form>
</ul>
</div>
</div>
</div>

<div class="w3-container" id="documentation" style="margin-top:75px">
<h1 class="w3-xxxlarge w3-text-indigo"><b>Documentation.</b></h1>
<hr style="width:800px;border:3px solid #3f51b5" class="w3-round">
</div>

<div class="w3-container" id="references" style="margin-top:75px">
<h1 class="w3-xxxlarge w3-text-indigo"><b>References.</b></h1>
<hr style="width:800px;border:3px solid #3f51b5" class="w3-round">
<p><cite>[1]	S. Samaranayake et al., “A voltammetric and mathematical analysis of histaminergic modulation of serotonin in the mouse hypothalamus,” J. Neurochem., pp. 374–383, Aug. 2016, doi: 10.1111/jnc.13659.
</cite></p>

<p><cite>[2]	N. Elgrishi, K. J. Rountree, B. D. McCarthy, E. S. Rountree, T. T. Eisenhart, and J. L. Dempsey, “A Practical Beginner’s Guide to Cyclic Voltammetry,” J. Chem. Educ., vol. 95, no. 2, pp. 197–206, Feb. 2018, doi: 10.1021/acs.jchemed.7b00361.</cite></p>

<p><cite>[3]	V. Dumoulin and F. Visin, “A guide to convolution arithmetic for deep learning,” Mar. 2016. </cite></p>

<p><cite>[4]	A. Quarteroni, R. Sacco, and F. Saleri, “Numerical Mathematics,” Springer, Lausanne, Switzerland, 2007. </cite></p>

<p><cite>[5]	J. Tellinghuisen, “Statistical error propagation,” J. Phys. Chem. A, vol. 105, no. 15, pp. 3917–3921, Apr. 2001, doi: 10.1021/jp003484u. </cite></p>

<p><cite>[6]	K. M. Wood, A. Zeqja, H. F. Nijhout, M. C. Reed, J. Best, and P. Hashemi, “Voltammetric and mathematical evidence for dual transport mediation of serotonin clearance in vivo,” J. Neurochem., vol. 130, no. 3, pp. 351–359, 2014, doi: 10.1111/jnc.12733. </cite></p>

<p><cite>[7]	H. P. Gavin, “The Levenberg-Marquardt algorithm for nonlinear least squares curve-fitting problems,” 2019. </cite></p>

<p><cite>[8]	C. W. Atcherley, N. D. Laude, E. B. Monroe, K. M. Wood, P. Hashemi, and M. L. Heien, “Improved Calibration of Voltammetric Sensors for Studying Pharmacological Effects on Dopamine Transporter Kinetics in Vivo,” ACS Chem. Neurosci., vol. 6, no. 9, pp. 1509–1516, Jul. 2014, doi: 10.1021/cn500020s.</cite></p>

<p><cite>[9]	S. M. Riad, “The Deconvolution Problem: An Overview,” Proc.  IEEE, vol. 76, no. 1, pp. 82–85, 1986.</cite></p>
</div>

<div class="w3-container" id="acknowledgments" style="margin-top:75px">
<h1 class="w3-xxxlarge w3-text-indigo"><b>Acknowledgements.</b></h1>
<hr style="width:800px;border:3px solid #3f51b5" class="w3-round">
<h2 class="w3-large w3-text-indigo"><b>Project Acknowledgements.</b></h2>
<p style="text-align: center">My first sincere gratitude goes to Dr. Parastoo Hashemi, Senior Lecturer at Imperial College London (ICL) and supervisor of this MSc project, for her constant support, guidance and dynamism throughout the whole project. Even during Covid19 lockdown times, she has given her best to help us to keep the team connected and find the right research questions together. I also hugely thank The Hashemi Lab team at the University of South Carolina (USC) for providing the FSCV signals used to build and optimise the algorithms. Especially, I would like to thank Shane N. Berger, Graduate Student at USC for his invaluable help providing signals crucial to build the algorithms, great physiological knowledge on histamine modulation of serotonin and patience answering my science questions. </p>
<p style="text-align: center"> Across the pond, I would like to thank Melissa F. Hexter, PhD student at ICL for her warming welcome and support when I first joined the laboratory, as well as Solene P. Dietsch and Nathan J. Robins, MSc students at ICL, for out enriching meetings to discuss our projects.  </p>
<p style="text-align: center"> I would also like to thank the whole online programming community of StackOverflow who have offered an invaluable technical help building this website and answered many of my toughest coding questions during lockdown.</p>
<p style="text-align: center"> At last but not least, all my gratitude to my family, friends and my partner who have emotionally helped me to complete this project.</p>
<h2 class="w3-large w3-text-indigo"><b>Software Acknowledgements.</b></h2>
<p> Analysis Kid may utilize the following copyrighted software or programming libraries and therefore acknowledged: </p>
<ul>
<li><a href="https://plotly.com/">Plotly software package</a> in Javascript for the plotting of signals and interactive algorithms</li>
<li><a href="https://apexcharts.com/">Apexcharts software package</a> in Javascript for the plotting of signals and interactive algorithms</li>
<li><a href="https://www.tensorflow.org/">Tensorflow</a> and <a href="https://keras.io/">Keras</a> for the creation and training of neural networks and prediction algorithms</li>
<li><a href="https://numpy.org/" >Numpy</a>, <a href="https://www.scipy.org/" >SciPy</a>, <a href="https://lmfit.github.io/lmfit-py/" >lmfit</a> and <a href="https://pandas.pydata.org/" >Pandas</a> libraries for the data analysis and handling of signals </li>
<li><a href="https://flask.palletsprojects.com/en/1.1.x/quickstart/" >Flask</a> library for the creation of a data analysis API service in Python</li>
<li> <a href="https://www.w3schools.com/" >w3schools</a> for partial CSS styling of the website </li>
</ul>
</div>

<footer class="w3-content w3-padding-64 w3-light-grey w3-text-black w3-center">
<p> <a href="#top" class="w3-button w3-black"><i class="fa fa-arrow-up "></i>To the top</a></p>

<p class="w3-large">
<a href = "mailto:sergio.mena19@imperial.ac.uk?subject = Feedback&body = Message"><i class="fa fa-envelope"></i></a>
<a href="https://twitter.com/sermeor"><i class="fab fa-twitter"></i></a>
<a href="https://www.linkedin.com/in/sergio-mena-ortega-a418ab120/"><i class="fab fa-linkedin-in"></i></a>

</p>
<p class="w3-small"><a href="https://www.hashemilab.com/">The Hashemi Lab</a></p>
<p class="w3-small">Imperial College London</p>
<p class="w3-small">Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank" class="w3-hover-text-green">w3.css</a></p>
</footer>
</div>


<script>
// Script to open and close sidebar from w3.
function w3_open() {
document.getElementById("mySidebar").style.display = "block";
document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
document.getElementById("mySidebar").style.display = "none";
document.getElementById("myOverlay").style.display = "none";
}
// Modal Image Gallery
function onClick(element) {
document.getElementById("img01").src = element.src;
document.getElementById("modal01").style.display = "block";
var captionText = document.getElementById("caption");
captionText.innerHTML = element.alt;
}

// Script to open Dashboards depending on plot selected
// Contact pop up window.
function ContactWindow(){
window.open(encodeURI('ContactForm.php'), "", "width=500,height=550",'resizesable=yes');
}

//Callback for the FSCAV Application.
function FSCAVWindow(DataArray){

}
// Callback for the FSCV application.
function FSCVWindow(){
window.open(encodeURI('FSCVCalibration.php'), "");
};
</script>

</html>
