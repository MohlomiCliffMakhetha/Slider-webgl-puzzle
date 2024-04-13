var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');
/* Step2: Define the geometry and store it in buffer objects */
var vertices_templet = [
    -1, 1,
    -1, 0.5,
    -0.5, 0.5,
    -1, 1,
    -0.5, 0.5,
    -0.5, 1
]
var vertices = []
for (let i = 0; i < 4; i++) {
    vertices.push([])
    for (let j = 0; j < 4; j++) {
        var ary = []
        for (let k = 0; k < 6; k++) {
            ary.push(vertices_templet[k * 2] + 0.5 * (j), vertices_templet[k * 2 + 1] - 0.5 * (i))
        }
        vertices[i].push(ary)
    }
}
vertices[3][3] = []
var linevertices = [
    -0.5, 1,
    -0.5, -1,
    0, 1,
    0, -1,
    0.5, 1,
    0.5, -1,
    -1, 0.5,
    1, 0.5,
    -1, 0,
    1, 0,
    -1, -0.5,
    1, -0.5,
    -1, 1,
    1, 1,
    -1, -1,
    1, -1,
    -1, 1,
    -1, -1,
    1, 1,
    1, -1,
]

var linecolor = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
]

var color_vertices = [
    [[1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,],

    [0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,],

    [0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,],

    [1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,],],

    //second row
    [[0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,],

    [0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,],

    [1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,],

    [1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,],],

    //third row
    [[0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,],

    [1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,],

    [1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,],

    [0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,],],

    //fourth row
    [[1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,],

    [1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,],

    [0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,],

    [],
    ]
]

var texture_templet = [
    0, 1,
    0, 0.75,
    0.25, 0.75,
    0, 1,
    0.25, 0.75,
    0.25, 1,
]
var texture_vertices = []
for (let i = 0; i < 4; i++) {
    texture_vertices.push([])
    for (let j = 0; j < 4; j++) {
        var ary = []
        for (let k = 0; k < 6; k++) {
            ary.push(texture_templet[k * 2] + 0.25 * (j), texture_templet[k * 2 + 1] - 0.25 * (i))
        }
        texture_vertices[i].push(ary)
    }
}
texture_vertices[3][3] = []

var vertex_buffer = [[], [], [], [],]
var color_buffer = [[], [], [], [],]
var texture_buffer = [[], [], [], [],]

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        var vert_buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vert_buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices[i][j]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        vertex_buffer[i].push(vert_buf)

        var col_buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, col_buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color_vertices[i][j]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        color_buffer[i].push(col_buf)

        var tex_buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, tex_buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texture_vertices[i][j]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        texture_buffer[i].push(tex_buf)
    }
}

var linevertices_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, linevertices_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(linevertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

var linecolor_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, linecolor_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(linecolor), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);


picture('grid.png')
/* Step3: Create and compile Shader programs */
var vertCode = `
    attribute vec2 coordinates;
    //attribute vec3 color;
    attribute vec2 texture;
    varying vec2 vtexture;
    //varying vec3 vcolor;
    uniform float x,y;
    void main(void) { gl_Position = vec4(coordinates,0, 1.0)+vec4(x,y,0,0);
        //vcolor = color;
        vtexture=texture;
    }`;

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

var fragCode = `
 precision mediump float;
 //varying vec3 vcolor;
 uniform sampler2D fragsamper;
 varying vec2 vtexture;
 void main(void) {
    gl_FragColor = texture2D(fragsamper,vtexture);

}`;

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

/* Step 4: Associate the shader programs to buffer objects */

var blc_i = 3
var blc_j = 3
var displace = [
    [[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 2], [0, 0, 0, 3]],
    [[0, 0, 1, 0], [0, 0, 1, 1], [0, 0, 1, 2], [0, 0, 1, 3]],
    [[0, 0, 2, 0], [0, 0, 2, 1], [0, 0, 2, 2], [0, 0, 2, 3]],
    [[0, 0, 3, 0], [0, 0, 3, 1], [0, 0, 3, 2], [0, 0, 3, 3]]
]




function draw() {
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);


    // gl.bindBuffer(gl.ARRAY_BUFFER, linevertices_buffer);
    // var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(coord);
    // gl.lineWidth(3)



    gl.drawArrays(gl.LINES, 0, linevertices.length / 2);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer[i][j]);
            var coord = gl.getAttribLocation(shaderProgram, "coordinates");
            gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(coord);

            gl.uniform1f(gl.getUniformLocation(shaderProgram, 'x'), displace[i][j][0])
            gl.uniform1f(gl.getUniformLocation(shaderProgram, 'y'), displace[i][j][1])

            // gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer[i][j]);
            // var color = gl.getAttribLocation(shaderProgram, "color");
            // gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
            // gl.enableVertexAttribArray(color);

            gl.bindBuffer(gl.ARRAY_BUFFER, texture_buffer[i][j]);
            var txture = gl.getAttribLocation(shaderProgram, "texture");
            gl.vertexAttribPointer(txture, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(txture);

            /* Step5: Drawing the required object (triangle) */
            gl.drawArrays(gl.TRIANGLES, 0, vertices[i][j].length / 2);
        }
    }

    requestAnimationFrame(draw)
}

draw()

function picture(img) {
    var texture_buffer_img = gl.createTexture();
    var image = new Image();
    image.src = img;
    image.addEventListener('load', function () {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, texture_buffer_img);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // gl.generateMipmap(gl.TEXTURE_2D);
    });
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
}

// Get all arrow keys
const arrowKeys = document.querySelectorAll('.arrow-key');

// Loop through each arrow key
arrowKeys.forEach(key => {
    // Add click event listener to each arrow key
    key.addEventListener('click', () => {
        // Get the data-key attribute value
        const keyCode = parseInt(key.getAttribute('data-key'));
        
        // Create a fake event object with keyCode property
        const fakeEvent = new KeyboardEvent('keydown', { keyCode });
        
        // Dispatch the fake event
        document.dispatchEvent(fakeEvent);
    });
});

// Add event listener for keydown event on document
document.addEventListener('keydown', (e) => {
    var inc_i = 0;
    var inc_j = 0;
    var m_blc_i = blc_i;
    var m_blc_j = blc_j;
    e = e || window.event;
    if (e.keyCode === 38 && blc_i < 3 && blc_i >= 0) {
        blc_i += 1;
        inc_i = 0.5;
    } else if (e.keyCode === 40 && blc_i <= 3 && blc_i > 0) {
        blc_i -= 1;
        inc_i = -0.5;
    } else if (e.keyCode === 37 && blc_j < 3 && blc_j >= 0) {
        blc_j += 1;
        inc_j = -0.5;
    } else if (e.keyCode === 39 && blc_j <= 3 && blc_j > 0) {
        blc_j -= 1;
        inc_j = 0.5;
    }

    displace[displace[blc_i][blc_j][2]][displace[blc_i][blc_j][3]][1] += inc_i;
    displace[displace[blc_i][blc_j][2]][displace[blc_i][blc_j][3]][0] += inc_j;
    var m2 = displace[blc_i][blc_j][2];
    var m3 = displace[blc_i][blc_j][3];
    displace[blc_i][blc_j][2] = displace[m_blc_i][m_blc_j][2];
    displace[blc_i][blc_j][3] = displace[m_blc_i][m_blc_j][3];
    displace[m_blc_i][m_blc_j][2] = m2;
    displace[m_blc_i][m_blc_j][3] = m3;
});



