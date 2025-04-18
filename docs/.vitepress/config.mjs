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
                    {text: '力扣好题', link: '/coding/LeetCode好题'},
                    {text: 'Java源码', link: '/coding/Java源码'},
                    {text: 'Java细节', link: '/coding/Java细节'},

                ]
            },
            {
                text: 'MySQL笔记',
                items: [
                    {text: '基础', link: '/MySQL/基础'},
                    {text: '索引', link: '/MySQL/索引'},
                    {text: 'B+树', link: '/MySQL/为什么MySQL用B+树'},
                    {text: '事务', link: '/MySQL/事务'},
                    {text: '锁篇', link: '/MySQL/锁篇'},
                    {text: '日志', link: '/MySQL/日志'},
                    {text: '内存', link: '/MySQL/内存'},
                    {text: '面试', link: '/MySQL/面试'},
                ]
            },
            {
                text: '计算机网络笔记',
                items: [
                    {text: '基础', link: '/network/计网基础'},
                    {text: 'HTTP', link: '/network/HTTP篇'},
                    {text: '面试篇', link: '/network/面试篇'},
                    {text: 'TCP篇', link: '/network/TCP篇'},
                ]
            },
            {
                text: 'Java学习',
                items: [
                    {text: '并发编程', link: '/Java/并发编程'},
                    {text: 'JVM虚拟机', link: '/Java/JVM虚拟机'},
                    {text: '面试篇', link: '/Java/面试篇'},
                    {text: '常见集合篇', link: '/Java/常见集合篇'},
                ]
            },
            {
                text: 'Redis学习',
                items: [
                    {text: '面试篇', link: '/Redis/面试篇'},
                    {text: '面试篇', link: '/Redis/数据类型篇'},
                ]
            },
            {
                text: '操作系统学习',
                items: [
                    {text: '面试篇', link: '/os/面试篇'},
                ]
            },
            {
                text: '分布式',
                items: [
                    {text: '分布式学习', link: '/Distributed/分布式学习'},
                ]
            },
            {
                text: 'linux',
                items: [
                    {text: 'linux面试篇', link: '/linux/linux面试篇'},
                ]
            },
            {
                text: 'springboot',
                items: [
                    {text: 'springboot面试篇', link: '/springboot/springboot面试篇'},
                ]
            },
            {
                text: '面试相关',
                items: [
                    {text: '面经', link: '/interview/面经'},
                    {text: '设计模式', link: '/interview/设计模式'},
                ]
            },
            {
                text: '我的面试经历',
                items: [
                    {text: '1.字节国际电商', link: '/myInterview/第一次面试-字节国际电商'},
                    {text: '2.广州华资软件', link: '/myInterview/第二次面试-广州华资软件公司'},
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