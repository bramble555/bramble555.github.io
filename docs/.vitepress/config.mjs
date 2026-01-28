import { defineConfig } from 'vitepress'
import path from 'path'
import fs from 'fs'

// 自动生成侧边栏的函数
function getSidebar() {
    // 获取 docs 目录的绝对路径
    // 注意：在 vitepress 中，config 文件通常在 .vitepress 下
    // 假设当前文件是 docs/.vitepress/config.mjs，那么 docs 目录就是上一级
    const docsPath = path.resolve(__dirname, '..')
    const ignoreDirs = ['.vitepress', 'public', 'images', 'assets']
    const sidebar = []

    try {
        // 读取 docs 下的一级目录
        const dirs = fs.readdirSync(docsPath).filter(file => {
            const fullPath = path.join(docsPath, file)
            return fs.statSync(fullPath).isDirectory() && !ignoreDirs.includes(file)
        })

        // 遍历目录
        for (const dir of dirs) {
            const dirPath = path.join(docsPath, dir)
            const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'))

            if (files.length > 0) {
                const items = files.map(file => {
                    const name = file.replace('.md', '')
                    return {
                        text: name,
                        link: `/${dir}/${name}`
                    }
                })

                sidebar.push({
                    text: dir, // 文件夹名作为分组名
                    collapsed: false,
                    items: items
                })
            }
        }
    } catch (e) {
        console.error('自动生成侧边栏出错:', e)
    }

    return sidebar
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "bramble 的个人博客",
    description: "By bramble",
    head: [
        ['link', { rel: 'icon', href: `/smile.png` }]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/smile.jpg",
        search: {
            provider: 'local'
        },
        nav: [
            { text: '主页', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],

        // 使用自定义函数生成侧边栏
        sidebar: getSidebar(),

        socialLinks: [
            { icon: 'github', link: 'https://github.com/bramble555' }
        ],
        footer: {
            message: 'wow！',
            copyright: '2026.1.28 @bramble',
        }
    }
})
