<script lang="ts">
    import type {LinkData} from '$lib/types';
    import { onMount } from 'svelte';
    export let linkData: LinkData;



    let topLeftY = 0;
    let topLeftX = 0;
    let width = 0;
    let height = 0;
    let scaleFactor = 1;

    onMount(() => {
        const startElem = document.getElementById(linkData.startHandle);
        const endElem = document.getElementById(linkData.endHandle);
        if (startElem !== null && endElem !== null) {
            const startRect = startElem.getBoundingClientRect();
            const endRect = endElem.getBoundingClientRect();

            const startPtY = (startRect.top + startRect.bottom) / 2.0 + window.scrollY;
            const startPtX = startRect.right + window.scrollX;
            const endPtY = (endRect.top + endRect.bottom) / 2.0 + window.scrollY;
            const endPtX = endRect.left + window.scrollX;

            topLeftY = Math.min(startPtY, endPtY);
            topLeftX = Math.min(startPtX, endPtX);
            width = endPtX - startPtX;
            height = Math.abs(endPtY - startPtY);

            const startAboveEnd = startPtY < endPtY;
            scaleFactor = startAboveEnd ? -1 : 1;
        } else {
            console.log("error linking entries")
            topLeftY = 0;
            topLeftX = 0;
            width = 0;
            height = 0;
            scaleFactor = 1;

        }

    });

</script>

<svg width='{width}px' height='{height}px' viewBox="0 0 4 6" preserveAspectRatio="none" fill="none" stroke='black' stroke-width='4px'
style='top:{topLeftY}px; left:{topLeftX}px; transform: scaleY({scaleFactor});'>
 <path vector-effect="non-scaling-stroke" d="M 0 6 C 2 6 2 6 2 3 C 2 0 2 0 4 0" />
</svg>

<style lang="scss">
    svg {
        //pointer-events: none;
        position: absolute;
        overflow: visible;
    }
</style>