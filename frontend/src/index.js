const target = document.querySelector('#main');

target.innerHTML = 'Hello world. My name is Nam';

if (module.hot) {
  module.hot.accept(err => {
    if (err) {
      // eslint-disable-next-line
      console.error('Cannot apply HMR update.', err);
    }
  });
}
