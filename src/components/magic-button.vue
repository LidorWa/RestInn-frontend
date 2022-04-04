<template>
    <div class="btn-container">
        <div class="cell" v-for="cell in 10" :key="cell"></div>

        <div class="content">
            <button class="action-btn">
                <span class="magic-button-avail-span">
                    <slot>
                        
                    </slot>
                </span>
            </button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
</style>