// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  suspended: '/suspended',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    investment: path(ROOTS_DASHBOARD, '/investment'),
    invest: path(ROOTS_DASHBOARD, '/invest'),
    profile: path(ROOTS_DASHBOARD, '/profile'),
    referrals: path(ROOTS_DASHBOARD, '/referrals'),
    security: path(ROOTS_DASHBOARD, '/security'),
    notiAlerts: path(ROOTS_DASHBOARD, '/notification/alerts'),
    kycUpdate: path(ROOTS_DASHBOARD, '/user/kyc'),
    alerts: path(ROOTS_DASHBOARD, '/user/alerts'),
    transactions: path(ROOTS_DASHBOARD, '/transactions'),
    deposit: path(ROOTS_DASHBOARD, '/deposit'),
    messages: path(ROOTS_DASHBOARD, '/messages'),
    support: path(ROOTS_DASHBOARD, '/support'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey'),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    ref: path(ROOTS_DASHBOARD, '/user/ref'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },
  transactions: {
    list: path(ROOTS_DASHBOARD, '/transactions/list'),
    investments: path(ROOTS_DASHBOARD, '/transactions/investments'),
    deposit: path(ROOTS_DASHBOARD, '/transactions/deposit'),
    withdraw: path(ROOTS_DASHBOARD, '/transactions/withdraw'),
    withdrawals: path(ROOTS_DASHBOARD, '/transactions/withdrawals'),
    packages: path(ROOTS_DASHBOARD, '/transactions/packages'),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post'),
  },
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  admin: {
    addresses: path(ROOTS_ADMIN, '/addresses-generated'),
    alerts: path(ROOTS_ADMIN, '/alerts'),
    alertEdit: path(ROOTS_ADMIN, '/alerts/edit-alert'),
    alertNew: path(ROOTS_ADMIN, '/alerts/new-alert'),
    dashboard: path(ROOTS_ADMIN, '/dashboard'),
    emailTemplates: path(ROOTS_ADMIN, '/emails'),
    emailTemplateEdit: path(ROOTS_ADMIN, '/emails/edit-email'),
    emailTemplateNew: path(ROOTS_ADMIN, '/emails/new-email'),
    gateways: path(ROOTS_ADMIN, '/gateways'),
    kyc: path(ROOTS_ADMIN, '/kyc/'),
    news: path(ROOTS_ADMIN, '/news'),
    newsEdit: path(ROOTS_ADMIN, '/news/edit-post'),
    newsNew: path(ROOTS_ADMIN, '/news/new-post'),
    packages: path(ROOTS_ADMIN, '/investment-packages'),
    pages: path(ROOTS_ADMIN, '/pages'),
    pageEdit: path(ROOTS_ADMIN, '/pages/edit-page'),
    pageNew: path(ROOTS_ADMIN, '/pages/new-page'),
    sendEmail: path(ROOTS_ADMIN, '/send-email'),
    sendEmailSingle: path(ROOTS_ADMIN, '/send-single-email'),
    settings: path(ROOTS_ADMIN, '/settings'),
    settingsP2p: path(ROOTS_ADMIN, '/p2p-settings'),
    support: path(ROOTS_ADMIN, '/support'),
    supportSingle: path(ROOTS_ADMIN, '/support/:id'),
    transactions: path(ROOTS_ADMIN, '/transactions'),
    users: path(ROOTS_ADMIN, '/user/list'),
    userEdit: path(ROOTS_ADMIN, '/user/:userId'),
    userRoot: path(ROOTS_ADMIN, '/user'),
    withdrawals: path(ROOTS_ADMIN, '/withdrawals'),
  },

}

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
export const PATH_SUPPORT = 'https://googl.com';
