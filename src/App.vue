<script>
import Form from './components/Form.vue';
import IpLocator from './components/IpLocator.vue';
import Map from './components/Map.vue';

export default{
  name: 'App',
  components: {
    Form,
    IpLocator,
    Map
  }
};
</script>
<template>
  <div id="app" class="m-0 p-0">
    <div id="banner">
      <Form/>
    </div>
    <div id="card">
    </div>
    <div id="map">
    </div>
  </div>
</template>