import pages from './views/pages/index'
import utils from './utils/router.utils'

const routes = {
    '/': pages.home,
    '/about': pages.about,
    '/signup': pages.signup,
    '/english_puzzle': pages.english_puzzle
};

const router = async() => {
    const content = null || document.getElementById('app_container');
    const request = utils.parseRequestURL();
    const parsedURL = (request.resource ? `/${  request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${  request.verb}` : '');
    const page = routes[parsedURL] ? routes[parsedURL] : pages.error404;
    content.innerHTML = await page.render();
    await page.after_render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);