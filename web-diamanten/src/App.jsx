import $ from 'jquery'


import './assets/js/breakpoints.min.js';
import './assets/js/util.js';
import './assets/js/main.js';

import './App.css';
import './assets/css/main.css';
import './assets/css/noscript.css';
import {Main} from './components/Main'

window.jQuery = $;
window.$ = $;
function App() {

  return (
    <>
    <Main/>
    </>
  )
}

export default App
