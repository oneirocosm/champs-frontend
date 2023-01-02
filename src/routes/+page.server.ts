import { getPageData, getPairData } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params })  => {
    let content = await getPageData();
    let pairs = await getPairData();
    return {
        rounds:  content.rows[0].json_agg,
        pairs: pairs.rows[0].jsonb_agg,
    };
}