function formatPrice(value) {
  var x = parseInt(value,10)
  return '$'+Number((x).toFixed(1)).toLocaleString('es-CL')+' CLP';
}

module.exports = { formatPrice }
