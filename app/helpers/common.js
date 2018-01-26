function customErrorShape(data={}) {
  return Promise.reject(data);
}

export {
  customErrorShape
}