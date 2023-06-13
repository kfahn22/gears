// Base code based on the Ray Marching Starting Point from the Art of Code
// https://www.youtube.com/watch?v=PGtv-dBi2wE

#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep
#define T iTime
#define PI 3.14159

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.

// Function to add color to shape using x,y,z dimensions
vec3 colXYZ( vec3 col1, vec3 col2, vec3 col3, vec3 n)
  {
        vec3 colXY = col1;  // front and back insdie and outside
        vec3 colXZ = col2;  // top and bottom
        vec3 colYZ = col3;  //  left and right inside and outside
      
       // Tri-planar mapping
        n = abs(n);  // take absolute value to get all faces of cube
        n *= pow(n, vec3(5.));
        n /= n.x + n.y + n.z; // add normalization 
      
       vec3 col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
       return col;
}

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }

// Rotation matrix
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

// Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// 2d Circle and Box SDFs from Inigo Quilez
float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

float sdBox( vec2 uv, vec2 b )
{
    vec2 d = abs(uv)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float hyperbolicTan( float theta) {
    float e = 2.71828;
    float l = pow(e, 2.0 * theta);
    return (l - 1.0) / (l + 1.0);
}

// function to extract polar coordinates
// from Daniel Shiffman
// vec3 Spherical( in vec3 pos) 
// {
//    float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
//    float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
//    float phi = atan(pos.y, pos.x);
//    vec3 w = vec3(r, theta, phi);
//    return w;
// }

// a and b are parameters of the gear curve, n is the # of spokes
float GearSDF( vec2 uv, float a, float b, float n) {
    float theta = atan(uv.y, uv.x);
    float r = 0.0 + (1.0/b)*(hyperbolicTan(b * sin(n*theta)));
    float d = sdCircle(uv, 0.2);
    return d + min(d, r);
}

void main( )
{
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	
    vec3 col = vec3(0);
  
    col = BLUE;
    // col = colorGradient(uv, BLUE, PURPLE, 0.75);
   
    float d = GearSDF(uv, 0.0, 10.0, 10.0);
    float m = 1.0 -S(0.008, 0.0, d);
    
     col = (1.0 - m)*col + m * PURPLE;
  
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}