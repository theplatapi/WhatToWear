undershirt = {
  getClothes: function() {
    return {top: '', bottom: ''};
  }
};

business = {
  getClothes: function(temperature) {
    var top = null;

    if (temperature <= 55) {
      top = '/clothes/top_pea_coat.png';
    }
    else if (temperature > 55) {
      top = '/clothes/top_button_down.png';
    }
    else {
      top = '/clothes/top_button_down_short.png';
    }

    return {top: top, bottom: '/clothes/bottom_slacks.png'};
  }
};

programmer = {
  getClothes: function(temperature) {
    var top = null;
    var bottom = '/clothes/bottom_pants.png';

    if (temperature < 60) {
      //TODO: Make this a sweatshirt
      top = '/clothes/top_shirt_long.png'
    }
    else if (temperature < 65) {
      top = '/clothes/top_shirt_long.png';
    }
    else if (temperature < 80) {
      top = '/clothes/top_shirt.png'
    }
    else if (temperature >= 80) {
      top = '/clothes/top_shirt.png';
      bottom = 'clothes/bottom_shorts';
    }

    return {top: top, bottom: bottom};
  }
};