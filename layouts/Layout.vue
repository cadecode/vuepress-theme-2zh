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
    import AllMixin from '../components/AllMixin'
    const msgs = [
        `There's nothing here.`,
        `How did we get here?`,
        `That's a Four-Oh-Four.`,
        `Looks like we've got some broken links.`
    ]

    export default {
        name: 'Layout',
        mixins:[AllMixin],
        methods: {
            getMsg() {
                return msgs[Math.floor(Math.random() * msgs.length)]
            }
        }
    }
</script>
