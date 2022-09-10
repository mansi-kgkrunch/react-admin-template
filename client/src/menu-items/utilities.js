// assets
import { IconUser } from '@tabler/icons';

// constant
const icons = {
    IconUser
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'user',
            title: 'User',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconUser,
            breadcrumbs: false
        }
        // {
        //     id: 'util-color',
        //     title: 'Color',
        //     type: 'item',
        //     url: '/utils/util-color',
        //     icon: icons.IconPalette,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-shadow',
        //     title: 'Shadow',
        //     type: 'item',
        //     url: '/utils/util-shadow',
        //     icon: icons.IconShadow,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default utilities;
