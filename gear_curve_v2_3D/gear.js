// https://mathworld.wolfram.com/GearCurve.html
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

class Gear {
  constructor(_px, _py, _a, _b, _spokes, _sc, _col) {
    this.px = _px;
    this.py = _py;
    this.a = _a;
    this.b = _b;
    this.sp = _spokes;
    this.sc = _sc;
    this.points = [];
    this.col = _col;
  }

  hyperbolicTan(theta) {
    let e = 2.71828;
    let l = pow(e, 2 * theta);
    return (l - 1) / (l + 1);
  }
  // We need to loop through curve once before creating object
  oneCurve() {
    for (let theta = 0; theta < 361; theta += 1) {
      // Equations for Gear curve
      let r =
        this.a +
        (1 / this.b) * this.hyperbolicTan(this.b * sin(this.sp * theta));
      let x = this.sc * r * sin(theta);
      let y = this.sc * r * cos(theta);
      let z = -1;
      let p = createVector(x, y, z);

      if (this.points.length < 361) {
        this.points[theta] = p;
      } else {
        break;
      }
    }
  }

  show(angle) {
    let col;
    let fr = 361 % this.sp;
    push();
    noFill();
    translate(this.px, this.py);
    rotate(angle);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      strokeWeight(2.5);

        
        // col = color(0, 79, 72, 100);
     
      //let col = color(this.h[i], 100, 50, 80);
      stroke(this.col);
      let v = this.points[i];
      vertex(v.x, v.y, v.z);
    }
    endShape();
    pop();
    this.points = [];
  }
}
