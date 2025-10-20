#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_intensity;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st = st * 2.0 - 1.0;
  st.x *= u_resolution.x / u_resolution.y;

  vec2 flameCenter = vec2(0.0, -0.1); // lift it slightly up
  float dist = length(st - flameCenter);

  // bigger radius and smoother shape
  float flame = smoothstep(0.55, 0.0, dist);

  float flicker = 0.7 + 0.3 * sin(u_time * 10.0 + rand(st) * 6.2831);
  flame *= flicker * u_intensity;

  vec3 core = vec3(1.0, 0.9, 0.4);
  vec3 edge = vec3(1.0, 0.2, 0.0);
  vec3 flameColor = mix(core, edge, dist * 2.0);
  vec3 color = flameColor * flame;

  // wider soft glow
  float glow = smoothstep(1.0, 0.0, dist) * 0.4;
  color += vec3(1.0, 0.6, 0.2) * glow;

  gl_FragColor = vec4(color, 1.0);
}

