let values = ['5', '-10', '-321', '54'];

let negativeValues = values.filter((value) => value.includes('-'));

let positiveValues = values.filter((value) => !value.includes('-'))

// negativeValues = [ '-10', '-321' ]

console.log(positiveValues)
