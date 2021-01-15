import example from './js/example'
import './styles/index.scss'



const section = document.createElement('section')
section.innerHTML = example

const app = document.querySelector('#root')
app.append(section)
