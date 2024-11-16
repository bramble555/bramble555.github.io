export default {
    title: 'WJZ的个人博客', //站点标题
    description: '计算机编程技术类博客',//mate标签description，多用于搜索引擎抓取摘要
    themeConfig: {
        siteTitle: "WJZ的博客",
        logo: "/smile.jpg",
        nav: [
            {text: "Github", link: "/guide/"},
            {text: "GuideTest", link: "/guide/test"},
            {text: "Github", link: "https://github.com/WJZ-P"},
        ],
        socialLinks: [
            {icon: "github", link: "https://github.com/WJZ-P"},
            // You can also add custom icons by passing SVG as string:
            // {
            //     icon: {svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>',}, link: "...",
            // },
        ],
        sidebar: [
            {
                text: "组件库源码实现",
                collapsible: true,
                items: [
                    {
                        text: "组件库环境搭建",
                        link: "/articles/组件库环境搭建",
                    },
                    {text: "gulp的使用", link: "/articles/gulp的使用"},
                ],
            },
            {
                text: "vue教程",
                collapsible: true,
                items: [
                    {
                        text: "pina和vuex",
                        link: "/articles/pina和vuex",
                    },
                ],
            },
        ],
    }
}