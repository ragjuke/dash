// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

import ReceiptIcon from '@mui/icons-material/Receipt';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'menu',
    items: [
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: <Iconify icon={'ant-design:dashboard-filled'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      {
        title: 'deposit',
        path: PATH_DASHBOARD.transactions.deposit,
        icon: <Iconify icon={'fluent:money-hand-20-filled'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      {
        title: 'withdraw',
        path: PATH_DASHBOARD.transactions.withdraw,
        icon: <Iconify icon={'healthicons:money-bag'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      {
        title: 'packages',
        path: PATH_DASHBOARD.transactions.packages,
        icon: <Iconify icon={'iconoir:packages'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      {
        title: 'investments',
        path: PATH_DASHBOARD.transactions.investments,
        icon: <Iconify icon={'bi:card-list'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      {
        title: 'transactions',
        path: PATH_DASHBOARD.transactions.list,
        icon: <Iconify icon={'uil:transaction'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      {
        title: 'profile',
        path: PATH_DASHBOARD.user.profile,
        icon: <Iconify icon={'carbon:user-avatar-filled'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      {
        title: 'settings',
        path: PATH_DASHBOARD.user.account,
        icon: <Iconify icon={'eva:settings-2-fill'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      {
        title: 'referrals',
        path: PATH_DASHBOARD.user.profile+'?tab=referrals',
        icon: <Iconify icon={'bxs:user-detail'} sx={{ width: 22, height: 22, mr: 0.5 }} />,
      },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //         { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //         { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
  //       ],
  //     },

  //     // MANAGEMENT : BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.postById },
  //         { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
  //       ],
  //     },
  //   ],
  // },

  // // APP
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },
];

export default navConfig;
