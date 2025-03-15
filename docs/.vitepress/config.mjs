import {defineConfig} from 'vitepress'
//import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "WJZ_P的个人博客",
    description: "By WJZ_P",
    head: [
        ['link', {rel: 'icon', href: `/smile.png`}]
    ],
    // vite: {
    //     plugins: [
    //         //添加插件
    //         AutoSidebar({
    //             //插件的配置选项，具体在https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar
    //         })
    //     ]
    // },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/smile.jpg",
        search: {
            provider: 'local'
        },
        nav: [
            {text: '主页', link: '/'},
            {text: 'Examples', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: '个人介绍',
                items: [
                    {text: '简介', link: '/introduction/自我介绍'},
                ]
            },
            {
                text: '编程相关',
                items: [
                    {text: '专业术语', link: '/coding/专业术语'},
                    {text: '力扣好题',link: '/coding/LeetCode好题'},
                    {text: 'Java源码',link: '/coding/Java源码'},
                    {text: 'Java细节',link:'/coding/Java细节'},

                ]
            },
            {
                text: 'MySQL笔记',
                items: [
                    {text: '基础',link:'/MySQL/基础'},
                    {text: '索引',link:'/MySQL/索引'},
                    {text: 'B+树',link:'/MySQL/为什么MySQL用B+树'},
                    {text: '锁篇',link:'/MySQL/锁篇'},
                ]
            },
            {
                text: '计算机网络笔记',
                items: [
                    {text: '基础',link:'/network/计网基础'},
                    {text: 'HTTP',link:'/network/HTTP篇'},
                    {text: '事务',link:'/network/事务'},
                ]
            },
            {
                text: '其他',
                items: [
                    {text: '杂项', link: '/others/其他'},
                ]
            },
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/WJZ-P'}
        ],
        footer: {
            message: 'wow！',
            copyright: '2022.03.13 @WJZ_P',
        }
    }
})