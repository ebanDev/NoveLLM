<script setup lang="ts">
const novelsStore = useNovelsStore()

const newNovel = novelsStore.newNovel();

navigateTo(`/novel/${newNovel.id}/settings`)
</script>
