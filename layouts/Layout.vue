<template>
    <div class="default-container">
        <h1>404</h1>
        <blockquote>{{ getMsg() }}</blockquote>
        <RouterLink to="/">
            Take me home.
        </RouterLink>
    </div>
</template>

<script>
    const msgs = [
        `There's nothing here.`,
        `How did we get here?`,
        `That's a Four-Oh-Four.`,
        `Looks like we've got some broken links.`
    ]
    
    export default {
        name: 'Layout',
        methods: {
            getMsg() {
                return msgs[Math.floor(Math.random() * msgs.length)]
            }
        },
        mounted() {
            this.$bus.$emit('show-component')
        }
    }
</script>
