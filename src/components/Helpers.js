const Helpers = {
  getMousePos: function(canvas, event) {
    var rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  },

  getBoxCollision: function(obj1, obj2) {
    var collision;

    if (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.height + obj1.y > obj2.y) {
      collision = true;
    } else {
      collision = false;
    }

    return collision;
  },

  getPointCollision: function(obj1, obj2) {
    var collision;

    if (obj1.x > obj2.x &&
      obj1.y > obj2.y &&
      obj1.x < obj2.x + obj2.width &&
      obj1.y < obj2.y + obj2.height) {
      collision = true;
    } else {
      collision = false;
    }

    return collision;
  },

  getObjectsDistance: function(obj1, obj2) {
    const x1 = Helpers.getObjectCenter(obj1).x;
    const y1 = Helpers.getObjectCenter(obj1).y;
    const x2 = Helpers.getObjectCenter(obj2).x;
    const y2 = Helpers.getObjectCenter(obj2).y;

    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  },

  getObjectCenter: function(obj) {
    const x = obj.x + (obj.width * 0.5);
    const y = obj.y + (obj.height * 0.5);

    return {
      x,
      y
    }
  }
}

export default Helpers;