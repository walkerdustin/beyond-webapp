import type { PageLoad } from './$types';
 
export const load: PageLoad = ({ params }) => {


    return {
        post: {
        title: `Title for ${params.slug} goes here`,
        content: `Content for ${params.slug} goes here`
        }
    };
}