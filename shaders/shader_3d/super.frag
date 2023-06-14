// This file how to mix shapes 
// This is based on the works of Inigo Quilez and Martijn Steinrucken

// Another method is from Inigo Quilez 
// https://iquilezles.org/

// One method is based on tutorials by Martyn 
// https://www.youtube.com/c/TheArtofCodeIsCool

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
uniform sampler2D tex0;
uniform float shape1;
uniform float shape2;
uniform float scale;  // scale
uniform float mv;  // mix value
// uniform float h; // height 
// uniform float r; // radius for star
// uniform int nn;  // angle parameter for star
// uniform float m;  // angle paramenter for star
uniform float re;  // value for red
uniform float gr;  // value for green
uniform float bl;  // value for blue

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(255, 0, 0) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(0, 0, 255) / 255.
#define GREEN vec3(0, 255, 0) / 255.

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

// From KIFS Fractals explained by The Art of Code
// https://www.youtube.com/watch?v=il_Qg9AqQkE

// Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}
// function to extract polar coordinates
// from Daniel Shiffman
vec3 Spherical( in vec3 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
   float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
   float phi = atan(pos.y, pos.x);
   vec3 w = vec3(r, theta, phi);
   return w;
}

// 2d Circle and Box SDFs from Inigo Quilez
float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

// 3d SDFs from Inigo Quilez
float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

float sdSphere(vec3 p, float r) {
	return length(p) - r;
}

float hyperbolicTan( float theta) {
    float e = 2.71828;
    float l = pow(e, 2.0 * theta);
    return (l - 1.0) / (l + 1.0);
}

// a and b are parameters of the gear curve, n is the # of spokes
// a will determine the depth of the spikes
float sdGear( vec2 uv, float a, float b, float n) {
    float theta = atan(uv.y, uv.x);
    float r = (a/b)*(hyperbolicTan(b * sin(n*theta))) ;
    float d = sdCircle(uv, 0.4);
    
    //return d + length(uv) - r;
    return r;
}


// From Inigo Quilez
// float opExtrusion( vec3 p, float h )
// {
//    float d;
//   //choose 2D shape
//   if (shape1 == 0.0) {
//     d = sdCircle(p.xy, scale);
//   } else if (shape1 == 1.0) {
//     d = sdStar(p.xy, scale, 8, 6.0);
//   } else if (shape1 == 2.0) {
//     d = sdHexagon(p.xy, scale);
//   }
//     vec2 w = vec2( d, abs(p.z) - h );
//     return min(max(w.x,w.y),0.0) + length(max(w,0.0));
// }

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// Mix 2D sdf with 3D sdf
// From the Art of Code
// Mix two differenet SDFs
float GetDist(vec3 p) {
    float d, s;
    // Can move the shape by subtracting a vec3()
     vec3 q = p - vec3(0.0, 0.0, 0.0);
     float mv = 0.5;
    
    // Mix gear and sphere
      d = sdGear(q.xz, 0.3, 10.0, 10.0);
      d = mix(d, sdSphere(p, 0.5), mv);
    return d;
}

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }   
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}

void main( )
{
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    
    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 2.0);
     col = colorGradient(uv, BLUE, PURPLE, 0.75);
  
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 c = vec3(dif);
        col = col + c*RED; 
      //col = vec3( dif*RED, dif*GREEN, dif*BLUE );
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}