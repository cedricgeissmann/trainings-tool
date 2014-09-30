$(document).submit(function(e){
    var screenHeight = parseFloat($("#screenResolution").val());
    var numRows = parseFloat($("#numberOfRows").val());
    var imgWidth = parseFloat($("#widthImage").val());
    var imgHeight = parseFloat($("#heightImage").val());
    var mult=parseFloat(numRows-2);
    //console.log(screenHeight+" "+numRows+" "+imgWidth+" "+imgHeight);
    if(mult<0){
        mult=0;
    }
    var tmpImgHeight = parseFloat(screenHeight-(420+(25*mult)));
    var quot=parseFloat(imgWidth/imgHeight);
    var result = parseFloat(tmpImgHeight*quot);
    $("#result").val(result);
    e.preventDefault();
});