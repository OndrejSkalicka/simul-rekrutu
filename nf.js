function r2(n) {
    return n.toFixed(2)
}

function nf2(n) {
    return r2(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

function nf0(n) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
