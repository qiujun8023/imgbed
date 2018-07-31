<template>
  <div class="app" id="app">
    <div class="main">
      <upload/>
      <history/>
      <setting/>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import History from '@/components/History'
import Setting from '@/components/Setting'

export default {
  name: 'app',

  components: {
    Upload,
    History,
    Setting
  }
}
</script>
