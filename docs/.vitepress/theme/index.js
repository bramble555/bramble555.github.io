import Theme from 'vitepress/theme'
import './style/var.css'
import ViewedCount from "./components/ViewedCount.vue";

export default {
    ...Theme,
    enhanceApp({app}) {
        app.component('ViewedCount', ViewedCount)
    }
}