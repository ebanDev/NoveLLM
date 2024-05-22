<script setup lang="ts">
const novelId = Number(useRoute().params.id)

navigateTo(`/novel/${novelId}/content`)
</script>