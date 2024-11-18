import Theme from 'vitepress/theme'
import './style/var.css'
import Counter from './components/Counter.vue'

export default {
    ...Theme,
    enhanceApp({app}) {
        app.component('Counter', Counter)
    }
}