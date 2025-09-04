import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fa-solid fa-house',
        label: 'Tahir'
    },
    {
        routeLink: 'products',
        icon: 'fa-solid fa-box-open',
        label: 'Products',
        expanded: false,
        items: [
            {
                routeLink: 'products/level1.1',
                label: 'Level 1.1',
                expanded: false,
                items: [
                    {
                        routeLink: 'products/level2.1',
                        label: 'Level 2.1',
                    },
                    {
                        routeLink: 'products/level2.2',
                        label: 'Level 2.2',
                        expanded: false,
                        items: [
                            {
                                routeLink: 'products/level3.1',
                                label: 'Level 3.1'
                            },
                            {
                                routeLink: 'products/level3.2',
                                label: 'Level 3.2'
                            }
                        ]
                    }
                ]
            },
            {
                routeLink: 'products/level1.2',
                label: 'Level 1.2',
            }
        ]
    },
    {
        routeLink: 'statistics',
        icon: 'fa-regular fa-chart-bar',
        label: 'Statistics'
    },
    {
        routeLink: 'coupens',
        icon: 'fa-solid fa-tags',
        label: 'Coupens',
        expanded: false,
        items: [
            {
                routeLink: 'coupens/list',
                label: 'List Coupens'
            },
            {
                routeLink: 'coupens/create',
                label: 'Create Coupens'
            }
        ]
    },
    {
        routeLink: 'pages',
        icon: 'fa-regular fa-file',
        label: 'Pages'
    },
    {
        routeLink: 'media',
        icon: 'fa-solid fa-camera',
        label: 'Media'
    },
    {
        routeLink: 'settings',
        icon: 'fa-solid fa-gear',
        label: 'Settings',
        expanded: false,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Profile'
            },
            {
                routeLink: 'settings/customize',
                label: 'Customize'
            }
        ]
    },
];
