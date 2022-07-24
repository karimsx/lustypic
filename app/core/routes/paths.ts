// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ADMIN = '/admin'

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    register: path(ROOTS_AUTH, '/register'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    verify: path(ROOTS_AUTH, '/verify'),
    changePassword: path(ROOTS_AUTH, '/change-password')
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
    components: '/components'
};

export const PATH_ADMIN = {
    dashboard: path(ROOTS_ADMIN, '/dashboard'),
    pools: path(ROOTS_ADMIN, '/pools'),
    users: path(ROOTS_ADMIN, '/users'),
    games: path(ROOTS_ADMIN, '/games'),
    newgame: path(ROOTS_ADMIN, '/games/new')
}

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD, pools: path(ROOTS_DASHBOARD, '/pools'), games: path(ROOTS_DASHBOARD, '/games'),


    study: {
        notes: path(ROOTS_DASHBOARD, '/notes'), course: {
            index: '/coming-soon', allcourses: '/coming-soon', mycourses: '/coming-soon'
        }, schedule: '/coming-soon'
    }, mail: {
        root: path(ROOTS_DASHBOARD, '/mail'), all: path(ROOTS_DASHBOARD, '/mail/all')
    }, chat: {
        root: path(ROOTS_DASHBOARD, '/chat'),
        new: path(ROOTS_DASHBOARD, '/chat/new'),
        conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
    }, calendar: path(ROOTS_DASHBOARD, '/calendar'), kanban: path(ROOTS_DASHBOARD, '/kanban'), user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        profile: path(ROOTS_DASHBOARD, '/user/profile'),
        cards: path(ROOTS_DASHBOARD, '/user/cards'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        newUser: path(ROOTS_DASHBOARD, '/user/new'),
        editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
        account: path(ROOTS_DASHBOARD, '/user/account')
    }, eCommerce: {
        root: path(ROOTS_DASHBOARD, '/e-commerce'),
        shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
        product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
        productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
        list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
        newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
        editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
        checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
        invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
    }, blog: {
        root: path(ROOTS_DASHBOARD, '/games'),
        posts: path(ROOTS_DASHBOARD, '/games/posts'),
        post: path(ROOTS_DASHBOARD, '/games/post/:title'),
        postById: path(ROOTS_DASHBOARD, '/games/post/apply-these-7-secret-techniques-to-improve-event'),
        newPost: path(ROOTS_DASHBOARD, '/games/new-post')
    }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
