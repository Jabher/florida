export function copy(x, y) {
    let i;
    const dx = x.data;
    const dy = y.data;
    const ox = x.stride[0];
    const oy = y.stride[0];
    let px = x.offset;
    let py = y.offset;
    for (i = x.shape[0] - 1; i >= 0; i--, px += ox, py += oy) {
        dy[py] = dx[px];
    }
}

export function axpy(alpha, x, y) {
    let i;
    const dx = x.data;
    const dy = y.data;
    const px = x.offset;
    const py = y.offset;
    const alphaValue = alpha.data;
    for (i = dx.length - 1; i >= 0; i--) {
        dy[i + py] += alphaValue[0] * dx[i + px];
    }

}