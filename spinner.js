function getRotationDegrees(obj) {
  var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform") ||
    obj.css("-ms-transform") ||
    obj.css("-o-transform") ||
    obj.css("transform");
  if (matrix !== 'none' && matrix !== undefined) {
    var values = matrix.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  } else {
    var angle = 0;
  }
  return (angle < 0) ? angle += 360 : angle;
}

function rotate(degree) {
  //degree = degree * -1;
  if (degree > 20)
    degree = 20;
  else if (degree < -20)
    degree = -20;
  console.log(degree);

  var newDeg = (getRotationDegrees($('#wheel')) + degree);

  $('#wheel').css({
    '-webkit-transform': 'rotate(' + newDeg + 'deg)'
  });
  // For Mozilla browser: e.g. Firefox
  $('#wheel').css({
    '-moz-transform': 'rotate(' + newDeg + 'deg)'
  });

  $('#wheel').css({
    '-o-transform': 'rotate(' + newDeg + 'deg)'
  });
  $('#wheel').css({
    'transform': 'rotate(' + newDeg + 'deg)'
  });
}

$('body').on('mousewheel', function(e) {
  var delta;

  //console.log($(e.target).hasClass("wheel_part"));
  if ($(e.target).hasClass("wheel_part")) {
    e.preventDefault();

    if (e.type == 'mousewheel') {
      delta = e.originalEvent.wheelDelta

    } else if (e.type == 'DOMMouseScroll') {
      delta = e.originalEvent.detail;
    }
    rotate(delta / 10);
  }
});