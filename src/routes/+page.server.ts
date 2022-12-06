import { getPageData } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params })  => {
    let content = await getPageData();
    return {
        rounds:  content.rows[0].json_agg,
    };
}