import type { PageLoad } from "./$types";

export const load = (() => {
    // you can get this data from ANY SOURCE
    // fetch call here
    // graphql client
    // manually change this object here whenever you want

    return {
        snippets: [
            {
				title: "Cooper Codes Snippet",
				language: "html",
				code: `<div>This is a div</div>`,
				favorite: false
			},
			{
				title: "Cool code snippet",
				language: "typescript",
				code: `console.log("Subscribe");`,
				favorite: false
			}
        ],
        harvests: [
            {
                // title: '',
                // language: '',
                comments: '',
                favorite: false,
                id: '',
                grower: {
                    id: '',
                    name: '',
                    lastName: '',
                    email: ''
                },
                farm: {
                    id: '',
                    name: '',
                    address: ''
                },
                client: {
                    id: '',
                    name: '',
                    lastName: '',
                    email: ''
                },
                commodity: {
                    id: '',
                    name: ''
                },
                variety: {
                    id: '',
                    name: ''
                },
                createdAt: ''
            }
        ]
    }
}) satisfies PageLoad; // PageLoad -> PageData (in our frontend)