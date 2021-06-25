import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle, Request } from '@sveltejs/kit';

const i18n = {
	locales: ['en', 'de', 'fr', 'es'],
	defaultLocale: 'en',
}

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();

	let lang = i18n.defaultLocale;
	let path = request.path;

	i18n.locales.forEach(locale => {
		const regex = new RegExp(`/${locale}`);
		if (path.match(regex)) {
			lang = locale;
			path = path.replace(regex, '');
		}
	});

	request.path = path;
	request.locals.lang = lang;

	// console.log(JSON.stringify(request, null, 2));


	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};

export function getSession(request: Request): any {
	return {
		lang: request.locals.lang || i18n.defaultLocale,
	};
}
