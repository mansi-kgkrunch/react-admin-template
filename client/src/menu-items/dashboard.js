// assets
import { IconDashboard , IconUser} from '@tabler/icons';

// constant
const icons = { IconDashboard ,IconUser};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'user',
            title: 'User',
            type: 'item',
            url: '/user',
            icon: icons.IconUser,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
