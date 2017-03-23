export function copy(x, y) {
    var i;
    var dx = x.data;
    var dy = y.data;
    var ox = x.stride[0];
    var oy = y.stride[0];
    var px = x.offset;
    var py = y.offset;
    for (i = x.shape[0] - 1; i >= 0; i--, px += ox, py += oy) {
        dy[py] = dx[px];
    }
}

export function axpy(alpha, x, y) {
    var i;
    var dx = x.data;
    var dy = y.data;
    var px = x.offset;
    var py = y.offset;
    for (i = dx.length - 1; i >= 0; i--) {
        dy[i + py] += alpha * dx[i + px];
    }
}