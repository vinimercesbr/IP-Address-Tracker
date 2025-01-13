<template>
  <div id="card"  class="-mt-9 desktop:mb-5 desktop:ml-4 desktop:px-6 mobile:ml-8  mobile:mr-0 desktop:inline-flex absolute p-3 bg-white desktop:py-0 desktop:text-justify rounded-xl items-center justify-items-center font-semibold desktop:max-h-[45vh] mobile:max-h-[60vh] mobile:min-h-[45%] mobile:min-w-[80%] mobile:max-w-[80%] touch-none">
    <div class="manager desktop:-ml-5">
      <a class="border-none">IP ADDRESS</a>
      <strong class="border-none">
        {{ ipData.ip }}
      </strong>
    </div>
    <div class="manager">
      <a>LOCATION</a>
      <strong>
        {{ ipData.city }}, 
        {{ ipData.region }}
        {{ ipData.cep}}
      </strong>
    </div>
    <div class="manager  desktop:mr-8">
      <a>TIMEZONE</a>
      <strong class="flex">
        <p>UTC</p>
       <p>{{ ipData.timezone }}</p>
      </strong>
    </div>
    <div class="manager  desktop:pr-5 desktop:mr-8">
      <a>ISP</a>
      <strong >
        {{ ipData.isp }}
      </strong>
    </div>
  </div>
  <core :base="center"/>
</template>

<script>
import core from './Map.vue';
import { API_KEY} from './config.js';

export default {
  components: {
    core
  },
  props: {
    search: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ipData: {},
      center: [],
      currentSearch: this.search
    };
  },
  watch: {
    search(newSearch) {
      this.fetchIpData(newSearch);
    }
  },
  mounted(){
    this.fetchIpData(this.currentSearch);
  },
  methods: {
    async fetchIpData(newSearch) {
      try {
        let data = await this.getIpData(newSearch);
        this.center = [data.longitude, data.latitude];
        this.ipData = {
          ip: data.ip,
          timezone: data.time_zone.offset,
          cep: data.zipcode,
          isp: data.isp,
          city: data.city,
          region: data.state_prov
        };
      } catch (error) {
        this.handleFetchError(error);
      }
    },
    async getIpData(search) {
      let response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY.IP}&ip=${search}&lang=en`);
      return await response.json();
    },
    handleFetchError(error) {
      console.error('Error fetching IP data: ', error);
    }
  }
};
</script>
<style>
  /*
    .manager {
        @apply flex text-center justify-items-center p-3 m-1  text-xs flex-col;
    };

    .manager strong {
        @apply pt-1 text-center max-mobile:inline-flex font-[650]  text-base;
    };

    .manager a {
        @apply text-sm -ml-1 pt-1 text-[11px] whitespace-pre text-[350] text-[#969696];
    };*/
        .manager {
        @apply flex text-center  desktop:text-start justify-items-center mobile:whitespace-break-spaces  desktop:whitespace-nowrap mobile:p-3 mobile:px-1 desktop:p-5 desktop:pl-8 desktop:pr-0 flex-col;
    }

    .manager strong {
        @apply pt-1 desktop:-ml-1 mobile:text-center  desktop:border-l  desktop:border-[#f969696] desktop:pl-5 text-base  font-[590];
    
    }
          

    .manager a {
        @apply text-sm -ml-1 
         desktop:pl-5 text-[11px] desktop:border-l desktop:border-[#f969696] text-[400] text-[#969696];
    };
</style>