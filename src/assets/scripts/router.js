import pages from './views/pages/index'
import utils from './utils/router.utils'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'    : pages.dashboard,
    '/about'        : pages.about,
    '/signup'       : pages.signup,
    '/learn-words'  : pages.learnWords,
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    const content = null || document.getElementById('app_container');

    // Get the parsed URl from the addressbar
    const request = utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    const parsedURL = (request.resource ? `/${  request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${  request.verb}` : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    const page = routes[parsedURL] ? routes[parsedURL] : pages.error404
    content.innerHTML = await page.render();
    await page.after_render();
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
